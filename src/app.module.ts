import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ItemsModule } from './items/items.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { LoggerMiddleware } from './common/middleware/logger/logger.middleware';
import { ItemsController } from './items/items.controller';

@Module({
  imports: [ItemsModule, PrismaModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes(ItemsController);
  }
}
