import { Injectable, OnModuleInit, OnModuleDestroy } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Pool, QueryResult } from "pg";

@Injectable()
export class DatabaseService implements OnModuleInit, OnModuleDestroy {
  private pool: Pool;

  constructor(private configService: ConfigService) {}

  onModuleInit() {
    this.pool = new Pool({
      host: this.configService.get<string>("DB_HOST"),
      port: this.configService.get<number>("DB_PORT"),
      user: this.configService.get<string>("DB_USERNAME"),
      password: this.configService.get<string>("DB_PASSWORD"),
      database: this.configService.get<string>("DB_NAME"),
    });
  }

  async onModuleDestroy() {
    await this.pool.end();
  }

  async query(text: string, params?: any[]): Promise<QueryResult> {
    return this.pool.query(text, params);
  }
}
