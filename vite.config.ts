import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

function devApiRoutes() {
  return {
    name: 'devign-api-routes',
    configureServer(server: any) {
      server.middlewares.use('/api/briefing', async (req: any, res: any) => {
        const chunks: Uint8Array[] = [];

        req.on('data', (chunk: Uint8Array) => chunks.push(chunk));
        req.on('end', async () => {
          try {
            const body = Buffer.concat(chunks).toString('utf8');
            const { default: handler } = await import('./api/briefing.js');
            const vercelRequest = {
              ...req,
              body,
              headers: req.headers,
              method: req.method,
              socket: req.socket,
            };
            const vercelResponse = {
              statusCode: 200,
              setHeader: (key: string, value: string) => res.setHeader(key, value),
              status(code: number) {
                this.statusCode = code;
                return this;
              },
              json(payload: unknown) {
                res.statusCode = this.statusCode;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify(payload));
                return this;
              },
              end(payload?: unknown) {
                res.statusCode = this.statusCode;
                res.end(payload);
                return this;
              },
            };

            await handler(vercelRequest, vercelResponse);
          } catch {
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(
              JSON.stringify({
                ok: false,
                code: 'DEV_API_ERROR',
                message: 'Não foi possível executar a rota local de briefing.',
              }),
            );
          }
        });
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), devApiRoutes()],
  server: {
    host: '127.0.0.1',
    port: 5173,
  },
});
