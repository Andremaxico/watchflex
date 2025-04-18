const encryptData = async (plainData: string, encryptionKey: string) => {
	// Generate a random 96-bit initialization vector (IV)
	const initVector = crypto.getRandomValues(new Uint8Array(12));
  
	// Encode the data to be encrypted
	const encodedData = new TextEncoder().encode(plainData);
  
	// Prepare the encryption key
	const cryptoKey = await crypto.subtle.importKey(
	  "raw",
	  Buffer.from(encryptionKey, "base64"),
		{
			name: "AES-GCM",
			length: 256,
		},
		true,
		["encrypt", "decrypt"]
	);

	console.log('encryptcrypto key', cryptoKey);
	console.log('iv in encoding', initVector);

	// Encrypt the encoded data with the key
	const encryptedData = await crypto.subtle.encrypt(
	  {
		name: "AES-GCM",
		iv: initVector,
	  },
	  cryptoKey,
	  encodedData
	);
  
	// Return the encrypted data and the IV, both in base64 format
	return {
	  encryptedData: Buffer.from(encryptedData).toString("base64"),
	  initVector: Buffer.from(initVector).toString("base64"),
	  cryptoKey,
	};
  };
  
export const handleEncryption = async (data: any) => {
	console.log('encryption key in encryption func', process.env.ENCRYPTION_KEY);
	return await encryptData(
		JSON.stringify({ data }),
		process.env.NEXT_PUBLIC_ENCRYPTION_KEY!
	)
}