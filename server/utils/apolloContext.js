const { AuthenticationError, SchemaError } = require('apollo-server-express');
// const {validateToken, findUser} = require('./tokens');
const db = require('../models/index');

module.exports = async args => {
  try {
    let user;

    if (args.req) {
      // http request

      const { query } = args.req.body;

      if (query) {
        const arr = query.split('\n');

        if (arr.length)
          if (
            arr[1].includes('authLocal(') ||
            arr[1].includes('authFacebook(') ||
            arr[1].includes('authGoogle(') ||
            arr[1].includes('logout')
          ) {
            return { db, req: args.req, res: args.res };
          } else {
            // TODO: re-instate auth check
            // const token = args.req.header('x-auth');
            // // const token = '';
            // if (!token) {
            // 	const clientVersion = args.req.header('version');
            // 	const ip =
            // 		args.req.headers['x-forwarded-for'] ||
            // 		args.req.connection.remoteAddress ||
            // 		args.req.ips;

            // 	const errorMessage = `${token} not found. IP: ${ip}, version: ${clientVersion}`;

            // 	throw new AuthenticationError(errorMessage);
            // } else {
            return { db, user, req: args.req, res: args.res };
            // }
          }
      } else {
        throw new SchemaError('Schema invalid');
      }
    }
  } catch (e) {
    console.log(e);
    throw e;
  }
};
