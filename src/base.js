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
        console.log(optionsInfo)
        if(this.handlerGetMethods){
            return handlerGetMethods(optionsInfo)
        }
        return optionsInfo&&optionsInfo.value
    }
    set(storageObject,isRow=false){
        Object.keys(storageObject).forEach(key=>{
            if(isRow){
                this.storageHandler.set(key,JSON.stringify(storageObject[key]))
                return
            }
            const decorativeObject=Object.create({})
            decorativeObject.value=storageObject[key]
            if(this.handlerSetMethods){
                this.handlerSetMethods(decorativeObject)
        }
            this.storageHandler.set(key,JSON.stringify(decorativeObject))
        })
    }
    delete(key){
        this.storageHandler.delete(key)
    }
}