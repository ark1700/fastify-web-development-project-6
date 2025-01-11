// @ts-check

export default (app) => {
  app
    .get('/', { name: 'root' }, (req, reply) => {
      if (req.isAuthenticated()) {
        reply.redirect(app.reverse('tasks'));
      }
      reply.render('welcome/index');
    })
    .get('/protected', { name: 'protected', preValidation: app.authenticate }, (req, reply) => {
      reply.render('welcome/index');
    });
};
