// @ts-check

import _ from 'lodash';
import fastify from 'fastify';

import init from '../server/plugin.js';
import { getTestData, prepareData } from './helpers/index.js';

describe('test tasks CRUD', () => {
  let app;
  let knex;
  let models;
  let cookie;
  const testData = getTestData();

  beforeAll(async () => {
    app = fastify({
      exposeHeadRoutes: false,
      logger: { target: 'pino-pretty' },
    });
    await init(app);
    knex = app.objection.knex;
    models = app.objection.models;

    await knex.migrate.latest();
    await prepareData(app);

    const user = testData.users.existing;
    const responseSignIn = await app.inject({
      method: 'POST',
      url: app.reverse('session'),
      payload: {
        data: user,
      },
    });
    const [sessionCookie] = responseSignIn.cookies;
    const { name, value } = sessionCookie;
    cookie = { [name]: value };
  });

  beforeEach(async () => {
  });

  it('index', async () => {
    const response = await app.inject({
      method: 'GET',
      url: app.reverse('tasks'),
      cookies: cookie,
    });

    expect(response.statusCode).toBe(200);
  });

  it('new', async () => {
    const response = await app.inject({
      method: 'GET',
      url: app.reverse('newTask'),
      cookies: cookie,
    });

    expect(response.statusCode).toBe(200);
  });

  it('create', async () => {
    const params = testData.tasks.new;

    const response = await app.inject({
      method: 'POST',
      url: app.reverse('tasks'),
      cookies: cookie,
      payload: {
        data: params,
      },
    });

    expect(response.statusCode).toBe(302);
    const task = await models.task.query().findOne({ name: params.name });
    expect(task).toMatchObject(params);
  });

  it('edit', async () => {
    const task = testData.tasks.existing;

    const response = await app.inject({
      method: 'GET',
      url: app.reverse('editTask', { id: task.id.toString() }),
      cookies: cookie,
    });

    expect(response.statusCode).toBe(200);
  });

  it('update', async () => {
    const task = testData.tasks.existing;
    const newDescription = 'Updated description';

    const response = await app.inject({
      method: 'PATCH',
      url: app.reverse('updateTask', { id: task.id.toString() }),
      cookies: cookie,
      payload: {
        data: {
          statusId: Number(task.statusId),
          executorId: task.executorId ? Number(task.executorId) : undefined,
          creatorId: task.creatorId,
          description: newDescription,
        },
      },
    });

    expect(response.statusCode).toBe(302);
    const updatedTask = await models.task.query().findById(task.id);
    expect(updatedTask.description).toBe(newDescription);
  });

  it('delete', async () => {
    const task = testData.tasks.existing;

    const response = await app.inject({
      method: 'DELETE',
      url: app.reverse('deleteTask', { id: task.id.toString() }),
      cookies: cookie,
    });

    expect(response.statusCode).toBe(302);
    const deletedTask = await models.task.query().findById(task.id);
    expect(deletedTask).toBeUndefined();
  });

  afterEach(async () => {
  });

  afterAll(async () => {
    await app.close();
  });
});
