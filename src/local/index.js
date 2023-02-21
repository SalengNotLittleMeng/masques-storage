import BaseStorage from '../base'
import {checkTimeoutForGetter, setTimeoutForSetter} from './setTimeout'
import {encrypForSetter,decryptForGetter} from './encryp'
export default class Local extends BaseStorage{
    constructor(options){
        super(options)
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
            getAll(){
                const len = localStorage.length;  
                var arr = new Array(); 
                for(let i = 0; i < len; i++) {
                    const getKey = localStorage.key(i);
                    const getVal = localStorage.getItem(getKey);
                    arr[i] = {
                        [getKey]: getVal,
                    }
                }
                return arr
            },
            clear(){
                localStorage.clear()
            }
        }
    }
    handlerSetMethods(decorativeObject,options){
        //修改添加超时功能
        setTimeoutForSetter(decorativeObject,options)
        //添加加密功能
        encrypForSetter(decorativeObject,options)
    }
    handlerGetMethods(decorativeObject,key){
        // 解密
        decryptForGetter(decorativeObject)
        //检验超时并删除
        const value=decorativeObject.value
        if(checkTimeoutForGetter(decorativeObject)){
            this.storageHandler.delete(key)
            return null
        }
        return value
    }
}