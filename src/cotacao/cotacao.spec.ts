import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { CotacaoModule } from './cotacao.module';
import { CotacaoService } from './cotacao.service';

describe('todo', () => {
  let app: INestApplication;
  const cotacaoService = {
    createCotacao: () => [
      {
        code: 'EUR',
        name: 'Euro/Real',
        value: 5.7756,
        date: '2024-06-06T13:48:09.000Z',
        total: 577.56,
      },
    ],
    getCotacoes: () => [
      {
        code: 'EUR',
        name: 'Euro/Real',
        value: 5.7756,
        date: '2024-06-06T13:48:09.000Z',
        total: 577.56,
      },
      {
        code: 'EUR',
        name: 'Euro/Real',
        value: 5.7756,
        date: '2024-06-06T13:48:09.000Z',
        total: 577.56,
      },
    ],
  };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [CotacaoModule],
    })
      .overrideProvider(CotacaoService)
      .useValue(cotacaoService)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it(`/Post cotacao`, () => {
    return request(app.getHttpServer())
      .post('/cotacao')
      .expect(201)
      .expect(cotacaoService.createCotacao());
  });

  afterAll(async () => {
    await app.close();
  });

  it(`/GET cotacao`, () => {
    return request(app.getHttpServer())
      .get('/cotacao')
      .expect(200)
      .expect(cotacaoService.getCotacoes());
  });

  afterAll(async () => {
    await app.close();
  });
});
