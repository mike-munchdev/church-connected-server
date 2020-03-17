const { sign } = require('jsonwebtoken');
const { ERROR_MESSAGE_LOGIN_NOT_FOUND } = require('./errorMessages');
const { comparePassword } = require('./logins');
const createAuthResponse = ({
  ok,
  firstName = null,
  lastName = null,
  refreshToken = null,
  accessToken = null,
  roles = [],
  errors = null
}) => ({
  ok,
  firstName,
  lastName,
  refreshToken,
  accessToken,
  roles,
  errors
});

const sendRefreshToken = (res, token) => {
  res.cookie('jid', token, {
    httpOnly: true,
    path: '/refresh_token'
  });
};

const createAccessToken = login => {
  return sign({ userId: login.id }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '15m'
  });
};

const createRefreshToken = login => {
  return sign(
    { userId: login.id, tokenVersion: login.tokenVersion },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: '7d'
    }
  );
};

const authenticateLocal = ({ email, password, db }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const Op = db.Sequelize.Op;
      const login = await db.logins.findOne({
        where: { email: { [Op.eq]: email } }
      });

      // user found?
      if (!login) {
        throw new Error(ERROR_MESSAGE_LOGIN_NOT_FOUND);
      }

      // passwords match?
      const isMatch = await comparePassword({
        login,
        candidatePassword: password
      });

      if (!isMatch) {
        throw new Error(ERROR_MESSAGE_LOGIN_NOT_FOUND);
      }

      // create tokens
      const refreshToken = createRefreshToken(login);
      const accessToken = createAccessToken(login);

      resolve({ ...login.dataValues, refreshToken, accessToken });
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  authenticateLocal,
  createAuthResponse,
  sendRefreshToken,
  createAccessToken,
  createRefreshToken
};
