export interface ConfigType {
  nest: NestConfig;
}

export interface NestConfig {
  environment: string | undefined;
  port: number;
  databaseUrl: string | undefined;
  readOnlyDatabaseUrl: string | undefined;
}
