const decryptData = async (
	encryptedData: string,
	initVector: string,
	encryptionKey: string
  ) => {
	// Prepare the decryption key
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
  
	try {
	  // Decrypt the encrypted data using the key and IV
	  const decodedData = await crypto.subtle.decrypt(
		{
		  name: "AES-GCM",
		  iv: Buffer.from(initVector, "base64"),
		},
		cryptoKey,
		Buffer.from(encryptedData, "base64")
	  );
  
	  // Decode and return the decrypted data
	  return new TextDecoder().decode(decodedData);
	} catch (error) {
	  return JSON.stringify({ payload: null });
	}
};
  
export const handleDecryption = async ({ encryptedData, initVector }: any) => {
	console.log('encryption key in decryption function', process.env.ENCRYPTION_KEY);

	const decryptedString = await decryptData(
		encryptedData!,
		initVector!,
		process.env.ENCRYPTION_KEY!
	);

	const responseData = JSON.parse(decryptedString)?.data;

	return responseData;
};