import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import { Response } from 'superagent';
import Users from '../database/models/users';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testando Login:', () => {

  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(Users, "findOne")
      .resolves({
        id: 1,
        username: 'Teste',
        role: 'user',
        email: 'teste@test.com',
        password: 'secret_user'
      } as Users);
  });

  after(() => {
    (Users.findOne as sinon.SinonStub).restore();
  })

  it('Caso sucesso: Retorna o Token', async () => {
    chaiHttpResponse = await chai.request(app).post('/login').send({
      email: 'teste@test.com',
      password: 'secret_user',
    })
    expect(chaiHttpResponse.body).to.have.property('token');
  });
});
