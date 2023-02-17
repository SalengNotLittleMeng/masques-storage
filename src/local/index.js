import BaseStorage from '../base'
import {checkTimeoutForGetter, setTimeoutForSetter} from './setTimeout'
import {encrypForSetter,decryptForGetter} from './encryp'
export default class Local extends BaseStorage{
    constructor(){
        super()
    }
    creatStorageHandler(){
        return {
            get(key){
                return localStorage.getItem(key)
            },
            set(key,value){
                localStorage.setItem(key,value)
            },
            delete(key){
                localStorage.removeItem(key)
            },
            has(key){
                return localStorage.has(key)
            },
            clear(){
                localStorage.clear()
            }
        }
    }
    handlerSetMethods(decorativeObject,options){
        setTimeoutForSetter(decorativeObject,options)
        encrypForSetter(decorativeObject,options)
    }
    handlerGetMethods(decorativeObject,key){
        decryptForGetter(decorativeObject)
        const value=decorativeObject.value
        if(checkTimeoutForGetter(decorativeObject)){
            this.storageHandler.delete(key)
        }
        return value
    }
}