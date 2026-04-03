export function generateToken() {
  return createUuid() + createRandomHex(16);
}

export function getAccessTokenExpiresAt() {
  return Date.now() + 15 * 60 * 1000;
}

export function getRefreshTokenExpiresAt() {
  return Date.now() + 7 * 24 * 60 * 60 * 1000;
}

function createUuid() {
  const webCrypto = getWebCrypto();

  if (webCrypto?.randomUUID) {
    return webCrypto.randomUUID();
  }

  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (char) => {
    const random = Math.floor(Math.random() * 16);
    const value = char === 'x' ? random : (random & 0x3) | 0x8;
    return value.toString(16);
  });
}

function createRandomHex(length: number) {
  const webCrypto = getWebCrypto();

  if (webCrypto) {
    const bytes = new Uint8Array(length);
    webCrypto.getRandomValues(bytes);
    return Array.from(bytes, (byte) => byte.toString(16).padStart(2, '0')).join('');
  }

  let output = '';

  for (let i = 0; i < length; i += 1) {
    output += Math.floor(Math.random() * 256)
      .toString(16)
      .padStart(2, '0');
  }

  return output;
}

function getWebCrypto() {
  if (typeof globalThis === 'undefined') {
    return undefined;
  }

  return globalThis.crypto;
}
