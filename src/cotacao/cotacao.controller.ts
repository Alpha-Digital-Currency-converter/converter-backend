import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CotacaoService } from './cotacao.service';
import { Cotacao } from './entities/cotacao.entity';
import { CreateCotacaoDto } from './dto/create-cotacao.dto';

@Controller('cotacao')
export class CotacaoController {
  constructor(private readonly cotacaoService: CotacaoService) {}

  @Post()
  createCotacao(@Body() createCotacao: CreateCotacaoDto): Promise<Cotacao> {
    return this.cotacaoService.createCotacao(createCotacao);
  }
  @Get(':moeda')
  getCotacoes(@Param('moeda') moeda: string): Promise<Cotacao[]> {
    return this.cotacaoService.getCotacoes(moeda);
  }
}
