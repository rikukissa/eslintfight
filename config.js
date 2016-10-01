module.exports = {
  auth0: {
    domain: 'ideahigh.eu.auth0.com',
    clientId: 'g2XZpP62AiXeU3DwWKlQjxF68aL2us5M',
  },
  api: {
    path: process.env.NODE_ENV === 'production' ?
      'https://thawing-atoll-82980.herokuapp.com' :
      'http://localhost:3001',
  },
};
