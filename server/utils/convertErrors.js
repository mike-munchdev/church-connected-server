const { pick } = require('lodash');

module.exports = (e, models) => {
  console.log(e);

  if (e instanceof models.Sequelize.ValidationError) {
    return e.errors.map(x => pick(x, ['path', 'message']));
  } else {
    return e.errors
      ? e.errors
      : [{ path: '', message: e.message || String(e) }];
  }
};
