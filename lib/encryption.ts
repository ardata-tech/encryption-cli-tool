import { crypto } from "@std/crypto/crypto";

export const encrypt = async (
  buffer: Uint8Array,
  password: string,
): Promise<Uint8Array> => {
  const iv = crypto.getRandomValues(new Uint8Array(16));

  // Derive key from password using PBKDF2
  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(password),
    "PBKDF2",
    false,
    ["deriveKey"],
  );

  const key = await crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt: iv, // Use the IV as salt
      iterations: 100000,
      hash: "SHA-256",
    },
    keyMaterial,
    { name: "AES-CTR", length: 256 },
    false,
    ["encrypt"],
  );

  // Encrypt the buffer
  const encrypted = await crypto.subtle.encrypt(
    { name: "AES-CTR", counter: iv, length: 128 },
    key,
    buffer,
  );

  // Concatenate IV and encrypted data
  return concatenateUint8Arrays([iv, new Uint8Array(encrypted)]);
};

export const decrypt = async (
  encrypted: Uint8Array,
  password: string,
): Promise<Uint8Array> => {
  const iv = encrypted.slice(0, 16);
  const _encrypted = encrypted.slice(16);

  // Derive key from password using PBKDF2
  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(password),
    "PBKDF2",
    false,
    ["deriveKey"],
  );

  const key = await crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt: iv, // Use the IV as salt
      iterations: 100000,
      hash: "SHA-256",
    },
    keyMaterial,
    { name: "AES-CTR", length: 256 },
    false,
    ["decrypt"],
  );

  // Decrypt the data
  try {
    const decrypted = await crypto.subtle.decrypt(
      { name: "AES-CTR", counter: iv, length: 128 },
      key,
      _encrypted,
    );

    return new Uint8Array(decrypted);
  } catch (error) {
    throw new Error("Decryption failed: " + error.message);
  }
};

// Helper function to concatenate Uint8Arrays
function concatenateUint8Arrays(arrays: Uint8Array[]): Uint8Array {
  const totalLength = arrays.reduce((acc, array) => acc + array.length, 0);
  const concatenated = new Uint8Array(totalLength);
  let offset = 0;
  for (const array of arrays) {
    concatenated.set(array, offset);
    offset += array.length;
  }
  return concatenated;
}
