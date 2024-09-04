export const XorEncryptDecrypt = (input, secretKey) => {
    let output = '';
    for (let i = 0; i < input.length; i++) {
        const inputCode = input.charCodeAt(i);
        const secretCode = secretKey.charCodeAt(i % secretKey.length)
        const xor = inputCode ^ secretCode; // any number
        output += String.fromCharCode(xor); // &~
    }
    return output

}

export const Encrypt = (data, secretKey) => {
    const stringifiedData = JSON.stringify(data);
    return XorEncryptDecrypt(stringifiedData, secretKey)
}

export const Decrypt = (data, secretKey) => {
    try {
        const decryptedData = XorEncryptDecrypt(data, secretKey)
        return JSON.parse(decryptedData)
    } catch (error) {
        return null
    }

}