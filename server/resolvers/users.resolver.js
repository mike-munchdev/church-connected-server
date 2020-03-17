const { createUserResponse, createUsersResponse } = require('../utils/users');
const convertErrors = require('../utils/convertErrors');

const {
  createUserWithRole,
  updateUserWithRole,
  getUserWithRoles
} = require('../utils/users');

module.exports = {
  Query: {
    getUsers: async (parent, args, { db }) => {
      try {
        const usersDb = await db.users.findAll({
          include: [
            {
              association: 'roles'
            }
          ]
        });

        return createUsersResponse({ ok: true, users: usersDb });
      } catch (error) {
        return createUsersResponse({
          ok: false,
          errors: convertErrors({ error, models: db })
        });
      }
    },
    getUser: async (parent, { userId }, { db }) => {
      try {
        const userDb = await getUserWithRoles({ userId, db });

        return createUserResponse({ ok: true, user: userDb });
      } catch (error) {
        return createUserResponse({
          ok: false,
          errors: convertErrors({ error, models: db })
        });
      }
    }
  },
  Mutation: {
    updateOneUser: async (_, { input }, { db }) => {
      try {
        const userDb = await updateUserWithRole({ input, db });

        return createUserResponse({ ok: true, user: userDb });
      } catch (error) {
        return createUserResponse({
          ok: false,
          errors: convertErrors({ error, models: db })
        });
      }
    },
    createNewUser: async (_, { input }, { db }) => {
      try {
        // TODO: authorization check

        // add user
        const userDb = await createUserWithRole({ input, db });

        return createUserResponse({ ok: true, user: userDb });
      } catch (error) {
        return createUserResponse({
          ok: false,
          errors: convertErrors({ error, models: db })
        });
      }
    }
  }
};
