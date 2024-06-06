import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CotacaoModule } from './cotacao/cotacao.module';

@Module({
  imports: [CotacaoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
