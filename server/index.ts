// express
import express from 'express';
import session from 'express-session';

// mongoose
import mongoose from 'mongoose';

// parsers
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

// config
import config from './config/config.js';

// routes
import routes from './routes/index.js';

// ws
import ExpressWs from './instances/ws.js';
import wsRouters from './ws/index.js';

declare module 'express-session' {
  interface SessionData {
    name: string;
    ID: string;
  }
}

const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  res.header('Access-Control-Allow-Methods', '*');
  next();
});
app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(
  session({
    secret: 'secret-session-id',
    resave: false,
    saveUninitialized: true,
  }),
);

const startWS = () => {
  try {
    const expressWsApp = new ExpressWs(app).getExpressWsApp();
    wsRouters(expressWsApp);
  } catch (error) {
    startWS();
  }
};

startWS();

app.use(routes);

async function start() {
  try {
    console.log('starting server...');

    await mongoose.connect(config.mongo.url, config.mongo.options)
      .then(() => console.log('MongoDB connected.'))
      .catch((err) => console.log(err));

    app.listen(config.server.port, () => {
      console.log(`Server running on port ${config.server.port}`);
    });
  } catch (error: any) {
    console.log('Server Error', error.message);
    process.exit(1);
  }
}

start();
