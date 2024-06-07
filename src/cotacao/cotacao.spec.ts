import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { CotacaoModule } from './cotacao.module';
import { CotacaoService } from './cotacao.service';

describe('todo', () => {
  let app: INestApplication;
  const cotacaoService = { createCotacao: () => ['test'] };

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
});
