import { MiddlewareConsumer, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { pgDBConfig } from './configs';
import { ConfigModule } from '@nestjs/config';
import { SampleModule } from './app/sample/sample.module';


@Module({
  imports: [
    TypeOrmModule.forRoot(pgDBConfig),
    ConfigModule.forRoot({ isGlobal: true }),
    SampleModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply().exclude(
    ).forRoutes();
  }
}