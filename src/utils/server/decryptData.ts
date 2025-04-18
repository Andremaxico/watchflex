const decryptData = async (
	encryptedData: string,
	initVector: string,
	encryptionKey: string,
  ) => {
	const textEncoder = new TextEncoder();

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
  
	console.log('decrypt crypto key', cryptoKey);

	
	try {
		// we transform the encrypted string to an UInt8Array
		const uint8ArrayEncryptedString = new Uint8Array(textEncoder.encode(encryptedData));

		// we transform the Array to a String so we have a representation we can carry around
		const stringifiedEncryption = String.fromCharCode(...uint8ArrayEncryptedString);

		/* now is time to decrypt again the message, so we transform the string into a char array and for every iteration we transform 
		the char into a byte, so in the end we have a byte array
		*/
		const stringByteArray = [...stringifiedEncryption].map((v) => v.charCodeAt(0))

		// we transform the byte array into a Uint8Array buffer
		const stringBuffer = new Uint8Array(stringByteArray.length);

		// we load the buffer
		stringByteArray.forEach((v, i) => stringBuffer[i] = v)

		console.log('iv in decoding', initVector);

		// Decrypt the encrypted data using the key and IV
		const decodedData = await crypto.subtle.decrypt(
			{
				name: "AES-GCM",
				iv: Buffer.from(initVector, "base64"),
			},
			cryptoKey,
			stringBuffer
		);
  
		console.log('decoded data', decodedData);

		// Decode and return the decrypted data
		return new TextDecoder().decode(decodedData);
	} catch (error) {
		console.error('error in decoding', error);
	  	return JSON.stringify({ payload: null });
	}
};
  
export const handleDecryption = async (
	{ encryptedData, initVector }: 
	{initVector: string, encryptedData: string }
) => {
	console.log('encryptedData', encryptedData, 'iv', initVector);
	const decryptedString = await decryptData(
		encryptedData,
		initVector,
		process.env.NEXT_PUBLIC_ENCRYPTION_KEY!,
	);

	const responseData = JSON.parse(decryptedString)?.data;

	console.log('response data', responseData);

	return responseData;
};