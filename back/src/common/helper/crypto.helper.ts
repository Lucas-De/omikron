import { createHash } from 'crypto';

export function hashPassword(plainText: string) {
  return createHash('sha256').update(plainText).digest('hex');
}

export function verifyPassword(plainText: string, hash: string) {
  return hash === hashPassword(plainText);
}
