// @ts-check

import i18next from 'i18next';
import { isAuthenticated } from './utils/helpers.js';

export default (app) => {
  app
    .get('/statuses', { name: 'statuses' }, async (req, reply) => {
      if (!isAuthenticated(req, reply)) return reply;
      const statuses = await app.objection.models.status.query();
      reply.render('statuses/index', { statuses });
      return reply;
    })
    .get('/statuses/new', { name: 'newStatus' }, (req, reply) => {
      if (!isAuthenticated(req, reply)) return reply;
      const status = new app.objection.models.status();
      reply.render('statuses/new', { status });
    })
    .get('/statuses/:id/edit', { name: 'editStatus' }, async (req, reply) => {
      if (!isAuthenticated(req, reply)) return reply;
      const status = await app.objection.models.status.query().findById(req.params.id);
      if (!status) {
        req.flash('error', i18next.t('flash.statuses.notFound'));
        reply.redirect(app.reverse('statuses'));
        return reply;
      }
      reply.render('statuses/edit', { status });
      return reply;
    })
    .post('/statuses', async (req, reply) => {
      if (!isAuthenticated(req, reply)) return reply;
      const status = new app.objection.models.status();
      status.$set(req.body.data);

      try {
        const validStatus = await app.objection.models.status.fromJson(req.body.data);
        await app.objection.models.status.query().insert(validStatus);
        req.flash('info', i18next.t('flash.statuses.create.success'));
        reply.redirect(app.reverse('statuses'));
      } catch ({ data }) {
        req.flash('error', i18next.t('flash.statuses.create.error'));
        reply.render('statuses/new', { status, errors: data });
      }

      return reply;
    })
    .patch('/statuses/:id', { name: 'updateStatus' }, async (req, reply) => {
      if (!isAuthenticated(req, reply)) return reply;
      const id = Number(req.params.id);

      try {
        const status = await app.objection.models.status.query().findById(id);
        if (!status) {
          req.flash('error', i18next.t('flash.statuses.update.notFound'));
          reply.redirect(app.reverse('statuses'));
          return reply;
        }

        await status.$query().patch(req.body.data);
        req.flash('info', i18next.t('flash.statuses.update.success'));
        reply.redirect(app.reverse('statuses'));
      } catch ({ data }) {
        req.flash('error', i18next.t('flash.statuses.update.error'));
        reply.render('statuses/edit', { status: req.body.data, errors: data });
      }

      return reply;
    })
    .delete('/statuses/:id', { name: 'deleteStatus' }, async (req, reply) => {
      if (!isAuthenticated(req, reply)) return reply;
      const id = Number(req.params.id);

      try {
        const status = await app.objection.models.status.query().findById(id);
        if (!status) {
          req.flash('error', i18next.t('flash.statuses.delete.notFound'));
          reply.redirect(app.reverse('statuses'));
          return reply;
        }

        await status.$query().delete();
        req.flash('info', i18next.t('flash.statuses.delete.success'));
        reply.redirect(app.reverse('statuses'));
        return reply;

      } catch ({ data }) {
        req.flash('error', i18next.t('flash.statuses.delete.error'));
        reply.render('statuses/edit', { status: req.body.data, errors: data });
      }
    });
};
