import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import { app } from '../app';
import Example from '../database/models/ExampleModel';
import User from '../database/models/User';

import { Response } from 'superagent';

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

  // it('...', async () => {
  //   chaiHttpResponse = await chai
  //      .request(app)
  //      ...

  //   expect(...)
  // });
  after(() => { (User.findOne as sinon.SinonStub).restore(); });

  it('testa se o login está correto pelo status.', async () => {
    chaiHttpResponse = await chai.request(app).post('/login').send({
      email: 'email@test.com',
      password: 'passwordTest',
    });
     // expect(false).to.be.eq(true);
    expect(chaiHttpResponse.status).to.be.eq(200);
  });
});
