import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { ICotacao } from './dto/icotacao';
import { Cotacao } from './entities/cotacao.entity';
import { CreateCotacaoDto } from './dto/create-cotacao.dto';

@Injectable()
export class CotacaoService {
  constructor(private readonly prisma: PrismaService) {}

  async createCotacao(createCotacao: CreateCotacaoDto): Promise<Cotacao> {
    try {
      const response = await fetch(
        `https://economia.awesomeapi.com.br/json/daily/${createCotacao.moeda}/1`,
      );
      const result = await response.json();
      const date = new Date(result[0].create_date);
      date.setUTCHours(date.getUTCHours() - 3);
      const novaCotacao: ICotacao = {
        code: result[0].code,
        name: result[0].name,
        value: Number(result[0].high),
        date: date,
      };
      await this.prisma.cotacao.create({
        data: novaCotacao,
      });
      novaCotacao.total = Number(
        (result[0].high * createCotacao.valor).toFixed(2),
      );
      return novaCotacao;
    } catch (error) {
      console.log(error);
    }
  }

  async getCotacoes(moeda: string): Promise<Cotacao[]> {
    try {
      const response = await fetch(
        `https://economia.awesomeapi.com.br/json/daily/${moeda}/10`,
      );
      const result = await response.json();

      const cotacoes: ICotacao[] = result.map((cotacao: any) => {
        const date = new Date(Number(cotacao.timestamp) * 1000);
        date.setUTCHours(date.getUTCHours() - 3);
        return {
          code: cotacao.code,
          name: cotacao.name,
          value: Number(cotacao.high),
          date: date,
        };
      });
      return cotacoes;
    } catch (error) {
      throw error;
    }
  }

  // async getCotacoes(): Promise<Cotacao[]> {
  //   try {
  //     const result = await this.prisma.cotacao.findMany({ take: 10 });
  //     return result;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
}
