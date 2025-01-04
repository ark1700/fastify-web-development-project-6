// @ts-check

import i18next from 'i18next';
import { isAuthenticated } from './utils/helpers.js';

export default (app) => {
  app
    .get('/tasks', { name: 'tasks' }, async (req, reply) => {
      if (!isAuthenticated(req, reply)) return reply;
      const tasks = await app.objection.models.task.query().withGraphJoined('[creator, status, executor]');
      reply.render('tasks/index', { tasks });
      return reply;
    })
    .get('/tasks/new', { name: 'newTask' }, async (req, reply) => {
      if (!isAuthenticated(req, reply)) return reply;
      const statuses = await app.objection.models.status.query();
      const users = await app.objection.models.user.query().select('id', 'firstName', 'lastName');
      const task = new app.objection.models.task();
      reply.render('tasks/new', { task, statuses, users });
      return reply;
    })
    .get('/tasks/:id/edit', { name: 'editTask' }, async (req, reply) => {
      if (!isAuthenticated(req, reply)) return reply;
      const task = await app.objection.models.task.query().findById(req.params.id);
      const statuses = await app.objection.models.status.query();
      const users = await app.objection.models.user.query().select('id', 'firstName', 'lastName');
      if (!task) {
        req.flash('error', i18next.t('flash.tasks.notFound'));
        reply.redirect(app.reverse('tasks'));
        return reply;
      }
      reply.render('tasks/edit', { task, statuses, users });
      return reply;
    })
    .post('/tasks', async (req, reply) => {
      if (!isAuthenticated(req, reply)) return reply;
      const task = new app.objection.models.task();
      const {statusId, executorId, ...data} = req.body.data
      task.$set({
        ...data,
        statusId: Number(statusId),
        executorId: executorId ? Number(executorId) : undefined,
        creatorId: req.user.id
      });

      try {
        const validTask = await app.objection.models.task.fromJson(task);
        await app.objection.models.task.query().insert(validTask);
        req.flash('info', i18next.t('flash.tasks.create.success'));
        reply.redirect(app.reverse('tasks'));
      } catch ({ data }) {
        req.flash('error', i18next.t('flash.tasks.create.error'));
        const statuses = await app.objection.models.status.query();
        const users = await app.objection.models.user.query().select('id', 'firstName', 'lastName');
        reply.render('tasks/new', { task, statuses, users, errors: {} });
      }

      return reply;
    })
    .patch('/tasks/:id', { name: 'updateTask' }, async (req, reply) => {
      if (!isAuthenticated(req, reply)) return reply;
      const id = Number(req.params.id);

      try {
        const task = await app.objection.models.task.query().findById(id);
        if (!task) {
          req.flash('error', i18next.t('flash.tasks.update.notFound'));
          reply.redirect(app.reverse('tasks'));
          return reply;
        }

        const {statusId, executorId, ...data} = req.body.data;
        await task.$query().patch({
          ...data,
          statusId: Number(statusId),
          executorId: executorId ? Number(executorId) : undefined,
          creatorId: req.user.id
        });
        req.flash('info', i18next.t('flash.tasks.update.success'));
        reply.redirect(app.reverse('tasks'));
      } catch ({ data }) {
        const statuses = await app.objection.models.status.query();
        const users = await app.objection.models.user.query().select('id', 'firstName', 'lastName');
        req.flash('error', i18next.t('flash.tasks.update.error'));
        reply.render('tasks/edit', { task: req.body.data, statuses, users, errors: data });
      }

      return reply;
    })
    .delete('/tasks/:id', { name: 'deleteTask' }, async (req, reply) => {
      if (!isAuthenticated(req, reply)) return reply;
      const id = Number(req.params.id);

      try {
        const task = await app.objection.models.task.query().findById(id);
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
