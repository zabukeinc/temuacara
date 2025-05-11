import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';
import * as process from 'process';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  private readOnlyInstance: PrismaClient;

  constructor() {
    const dbConfig: Prisma.Datasources = {
      db: {
        url: process.env.DATABASE_URL,
      },
    };

    const logConfig: Prisma.LogDefinition[] = [
      {
        emit: 'event',
        level: 'query',
      },
      {
        emit: 'stdout',
        level: 'info',
      },
      {
        emit: 'stdout',
        level: 'error',
      },
    ];

    const mainConfig = {
      datasources: dbConfig,
      log: process.env.NODE_ENV != 'production' ? logConfig : undefined,
    };

    super(mainConfig);

    this.readOnlyInstance = new PrismaClient({
      datasources: {
        db: { url: process.env.DATABASE_READ_URL },
      },
      log: process.env.NODE_ENV != 'production' ? logConfig : undefined,
      errorFormat: 'pretty',
    });
  }
  async onModuleInit() {
    await this.$connect();

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    this.$on('query', (e) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      console.log('Query: ' + e.query);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      console.log('Params: ' + e.params);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      console.log('Duration: ' + e.duration + 'ms');
    });
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    this.readOnlyInstance.$on('query', (e) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      console.log('Query: ' + e.query);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      console.log('Params: ' + e.params);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      console.log('Duration: ' + e.duration + 'ms');
    });
  }

  async onModuleDestroy() {
    await this.$disconnect();
    await this.readOnlyInstance.$disconnect();
  }
}
