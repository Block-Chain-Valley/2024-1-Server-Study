import type { ConfigType } from './config.interface';

export default (): ConfigType => ({
  nest: {
    port: parseInt(process.env.PORT!, 10) || 3100,
    environment: process.env.NEST_ENVIRONMENT,
    databaseUrl: process.env.PRISMA_DATABASE_URL,
    readOnlyDatabaseUrl: process.env.PRISMA_READ_ONLY_DATABASE_URL,
  },
});
