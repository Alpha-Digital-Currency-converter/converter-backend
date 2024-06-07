import { Body, Controller, Get, Post } from '@nestjs/common';
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
  @Get()
  getCotacoes(): Promise<Cotacao[]> {
    return this.cotacaoService.getCotacoes();
  }
}
