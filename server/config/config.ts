export default {
  mongo: {
    url: `mongodb://${process.env.mongoDomain || '127.0.0.1'}:27017/`,
    options: {
      dbName: 'db_b',
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  },
  jwtSecret: "super_secret_jwt_key",
  server: {
    port: 8080,
    dev_port: 6008,
  },
};
