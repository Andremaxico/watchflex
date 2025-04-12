export const readableStreamToObject = async (stream: ReadableStream) => {
    const reader = stream.getReader();
    const decoder = new TextDecoder();
    let result = '';
    
    while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        result += decoder.decode(value, { stream: true });
    }
    
    result += decoder.decode(); // Finalize the decoding

    return JSON.parse(result);
}