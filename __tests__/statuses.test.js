import { getTestData, prepareData } from './helpers/index.js';
import fastify from 'fastify';
import init from '../server/plugin.js';

describe('test statuses CRUD', () => {
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


  afterAll(async () => {
    await app.close();
  });

  it('index', async () => {
    const response = await app.inject({
      method: 'GET',
      url: app.reverse('statuses'),
      cookies: cookie,
    });

    expect(response.statusCode).toBe(200);
  });

  it('create', async () => {
    const status = testData.statuses.new;
    const response = await app.inject({
      method: 'POST',
      url: app.reverse('statuses'),
      cookies: cookie,
      payload: {
        data: status,
      },
    });

    expect(response.statusCode).toBe(302);
    const createdStatus = await models.status.query().findOne({ name: status.name });
    expect(createdStatus).toMatchObject(status);
  });

  it('edit', async () => {
    const status = testData.statuses.existing;
    const response = await app.inject({
      method: 'GET',
      url: app.reverse('editStatus', { id: status.id }),
      cookies: cookie,
    });

    expect(response.statusCode).toBe(200);
  });

  it('update', async () => {
    const status = testData.statuses.existing;
    const newName = 'in progress';
    const response = await app.inject({
      method: 'PATCH',
      url: app.reverse('updateStatus', { id: status.id }),
      cookies: cookie,
      payload: {
        data: {
          name: newName,
        },
      },
    });

    expect(response.statusCode).toBe(302);
    const updatedStatus = await models.status.query().findById(status.id);
    expect(updatedStatus.name).toBe(newName);
  });

  it('delete', async () => {
    const status = testData.statuses.existing;
    const response = await app.inject({
      method: 'DELETE',
      url: app.reverse('deleteStatus', { id: status.id }),
      cookies: cookie,
    });

    expect(response.statusCode).toBe(302);
    const deletedStatus = await models.status.query().findById(status.id);
    expect(deletedStatus).toBeUndefined();
  });
});
