const bcrypt = require('bcryptjs');
const generator = require('generate-password');
const { sendMail } = require('./mailer');
const {
  ERROR_MESSAGE_USER_EXISTS,
  ERROR_MESSAGE_RESET_PASSWORD,
  ERROR_MESSAGE_USER_NOT_FOUND
} = require('./errorMessages');

const createUserResponse = ({ ok, user = null, errors = null }) => ({
  ok,
  user: user ? user.toJSON() : user,
  errors
});

const createUsersResponse = ({ ok, users = null, errors = null }) => ({
  ok,
  users: users ? users.map(u => u.toJSON()) : [],
  errors
});

const createUserWithRole = ({ input, db }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const existingUser = await db.users.findByPk(input.userId);

      if (existingUser) throw new Error(ERROR_MESSAGE_USER_EXISTS);
      // add user
      const userObj = db.users.build();
      const newUserObj = { ...userObj, ...input };
      const newUserDb = await db.users.create(newUserObj);

      // add role
      const { roleId } = input;
      await db.userRoles.create({ userId: newUserDb.id, roleId });

      const userDb = await db.users.findByPk(newUserDb.id, {
        include: [
          {
            association: 'roles'
          }
        ]
      });
      resolve(userDb);
    } catch (e) {
      console.log(e);
      reject(e);
    }
  });
};
const getUserWithRoles = ({ userId, db }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const userDb = await db.users.findByPk(userId, {
        include: [
          {
            association: 'roles'
          }
        ]
      });

      resolve(userDb);
    } catch (error) {
      reject(error);
    }
  });
};
const updateUserWithRole = ({ input, db }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const Op = db.Sequelize.Op;
      const existingUser = await db.users.findByPk(input.userId);
      if (!existingUser) throw new Error(ERROR_MESSAGE_USER_NOT_FOUND);
      // add user

      // TODO: authorization check
      const { email, firstName, lastName, active, userId, roleId } = input;

      existingUser.email = email || existingUser.email;
      existingUser.firstName = firstName || existingUser.firstName;
      existingUser.lastName = lastName || existingUser.lastName;
      existingUser.active = active ? true : false;

      await existingUser.save();

      // TODO: update role id
      const userRole = await db.userRoles.findOne({
        where: { userId: { [Op.eq]: existingUser.id } }
      });
      if (userRole) {
        userRole.roleId = parseInt(roleId) || userRole.roleId;
        await userRole.save();
      } else {
        await db.userRoles.create({ userId: existingUser.id, roleId });
      }

      const newUserDb = await db.users.findByPk(existingUser.id, {
        include: [
          {
            association: 'roles'
          }
        ]
      });
      resolve(newUserDb);
    } catch (e) {
      console.log('e', e);
      reject(e);
    }
  });
};

const createInitialUser = ({ db }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const login = await db.logins.findOne({});

      if (!login) {
        const { createLogin } = require('./logins');
        const password = generator.generate({
          length: 10,
          numbers: true,
          uppercase: true,
          symbols: true,
          strict: true
        });

        const email = 'mike@munchdevelopment.com';

        const input = {
          email,
          password,
          active: true
        };
        const newLogin = await createLogin({ input, db });
        const userInput = {
          firstName: 'Michael',
          lastName: 'Griffin',
          roleId: 1,
          active: true,
          loginId: newLogin.id
        };

        await createUserWithRole({
          input: userInput,
          db
        });

        await sendMail({
          mailFrom: 'mgriffin.jr@gmail.com',
          mailTo: email,
          subject: '[Church Connected] - Super Admin Account',
          body: `${email} ${password}`
        });
      }
      resolve();
    } catch (error) {
      reject(error);
    }
  });
};
// Create initial user upon start up if none are present.
// Should be deleted immediately after using to login and create another more secure user.
(async () => {})();

module.exports = {
  getUserWithRoles,
  createInitialUser,
  createUserWithRole,
  updateUserWithRole,
  createUserResponse,
  createUsersResponse
};
