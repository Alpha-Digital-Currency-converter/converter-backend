import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
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
}
