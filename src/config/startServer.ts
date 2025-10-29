import { Express } from 'express';
import http from 'http';
import env from '@/config/env';
import { disconnectDB } from '@/config/db';

export const startServer = (app: Express, port: number) => {
  const server = http.createServer(app);

  server.listen(port, () => {
    console.log(`🚀 Server is running at http://localhost:${port}`);
    console.log(`🛠️  Running in ${env.env.toUpperCase()} mode`);
  });

  server.on('error', (err) => {
    console.error('❌ Server error:', err);
    process.exit(1);
  });

  const gracefulShutdown = async () => {
    console.log('\n🛑 Gracefully shutting down...');
    server.close(async () => {
      console.log('🔒 HTTP server closed');
      await disconnectDB();
      process.exit(0);
    });
  };

  process.on('SIGINT', gracefulShutdown);
  process.on('SIGTERM', gracefulShutdown);
};
