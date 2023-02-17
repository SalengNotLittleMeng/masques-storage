import cryptoJs from 'crypto-js'
export default class Encryp{
    constructor(key){
        this.key=key|| 'qwdkshjf9834jsdf'
    }
    //加密函数
    encryption(word) {
        let key = cryptoJs.enc.Hex.parse(this.key);
        let enc = '';
        if(typeof word=='object'){
            word=JSON.stringify(word)
        }else if(typeof word=='number'){
            word=word.toString()
        }
            enc = cryptoJs.AES.encrypt(word, key, {
                // iv: iv
                mode: cryptoJs.mode.ECB,
                padding: cryptoJs.pad.Pkcs7
            })
        let encResult = enc.ciphertext.toString();
        return encResult;
    }
    //解密函数
        decrypt(word) {
        let key = cryptoJs.enc.Hex.parse(this.key);
        let dec = cryptoJs.AES.decrypt(cryptoJs.format.Hex.parse(word), key, {
            // vi: vi
            mode: cryptoJs.mode.ECB,
            padding: cryptoJs.pad.Pkcs7
        })
        let decData = cryptoJs.enc.Utf8.stringify(dec);
        return decData;
    }
    

}