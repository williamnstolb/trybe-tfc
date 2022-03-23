import * as express from 'express';
// import * as bodyParser from 'body-parser';
import * as cors from 'cors';
// import route from './routes';
import { login, validate } from './controller/loginController';

class App {
  public app: express.Express;
  // ...

  constructor() {
    // ...
    this.app = express();
    this.config();
    // ...
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(accessControl);
    // this.app.use(bodyParser.json());
    // ...
  }

  // public use(rota: string, callback: express.RequestHandler):void {
  //   this.app.use(rota, callback);
  // }

  // ...
  public start(PORT: string | number):void {
    this.app.use(express.json());
    this.app.use(cors());
    // this.app.use(route);
    this.app.post('/login', login);
    this.app.get('/login/validate', validate);

    this.app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  }
}

export { App };

// A execução dos testes de cobertura depende dessa exportação
export const { app } = new App();
