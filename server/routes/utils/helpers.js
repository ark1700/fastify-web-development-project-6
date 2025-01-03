export const isAuthenticated = (req, reply) => {
  if (!req.isAuthenticated()) {
    req.flash('error', i18next.t('flash.authError'));
    reply.redirect(app.reverse('root'));
    return false;
  }
  return true;
};
