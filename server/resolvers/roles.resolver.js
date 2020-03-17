const { createRolesResponse } = require('../utils/roles');
const convertErrors = require('../utils/convertErrors');

module.exports = {
  Query: {
    getRoles: async (parent, args, { db }) => {
      try {
        const rolesDb = await db.roles.findAll();
        return createRolesResponse({ ok: true, roles: rolesDb });
      } catch (error) {
        return createRolesResponse({
          ok: false,
          errors: convertErrors({ error, models: db })
        });
      }
    }
  }
};
