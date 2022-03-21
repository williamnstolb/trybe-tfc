import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import { app } from '../app';
import Example from '../database/models/ExampleModel';
import User from '../database/models/User';
import Club from '../database/models/Club';

import { Response } from 'superagent';
import UsersMoked from './Mocks/UsersMoked';
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
        username: 'nameTest',
        role: 'roleTest',
        email: 'email@test.com',
        password: 'passwordTest',
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
  before(async () => {
    sinon
      .stub(User, "findOne")
      .resolves({
        id:1,
        username: 'nameTest',
        role: 'roleTest',
        email: 'email@test.com',
        password: 'passwordTest',
      } as User);
  });

  after(() => { (Club.findOne as sinon.SinonStub).restore(); });

  before(async () => {
    sinon
      .stub(Club, "findOne")
      .resolves({
        id:1,
        username: 'nameTest',
        role: 'roleTest',
        email: 'email@test.com',
        password: 'passwordTest',
      } as User);
  });

  after(() => { (CLub.findOne as sinon.SinonStub).restore(); });

  // Testes a serem feitos: 
  

  // it('testa login com usuário e senha corretos', async () => {
  //   chaiHttpResponse = await chai.request(app).post('/login').send({
  //     email: UsersMoked.user.correct.email,
  //     password: UsersMoked.user.correct.password,
  //   });
  //    // expect(false).to.be.eq(true);
  //   expect(chaiHttpResponse.status).to.be.eq(200);
  // });
});