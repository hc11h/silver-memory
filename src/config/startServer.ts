import express, { Express } from 'express';
import http, { Server } from 'http';
import env from '@/config/env';
import { disconnectDB } from '@/config/db';

export class AppServer {
  private app: Express;
  private port: number;
  private server: Server | null = null;

  constructor(app: Express, port: number) {
    this.app = app;
    this.port = port;
  }

  public start() {
    this.server = http.createServer(this.app);

    this.server.listen(this.port, () => {
      console.log(`🚀 Server is running at http://localhost:${this.port}`);
      console.log(`🛠️  Running in ${env.env.toUpperCase()} mode`);
    });

    this.server.on('error', (err) => {
      console.error('❌ Server error:', err);
      process.exit(1);
    });

    process.on('SIGINT', () => this.gracefulShutdown());
    process.on('SIGTERM', () => this.gracefulShutdown());
  }

  private async gracefulShutdown() {
    console.log('\n🛑 Gracefully shutting down...');

    if (this.server) {
      this.server.close(async () => {
        console.log('🔒 HTTP server closed');
        await disconnectDB();
        process.exit(0);
      });
    } else {
      await disconnectDB();
      process.exit(0);
    }
  }
}
