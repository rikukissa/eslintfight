const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const AuthenticationClient = require('auth0').AuthenticationClient;
const config = require('../config');
const database = require('./database');

const app = express();

app.use(cors());
app.use(bodyParser.json());

class InternalError extends Error {}
class Unauthorized extends Error {}

const authClient = new AuthenticationClient(config.auth0);

function validateUserId(req, res, next) {

  if (req.headers.token) {
    authClient.tokens.getInfo(req.headers.token, (err, tokenInfo) => {
      if (err || !tokenInfo.user_id) {
        next(new Unauthorized());
        return;
      }
      // eslint-disable-next-line no-param-reassign
      req.user = tokenInfo;
      next();
    });
    return;
  }

  next();
}

app.get('/rules', (req, res) => {
  res.send([]);
});

app.get('/rules/:rule/configurations', (req, res) => {
  database.getConfigurations(req.params.rule).then((configurations) => {
    res.send(configurations);
  });
});

app.post('/rules/:rule/configurations', validateUserId, (req, res, next) => {
  database.saveConfiguration(
    req.params.rule,
    req.body,
    req.user && req.user.user_id,
    req.connection.remoteAddress
  ).then((configuration) => {
    res.status(201).send(configuration);
  }).catch(() => {
    next(new InternalError());
  });
});

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  if (err instanceof Unauthorized) {
    res.status(401).send('Unauthorized');
    return;
  }
  res.status(500).send('Internal server error');
});

app.listen(process.env.PORT || 3001);
