// @ts-check

import i18next from 'i18next';
import { isAuthenticated } from './utils/helpers.js';

export default (app) => {
  const { models } = app.objection;
  app
    .get('/tasks', { name: 'tasks' }, async (req, reply) => {
      if (!isAuthenticated(req, reply)) return reply;
      const tasks = await models.task.query().withGraphJoined('[creator, status, executor, labels]');
      reply.render('tasks/index', { tasks });
      return reply;
    })
    .get('/tasks/new', { name: 'newTask' }, async (req, reply) => {
      if (!isAuthenticated(req, reply)) return reply;
      const statuses = await models.status.query();
      const task = new models.task();
      const users = await models.user.query().select('id', 'firstName', 'lastName');
      const labels = await models.label.query();
      reply.render('tasks/new', { task, statuses, users, labels });
      return reply;
    })
    .get('/tasks/:id/edit', { name: 'editTask' }, async (req, reply) => {
      if (!isAuthenticated(req, reply)) return reply;
      const task = await models.task.query().findById(req.params.id).withGraphJoined('[creator, status, executor, labels]');
      const statuses = await models.status.query();
      const users = await models.user.query().select('id', 'firstName', 'lastName');
      const labels = await models.label.query();
      if (!task) {
        req.flash('error', i18next.t('flash.tasks.notFound'));
        reply.redirect(app.reverse('tasks'));
        return reply;
      }
      reply.render('tasks/edit', { task, statuses, users, labels });
      return reply;
    })
    .post('/tasks', async (req, reply) => {
      if (!isAuthenticated(req, reply)) return reply;

      try {
        const task = new models.task();
        const {statusId, executorId, labelIds, ...data} = req.body.data
        task.$set({
          ...data,
          statusId: Number(statusId),
          executorId: executorId ? Number(executorId) : undefined,
          creatorId: req.user.id
        });

        const validTask = await models.task.fromJson(task);
        await models.task.transaction(async (trx) => {
          const labels = labelIds ? await models.label.query(trx).findByIds(labelIds) : [];
          await models.task.query(trx).upsertGraph(
            {
              ...validTask,
              labels: labels,
            },
            { relate: true, unrelate: true, noUpdate: ['labels'] },
          );
        });
        req.flash('info', i18next.t('flash.tasks.create.success'));
        reply.redirect(app.reverse('tasks'));
      } catch (error) {
        req.flash('error', i18next.t('flash.tasks.create.error'));
        req.flash('error', error);
        const statuses = await models.status.query();
        const users = await models.user.query().select('id', 'firstName', 'lastName');
        const labels = await models.label.query();
        reply.render('tasks/new', { task: req.body.data, statuses, users, labels, errors: {} });
      }

      return reply;
    })
    .patch('/tasks/:id', { name: 'updateTask' }, async (req, reply) => {
      if (!isAuthenticated(req, reply)) return reply;
      const id = Number(req.params.id);

      try {
        const task = await models.task.query().findById(id);
        if (!task) {
          req.flash('error', i18next.t('flash.tasks.update.notFound'));
          reply.redirect(app.reverse('tasks'));
          return reply;
        }

        const {statusId, executorId, labelIds, ...data} = req.body.data;

        const validTask = await app.objection.models.task.fromJson({
          ...data,
          statusId: Number(statusId),
          executorId: executorId ? Number(executorId) : undefined,
          creatorId: req.user.id,
        });
        await app.objection.models.task.transaction(async (trx) => {
          const labels = labelIds ? await models.label.query(trx).findByIds(labelIds) : [];
          await app.objection.models.task.query(trx).upsertGraph(
            {
              id,
              ...validTask,
              labels,
            },
            { relate: true, unrelate: true, noUpdate: ['labels'] },
          );
        });
        req.flash('info', i18next.t('flash.tasks.update.success'));
        reply.redirect(app.reverse('tasks'));
      } catch ({ data }) {
        const statuses = await models.status.query();
        const users = await models.user.query().select('id', 'firstName', 'lastName');
        const labels = await models.label.query();
        req.flash('error', i18next.t('flash.tasks.update.error'));
        reply.render('tasks/edit', { task: req.body.data, statuses, users, labels, errors: data });
      }

      return reply;
    })
    .delete('/tasks/:id', { name: 'deleteTask' }, async (req, reply) => {
      if (!isAuthenticated(req, reply)) return reply;
      const id = Number(req.params.id);

      try {
        const task = await models.task.query().findById(id);
        if (!task) {
          req.flash('error', i18next.t('flash.tasks.delete.notFound'));
          reply.redirect(app.reverse('tasks'));
          return reply;
        }

        if (task.creatorId !== req.user.id) {
          req.flash('error', i18next.t('flash.tasks.delete.notCreator'));
          reply.redirect(app.reverse('tasks'));
          return reply;
        }

        await task.$query().delete();
        req.flash('info', i18next.t('flash.tasks.delete.success'));
        reply.redirect(app.reverse('tasks'));
        return reply;

      } catch ({ data }) {
        req.flash('error', i18next.t('flash.tasks.delete.error'));
        reply.render('tasks/edit', { task: req.body.data, errors: data });
      }
    });
};
