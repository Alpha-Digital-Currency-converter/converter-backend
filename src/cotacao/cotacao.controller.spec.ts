import { Test } from '@nestjs/testing';
import { CotacaoController } from './cotacao.controller';
import { CotacaoService } from './cotacao.service';
import { PrismaService } from '../prisma.service';
import { CreateCotacaoDto } from './dto/create-cotacao.dto';

describe('todoController', () => {
  let cotacaoController: CotacaoController;
  let cotacaoService: CotacaoService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [CotacaoController],
      providers: [CotacaoService, PrismaService],
    }).compile();

    cotacaoService = moduleRef.get<CotacaoService>(CotacaoService);
    cotacaoController = moduleRef.get<CotacaoController>(CotacaoController);
  });

  describe('createCotacao', () => {
    it('should return a cotacao object', async () => {
      const cotacao: CreateCotacaoDto = {
        valor: 100,
        moeda: 'EUR',
      };
      const result = await Promise.resolve([
        {
          code: 'EUR',
          name: 'Euro/Real',
          value: 5.7756,
          date: '2024-06-06T13:48:09.000Z',
          total: 577.56,
        },
      ]);
      jest
        .spyOn(cotacaoService, 'createCotacao')
        .mockImplementation(async () => result);

      expect(await cotacaoController.createCotacao(cotacao)).toBe(result);
    });
  });

  describe('getCotacoes', () => {
    it('should return an array of cotações', async () => {
      const result = await Promise.resolve([
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
      ]);
      jest
        .spyOn(cotacaoService, 'getCotacoes')
        .mockImplementation(async () => result);

      expect(await cotacaoController.getCotacoes()).toBe(result);
    });
  });
});
