// In-memory SSE client store (production: Redis Pub/Sub ile değiştirin)
// Next.js edge runtime'da global Map server instance başına paylaşılır
const notificationClients = new Map<string, ReadableStreamDefaultController<Uint8Array>>();

export function addClient(userId: string, controller: ReadableStreamDefaultController<Uint8Array>) {
  notificationClients.set(userId, controller);
}

export function removeClient(userId: string) {
  notificationClients.delete(userId);
}

export function getClient(userId: string): ReadableStreamDefaultController<Uint8Array> | undefined {
  return notificationClients.get(userId);
}

export function sendToUser(userId: string, payload: string): boolean {
  const controller = notificationClients.get(userId);
  if (!controller) return false;
  const encoder = new TextEncoder();
  try {
    controller.enqueue(encoder.encode(`data: ${payload}\n\n`));
    return true;
  } catch {
    notificationClients.delete(userId);
    return false;
  }
}
