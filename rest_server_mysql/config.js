const config = {
    db: {
      /* don't expose password or any sensitive info, done only for demo */
      host: "localhost",
      port: 3308,
      user: "sean",
      password: "123",
      database: "kahoot",
    },
    listPerPage: 10,
  };
  module.exports = config;