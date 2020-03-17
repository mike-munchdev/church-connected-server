'use strict';
if (process.env.NODE_ENV !== 'production') require('dotenv').config();
const express = require('express');
const path = require('path');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const http = require('http');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { ApolloServer } = require('apollo-server-express');
const { verify } = require('jsonwebtoken');
const context = require('./server/utils/apolloContext');
const db = require('./server/models');
const {
  sendRefreshToken,
  createRefreshToken,
  createAccessToken
} = require('./server/utils/auth');

const { createInitialUser } = require('./server/utils/users');
// const {validateToken, findUser} = require('./server/utils/tokens');

// Provide schemas for apollo server
const typeDefs = require('./server/schemas/index');

// Provide resolver functions for your schema fields
const resolvers = require('./server/resolvers/index');

const { migrateDatabase } = require('./server/utils/migrateDatabase');
const { seedDatabase } = require('./server/utils/seedDatabase');

(async () => {
  // initialize server
  const app = express();
  const allowedOrigin = process.env.CORS_URL
    ? process.env.CORS_URL.split(',')
    : [''];

  app.use(
    cors({
      origin: allowedOrigin,
      credentials: true
    })
  );

  app.use(cookieParser());
  // app.use(helmet());

  // For BodyParser
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(express.static(path.join(__dirname, 'public')));
  app.post('/refresh_token', async (req, res) => {
    const token = req.cookies.jid;
    if (!token) {
      return res.send({ ok: false, accessToken: '' });
    }
    // console.log('jid', token);
    let payload = null;
    try {
      payload = verify(token, process.env.REFRESH_TOKEN_SECRET);
    } catch (err) {
      console.log(err);
      return res.send({ ok: false, accessToken: '' });
    }

    // token is valid and
    // we can send back an access token

    const user = await db.users.findByPk(payload.userId, {
      attributes: ['firstName', 'lastName', 'tokenVersion', 'id']
    });

    if (!user) {
      return res.send({ ok: false, accessToken: '' });
    }

    if (user.tokenVersion !== payload.tokenVersion) {
      return res.send({ ok: false, accessToken: '' });
    }

    sendRefreshToken(res, createRefreshToken(user));

    return res.send({
      ok: true,
      accessToken: createAccessToken(user),
      ...user.dataValues
    });
  });

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context,
    subscriptions: {
      onConnect: async (connectionParams, webSocket) => {
        return;
        // TODO: reinstate auth check on web sockets
        // try {
        // 	if (connectionParams['x-auth']) {
        // 		const decoded = await validateToken(
        // 			connectionParams['x-auth']
        // 		);
        // 		const user = await findUser(decoded);
        // 		return {
        // 			currentUser: user
        // 		};
        // 	}
        // 	throw new Error('Missing auth token!');
        // } catch (e) {
        // 	throw e;
        // }
      }
    }
  });

  server.applyMiddleware({
    app,
    cors: false
  });

  const httpServer = http.createServer(app);

  server.installSubscriptionHandlers(httpServer);
  const ipaddr = process.env.IP || 'localhost';
  const PORT = Number(process.env.PORT) || 4001;

  httpServer.listen({ port: PORT }, async () => {
    console.log(
      `🚀 Server ready at http://${ipaddr}:${PORT}${server.graphqlPath}`
    );
    // migrate and seed database and add initial user
    (async () => {
      await migrateDatabase();
      await seedDatabase();
      await createInitialUser({ db });
    })();
  });
})();
