import Encryp from "../encryp";
const encryp=new Encryp()
//对配置信息进行加密
export function encrypForSetter(decorativeObject,options){
    if(options.encryp){
        decorativeObject.value=encryp.encryption(decorativeObject.value)
        decorativeObject.isEncryped=true
    }
}
//对配置信息进行解密
export function decryptForGetter(decorativeObject){
    if(decorativeObject.isEncryped){
        decorativeObject.value=encryp.decrypt(decorativeObject.value)
    }
}