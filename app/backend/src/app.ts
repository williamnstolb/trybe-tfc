import * as express from 'express';
import * as cors from 'cors';
// import { login, validate } from './controller/loginController';
import { getAllClubs, getByIdCLub } from './controller/clubsController';
import { getAllMatchs, create, finishMatch, updateMatch } from './controller/matchsController';
import { home, away, leaderboard } from './controller/leaderboardController';

class App {
  public app: express.Express;
  // ...

  constructor() {
    // ...
    this.app = express();
    this.config();
    // ...
  }

  private config(): void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(accessControl);
    this.app.use(express.json());
    this.app.use(cors());
    // this.app.post('/login', login);
    // this.app.get('/login/validate', validate);
    this.app.get('/clubs', getAllClubs);
    this.app.get('/clubs/:id', getByIdCLub);
    this.app.get('/matchs', getAllMatchs);
    this.app.post('/matchs', create);
    this.app.patch('/matchs/:id/finish', finishMatch);
    this.app.patch('/matchs/:id', updateMatch);
    this.app.get('/leaderboard/home', home);
    this.app.get('/leaderboard/away', away);
    this.app.get('/leaderboard', leaderboard);
    // this.routes();

    // ...
  }

  // public routes(): void {
  //   this.app.post('/login', login);
  //   this.app.get('/login/validate', validate);
  //   this.app.get('/clubs', getAllClubs);
  //   this.app.get('/clubs/:id', getByIdCLub);
  //   this.app.get('/matchs', getAllMatchs);
  //   this.app.post('/matchs', create);
  //   this.app.patch('/matchs/:id/finish', finishMatch);
  //   this.app.patch('/matchs/:id', updateMatch);
  //   this.app.get('/leaderboard/home', home);
  //   this.app.get('/leaderboard/away', away);
  //   this.app.get('/leaderboard', leaderboard);
  // }

  // ...
  public start(PORT: string | number):void {
    // this.app.use(express.json());
    // this.app.use(cors());
    // this.app.get('/login/validate', validate);
    // this.app.post('/login', login);
    // this.app.get('/clubs', getAllClubs);
    // this.app.get('/clubs/:id', getByIdCLub);
    // this.app.get('/matchs', getAllMatchs);
    // this.app.post('/matchs', create);
    // this.app.patch('/matchs/:id/finish', finishMatch);

    this.app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  }
}

export { App };

// A execução dos testes de cobertura depende dessa exportação
export const { app } = new App();
