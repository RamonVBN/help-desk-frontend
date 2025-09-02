// e2e/setup.ts
import { server } from '../../mocks/server';

export async function globalSetup() {
  server.listen({ onUnhandledRequest: 'warn' });
}

