import {getStorageOptions} from './util'
export default class BaseStorage{
    constructor(options={}){
        this.storageHandler=this.creatStorageHandler(options)
        this.nameSpace=options.nameSpace || ''
    }
    creatStorageHandler(options){
        return options.handler
    }
    get(key,options={}){
        if(options.isRow){
            return this.storageHandler.get(key)
        }
        const optionsInfo=getStorageOptions(this.storageHandler.get(key))
        if(this.handlerGetMethods){
            return this.handlerGetMethods(optionsInfo,key)
        }
        return optionsInfo&&optionsInfo.value
    }
    set(storageObject,options={}){
        Object.keys(storageObject).forEach(key=>{
            if(options.isRow){
                this.storageHandler.set(key,JSON.stringify(storageObject[key]))
                return
            }
            const nameSpace=options.nameSpace || this.nameSpace
            key=`${nameSpace?nameSpace+'/':''}${key}`
            const decorativeObject=Object.create({})
            decorativeObject.value=storageObject[key]
            if(this.handlerSetMethods){
                this.handlerSetMethods(decorativeObject,options)
        }
            this.storageHandler.set(key,JSON.stringify(decorativeObject))
        })
    }
    delete(key){
        this.storageHandler.delete(key)
    }
    has(key){
        return this.storageHandler.has(key)
    }
    getAll(){
        return this.storageHandler.getAll()
    }
    clear(options){
        const nameSpace=options.nameSpace || this.nameSpace
        if(!nameSpace){this.storageHandler.clear()}
        this.getAll().forEach(item=>{
            const key=Object.keys(item)[0]
            const nameSpacePrefix=key.split('/')[0]
            if(nameSpace==nameSpacePrefix){
                this.delete(key)
            }
        })
    }
}