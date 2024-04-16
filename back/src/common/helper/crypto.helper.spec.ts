import { hashPassword, verifyPassword } from './crypto.helper';

const plainText = 'password';
const hash = '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8';
describe('Crypto Helper', () => {
  it('should encrypt plaintext"', () => {
    const hashedPassword = hashPassword(plainText);
    expect(hashedPassword).toBe(hash);
  });

  it('should validate plaintext password match', () => {
    const isMatch = verifyPassword(plainText, hash);
    expect(isMatch).toBe(true);
  });
});
