const bcrypt = require('bcryptjs');
const {
  ERROR_MESSAGE_LOGIN_EXISTS,
  ERROR_MESSAGE_RESET_PASSWORD,
  ERROR_MESSAGE_LOGIN_NOT_FOUND
} = require('./errorMessages');

const createLoginResponse = ({ ok, login = null, errors = null }) => ({
  ok,
  login: login ? login.toJSON() : login,
  errors
});

const createLoginsResponse = ({ ok, logins = null, errors = null }) => ({
  ok,
  logins: logins ? logins.map(u => u.toJSON()) : [],
  errors
});

const createLogin = ({ input, db }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const Op = db.Sequelize.Op;
      const existingLogin = await db.logins.findOne({
        where: { email: { [Op.eq]: input.email } }
      });

      if (existingLogin) throw new Error('Login already exits.');
      // add login
      const loginObj = db.logins.build();
      const newLoginObj = { ...loginObj, ...input };
      const newLoginDb = await db.logins.create(newLoginObj);

      const loginDb = await db.logins.findByPk(newLoginDb.id);
      resolve(loginDb);
    } catch (e) {
      console.log(e);
      reject(e);
    }
  });
};

const updateLogin = ({ input, db }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const Op = db.Sequelize.Op;
      const existingLogin = await db.logins.findByPk(input.loginId);
      if (!existingLogin) throw new Error(ERROR_MESSAGE_LOGIN_NOT_FOUND);
      // add login

      // TODO: authorization check
      const { email, firstName, lastName, active, loginId, roleId } = input;

      existingLogin.email = email || existingLogin.email;
      existingLogin.firstName = firstName || existingLogin.firstName;
      existingLogin.lastName = lastName || existingLogin.lastName;
      existingLogin.active = active ? true : false;

      await existingLogin.save();

      const newLoginDb = await db.logins.findByPk(existingLogin.id);
      resolve(newLoginDb);
    } catch (e) {
      console.log('e', e);
      reject(e);
    }
  });
};

const hashPassword = password => {
  return new Promise(async (resolve, reject) => {
    try {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);

      resolve(hash);
    } catch (error) {
      reject(error);
    }
  });
};

const comparePassword = ({ login, candidatePassword }) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (login.password === null) {
        throw new Error(ERROR_MESSAGE_RESET_PASSWORD);
      }

      const isMatch = await bcrypt.compare(candidatePassword, login.password);

      resolve(isMatch);
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  createLogin,
  updateLogin,
  createLoginResponse,
  createLoginsResponse,
  hashPassword,
  comparePassword
};
