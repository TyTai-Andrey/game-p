import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import config from './config/config.js';
import routes from './routes/index.js';
import needAuth from './middleware/auth.js';
import mongoose from 'mongoose';
import expressWs from 'express-ws';
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
    // name: 'sessionId',
    resave: false,
    saveUninitialized: true,
  }),
);

// app.get('/api/session/:id', (req, res) => {
//   req.session.ID = req.params.id;
//   return res.redirect('/');
// });

const appWS = expressWs(app);
wsRouters(appWS)


app.use(needAuth, routes);

async function start() {
  try {
    console.log("starting server...");

    await mongoose.connect(config.mongo.url, config.mongo.options)
      .then(() => console.log('MongoDB connected.'))
      .catch(err => console.log(err))

    app.listen(config.server.port, () => {
      console.log(`Server running on port ${config.server.port}`);
    });
  } catch (error: any) {
    console.log('Server Error', error.message);
    process.exit(1);
  }
}

start();