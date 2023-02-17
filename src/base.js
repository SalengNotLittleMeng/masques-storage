import {getStorageOptions} from './util'
export default class BaseStorage{
    constructor(options={}){
        this.storageHandler=this.creatStorageHandler(options)
    }
    creatStorageHandler(options){
        return options.handler
    }
    get(key,isRow=false){
        if(isRow){
            return this.storageHandler.get(key)
        }
        const optionsInfo=getStorageOptions(this.storageHandler.get(key))
        if(this.handlerGetMethods){
            return handlerGetMethods(optionsInfo)
        }
        return optionsInfo&&optionsInfo.value
    }
    set(storageObject,isRow=false){
        if(this.handlerSetMethods&&!isRow){
                this.handlerSetMethods(storageObject)
        }
        Object.keys(key=>{
            this.storageHandler.set(key,storageObject[key])
        })
    }
    delete(key){
        this.storageHandler.delete(key)
    }
}