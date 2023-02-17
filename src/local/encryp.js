import Encryp from "../encryp";
const encryp=new Encryp()

export function encrypForSetter(decorativeObject,options){
    if(options.encryp){
        decorativeObject.value=encryp.encryption(decorativeObject.value)
        decorativeObject.isEncryped=true
    }
}

export function decryptForGetter(decorativeObject){
    if(decorativeObject.isEncryped){
        decorativeObject.value=encryp.decrypt(decorativeObject.value)
    }
}