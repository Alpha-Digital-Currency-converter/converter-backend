import { Module } from '@nestjs/common';
import { CotacaoService } from './cotacao.service';
import { CotacaoController } from './cotacao.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [CotacaoController],
  providers: [CotacaoService, PrismaService],
})
export class CotacaoModule {}
