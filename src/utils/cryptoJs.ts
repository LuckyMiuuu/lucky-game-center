import CryptoJS from 'crypto-js'

const AES_KEY = 'SYz945eCQB5EJvX5'
/*
*   AES加密
*/
export function encryptString(str: string) {
  if (!str) {
    return ''
  }

  const key = CryptoJS.enc.Utf8.parse(AES_KEY) // 十六位十六进制数作为密钥
  const srcs = CryptoJS.enc.Utf8.parse(str)
  return CryptoJS.AES.encrypt(srcs, key,  // 参数1=密钥, 参数2=加密内容
    {
      mode: CryptoJS.mode.ECB, // 为DES的工作方式
      padding: CryptoJS.pad.Pkcs7  // 当加密后密文长度达不到指定整数倍(8个字节、16个字节)则填充对应字符
    }
  ).ciphertext.toString(); // toString=转字符串类型
}
/*
*   AES解密
*/
export function decryptString(str: string) {
  if (!str) {
    return ''
  }
  
  const key = CryptoJS.enc.Utf8.parse(AES_KEY) // 十六位十六进制数作为密钥
  const encryptedHexStr = CryptoJS.enc.Hex.parse(str)
  const srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr)
  return CryptoJS.AES.decrypt(srcs, key, // 参数1=密钥, 参数2=解密内容
    {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
    }
  ).toString(CryptoJS.enc.Utf8).toString(); // toString=转字符串类型,并指定编码
}

