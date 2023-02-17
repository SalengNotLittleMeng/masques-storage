import BaseStorage from '../base'
import {checkTimeoutForGetter, setTimeoutForSetter} from './setTimeout'
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
            }
        }
    }
    handlerSetMethods(decorativeObject,options){
        setTimeoutForSetter(decorativeObject,options)
    }
    handlerGetMethods(decorativeObject,key){
        const value=decorativeObject.value
        if(checkTimeoutForGetter(decorativeObject)){
            this.storageHandler.delete(key)
        }
        return value
    }
}