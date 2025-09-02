import { server } from '../../mocks/server';

export async function globalTeardown() {
  server.close();
}