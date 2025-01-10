import { getTestData, prepareData } from './helpers/index.js';
import fastify from 'fastify';
import init from '../server/plugin.js';

describe('test labels CRUD', () => {
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
      url: app.reverse('labels'),
      cookies: cookie,
    });

    expect(response.statusCode).toBe(200);
  });

  it('create', async () => {
    const label = testData.labels.new;
    const response = await app.inject({
      method: 'POST',
      url: app.reverse('labels'),
      cookies: cookie,
      payload: {
        data: label,
      },
    });

    expect(response.statusCode).toBe(302);
    const createdLabel = await models.label.query().findOne({ name: label.name });
    expect(createdLabel).toMatchObject(label);
  });

  it('edit', async () => {
    const label = testData.labels.existing;
    const response = await app.inject({
      method: 'GET',
      url: app.reverse('editLabel', { id: label.id }),
      cookies: cookie,
    });

    expect(response.statusCode).toBe(200);
  });

  it('update', async () => {
    const label = testData.labels.existing;
    const newName = 'urgent';
    const response = await app.inject({
      method: 'PATCH',
      url: app.reverse('updateLabel', { id: label.id }),
      cookies: cookie,
      payload: {
        data: {
          name: newName,
        },
      },
    });

    expect(response.statusCode).toBe(302);
    const updatedLabel = await models.label.query().findById(label.id);
    expect(updatedLabel.name).toBe(newName);
  });

  it('delete', async () => {
    const label = testData.labels.existing;
    const response = await app.inject({
      method: 'DELETE',
      url: app.reverse('deleteLabel', { id: label.id }),
      cookies: cookie,
    });

    expect(response.statusCode).toBe(302);
    const deletedLabel = await models.label.query().findById(label.id);
    expect(deletedLabel).toBeUndefined();
  });
});
