import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import { app } from '../app';
import Example from '../database/models/ExampleModel';
import User from '../database/models/User';
import Club from '../database/models/Club';

import { Response } from 'superagent';
import UsersMoked from './Mocks/UsersMoked';
import ClubsMoked from './Mocks/ClubsMoked';
import { log } from 'console';

chai.use(chaiHttp);

const { expect } = chai;

describe('Verifica rota /login', () => {
  /**
   * Exemplo do uso de stubs com tipos
   */

  // let chaiHttpResponse: Response;
  let chaiHttpResponse: Response;

  // before(async () => {
  //   sinon
  //     .stub(Example, "findOne")
  //     .resolves({
  //       ...<Seu mock>
  //     } as Example);
  // });
  before(async () => {
    sinon
      .stub(User, "findOne")
      .resolves({
        id:1,
        username: 'Admin',
        role: 'admin',
        email: 'admin@admin.com',
        password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW',
      } as User);
  });

  // after(()=>{
  //   (Example.findOne as sinon.SinonStub).restore();
  // })
  after(() => { (User.findOne as sinon.SinonStub).restore(); });

  // it('...', async () => {
  //   chaiHttpResponse = await chai
  //      .request(app)
  //      ...

  //   expect(...)
  // });

  // Testes a serem feitos: 
  // 1. Login com usuário e senha válidos
  // 2. Login com usuário inválido
  // 3. Login com senha inválida
  // 4. Login sem usuário
  // 5. Login sem senha

  it('testa login com usuário e senha corretos', async () => {
    chaiHttpResponse = await chai.request(app).post('/login').send({
      email: UsersMoked.user.correct.email,
      password: UsersMoked.user.correct.password,
    });
     // expect(false).to.be.eq(true);
    expect(chaiHttpResponse.status).to.be.eq(200);
  });

  it('testa login com usuário incorreto', async () => {
    chaiHttpResponse = await chai.request(app).post('/login').send({
      email: UsersMoked.user.incorrect.email,
    });
    expect(chaiHttpResponse.status).to.be.eq(401);
  });

  it('testa login com senha incorreta', async () => {
    chaiHttpResponse = await chai.request(app).post('/login').send({
      email: UsersMoked.user.correct.email,
      password: UsersMoked.user.incorrect.password,
    });
    expect(chaiHttpResponse.status).to.be.eq(401);
  });
  
  it('testa login sem usuário', async () => {
    chaiHttpResponse = await chai.request(app).post('/login').send({
      password: UsersMoked.user.correct.password,
    });
    expect(chaiHttpResponse.status).to.be.eq(401);
  });

  it('testa login sem senha', async () => {
    chaiHttpResponse = await chai.request(app).post('/login').send({
      email: UsersMoked.user.correct.email,
    });
    expect(chaiHttpResponse.status).to.be.eq(401);
  });
});

describe('Verifica rota /club', () => {

  let chaiHttpResponse: Response;
  
  before(async () => {
    sinon
      .stub(Club, "findAll")
      .resolves( ClubsMoked as Club[]);
  });

  after(() => { (Club.findAll as sinon.SinonStub).restore(); });

  // Testes a serem feitos:
  // 1. Listar todos os clubes  

  it('testa listar todos os clubes', async () => {
    chaiHttpResponse = await chai.request(app).get('/club');
    expect(chaiHttpResponse.status).to.be.eq(200);
  });
});