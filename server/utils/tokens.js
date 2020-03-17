const db = require('../models/index');
const jwt = require('jsonwebtoken');
const validateToken = (token, secret) => {
  return new Promise((resolve, reject) => {
    try {
      const decoded = jwt.verify(token, secret);

      resolve(decoded);
    } catch (e) {
      reject(e);
    }
  });
};

const findUser = decoded => {
  return new Promise(async (resolve, reject) => {
    try {
      if (decoded.id) {
        const user = await db.users.findByPk(decoded.id, {
          include: [{ association: 'role', attributes: ['slug', 'id'] }],
          attributes: { exclude: ['password'] }
        });
        resolve(user);
      } else {
        throw new Error('Malformed token');
      }
    } catch (e) {
      reject(e);
    }
  });
};

const generateToken = ({ user, type }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const today = new Date();
      const expirationDate = new Date(today);
      expirationDate.setDate(today.getDate() + 30);
      const token = jwt.sign(
        {
          id: user.id,
          email: user.email,
          type,
          exp: parseInt((expirationDate.getTime() / 1000).toString(), 10)
        },
        process.env.JWT_SECRET
      );

      resolve(token);
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = { validateToken, findUser, generateToken };
