const convertErrors = require('../utils/convertErrors');
const { createAuthResponse } = require('../utils/auth');
const { createUser, getUserWithRoles } = require('../utils/users');
const { authenticateLocal } = require('../utils/auth');
const { sendMail } = require('../utils/mailer');
const isEmail = require('validator/lib/isEmail');
const { sendRefreshToken } = require('../utils/auth');
module.exports = {
  Mutation: {
    logout: async (_, args, { req, res, db }) => {
      try {
        sendRefreshToken(res, '');
        return createAuthResponse({
          ok: true
        });
      } catch (error) {
        return createAuthResponse({
          ok: false,
          errors: convertErrors(error, db)
        });
      }
    },
    authLocal: async (_, { input }, { req, res, db }) => {
      try {
        const { email, password } = input;
        req.body = {
          ...req.body,
          username: email,
          password
        };

        const data = await authenticateLocal({ email, password, db });

        if (!data) throw new Error('Login incorrect');

        const user = await getUserWithRoles({ userId: data.id, db });

        // TODO: log to userLogins table
        sendRefreshToken(res, data.refreshToken);

        return createAuthResponse({
          ok: true,
          firstName: user.firstName,
          lastName: user.lastName,
          roles: user.roles,
          accessToken: data.accessToken
        });
      } catch (e) {
        console.log(e);
        return createAuthResponse({
          ok: false,
          errors: convertErrors(e, db)
        });
      }
    },
    signupLocal: async (_, { input }, { req, res, db }) => {
      try {
        const user = await createUser({ input, db });

        return createAuthResponse({
          ok: true
        });
      } catch (e) {
        console.log(e);
        return createAuthResponse({
          ok: false,
          errors: convertErrors(e, db)
        });
      }
    },
    resetPasswordLocal: async (_, { input }, { req, res, db }) => {
      try {
        const { email } = input;

        if (!isEmail(email)) throw new Error('Invalid Email Detected');

        await sendMail({
          mailTo: email,
          mailFrom: 'mike@munchdevelopment.com',
          subject: 'Password Reset',
          body: 'Here is your reset password link!'
        });

        return createAuthResponse({
          ok: true
        });
      } catch (e) {
        console.log(e);
        return createAuthResponse({
          ok: false,
          errors: convertErrors(e, db)
        });
      }
    }
  }
};
