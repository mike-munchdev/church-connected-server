const { hashPassword } = require('./logins');
module.exports.setup = db => {
  const Login = db.logins;

  const LoginLogin = db.loginLogins;
  // const TokenType = db.tokenTypes;
  const UserRole = db.userRoles;
  const User = db.users;
  const Role = db.roles;

  // LoginLogin
  LoginLogin.belongsTo(Login, { foreignKey: 'loginId' });

  // UserRole
  User.belongsToMany(Role, {
    as: 'roles',
    through: 'userRoles',
    foreignKey: 'userId',
    otherKey: 'roleId'
  });

  UserRole.belongsTo(User, {
    foreignKey: 'userId'
  });
  UserRole.belongsTo(Role, {
    foreignKey: 'roleId'
  });

  // Login

  Login.addHook(
    'afterValidate',
    (login, options) =>
      new Promise(async (resolve, reject) => {
        try {
          if (login.changed('password')) {
            const hash = await hashPassword(login.password);
            login.password = hash;
          }
          resolve(login);
        } catch (e) {
          reject(e);
        }
      })
  );
};
