import { config } from 'dotenv';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const envs = require('dotenv').config();

const dbConfig = {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [__dirname + '/../../**/*.entity{.ts,.js}'],
    migrationsRun: true,
    synchronize: process.env.SYNCHRONIZE === 'true' || true,
    logging: process.env.SYNCHRONIZE === 'true' || false,
    entityPrefix: process.env.ENTITY_PREFIX
};
export const pgDBConfig = dbConfig as TypeOrmModuleOptions;
