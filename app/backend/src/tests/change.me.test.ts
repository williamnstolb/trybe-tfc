import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import { app } from '../app';
import Example from '../database/models/ExampleModel';
import User from '../database/models/User';

import { Response } from 'superagent';
import UsersMoked from './Mocks/UsersMoked';

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
  // 2. Login com usuário e senha inválidos
  // 3. Login com usuário inválido
  // 4. Login com senha inválida
  // 5. Login sem usuário e senha
  // 6. Login sem usuário
  // 7. Login sem senha
  // 8. Login com usuário e senha válidos e redirecionar para a página de dashboard

  it('testa login com usuário e senha corretos', async () => {
    chaiHttpResponse = await chai.request(app).post('/login').send({
      email: UsersMoked.user.correct.email,
      password: UsersMoked.user.correct.password,
    });
     // expect(false).to.be.eq(true);
    expect(chaiHttpResponse.status).to.be.eq(200);
  });

  it('testa login com usuário e senha incorretos', async () => {
    chaiHttpResponse = await chai.request(app).post('/login').send({
      email: UsersMoked.user.incorrect.email,
      password: UsersMoked.user.incorrect.password,
    });
    expect(chaiHttpResponse.status).to.be.eq(401);
  });

  it('testa login com usuário incorreto', async () => {
    chaiHttpResponse = await chai.request(app).post('/login').send({
      email: UsersMoked.user.incorrect.email,
      password: UsersMoked.user.correct.password,
    });
    expect(chaiHttpResponse.status).to.be.eq(401);
  });
});

