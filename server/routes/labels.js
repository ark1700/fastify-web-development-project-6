// @ts-check

import i18next from 'i18next';
import { isAuthenticated } from './utils/helpers.js';

export default (app) => {
  app
    .get('/labels', { name: 'labels' }, async (req, reply) => {
      if (!isAuthenticated(req, reply)) return reply;
      const labels = await app.objection.models.label.query();
      reply.render('labels/index', { labels });
      return reply;
    })
    .get('/labels/new', { name: 'newLabel' }, (req, reply) => {
      if (!isAuthenticated(req, reply)) return reply;
      const label = new app.objection.models.label();
      reply.render('labels/new', { label });
    })
    .get('/labels/:id/edit', { name: 'editLabel' }, async (req, reply) => {
      if (!isAuthenticated(req, reply)) return reply;
      const label = await app.objection.models.label.query().findById(req.params.id);
      if (!label) {
        req.flash('error', i18next.t('flash.labels.notFound'));
        reply.redirect(app.reverse('labels'));
        return reply;
      }
      reply.render('labels/edit', { label });
      return reply;
    })
    .post('/labels', async (req, reply) => {
      if (!isAuthenticated(req, reply)) return reply;
      const label = new app.objection.models.label();
      label.$set(req.body.data);

      try {
        const validLabel = await app.objection.models.label.fromJson(req.body.data);
        await app.objection.models.label.query().insert(validLabel);
        req.flash('info', i18next.t('flash.labels.create.success'));
        reply.redirect(app.reverse('labels'));
      } catch ({ data }) {
        req.flash('error', i18next.t('flash.labels.create.error'));
        reply.render('labels/new', { label, errors: data });
      }

      return reply;
    })
    .patch('/labels/:id', { name: 'updateLabel' }, async (req, reply) => {
      if (!isAuthenticated(req, reply)) return reply;
      const id = Number(req.params.id);

      try {
        const label = await app.objection.models.label.query().findById(id);
        if (!label) {
          req.flash('error', i18next.t('flash.labels.update.notFound'));
          reply.redirect(app.reverse('labels'));
          return reply;
        }

        await label.$query().patch(req.body.data);
        req.flash('info', i18next.t('flash.labels.update.success'));
        reply.redirect(app.reverse('labels'));
      } catch ({ data }) {
        req.flash('error', i18next.t('flash.labels.update.error'));
        reply.render('labels/edit', { label: req.body.data, errors: data });
      }

      return reply;
    })
    .delete('/labels/:id', { name: 'deleteLabel' }, async (req, reply) => {
      if (!isAuthenticated(req, reply)) return reply;
      const id = Number(req.params.id);

      try {
        const label = await app.objection.models.label.query().findById(id);
        if (!label) {
          req.flash('error', i18next.t('flash.labels.delete.notFound'));
          reply.redirect(app.reverse('labels'));
          return reply;
        }

        // if (label.tasks.length > 0) {
        //   req.flash('error', i18next.t('flash.labels.delete.hasTasks'));
        //   reply.redirect(app.reverse('labels'));
        //   return reply;
        // }

        await label.$query().delete();
        req.flash('info', i18next.t('flash.labels.delete.success'));
        reply.redirect(app.reverse('labels'));
        return reply;

      } catch ({ data }) {
        req.flash('error', i18next.t('flash.labels.delete.error'));
      }
    });
};
