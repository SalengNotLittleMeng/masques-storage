import {getStorageOptions} from './util'
// 存储基类
export default class BaseStorage{
    constructor(options={}){
        //向下提供处理存储对象的接口，向下对象可以自己实现方法注册为存储对象
        this.storageHandler=this.creatStorageHandler(options)
        //命名空间
        this.nameSpace=options.nameSpace || ''
    }
    creatStorageHandler(options){
        return options.handler
    }
    //修饰get的存储方法
    get(key,options={}){
        if(options.isRow){
            return this.storageHandler.get(key)
        }
        //获取配置
        const optionsInfo=getStorageOptions(this.storageHandler.get(key))
        //向下提供处理存储信息的接口
        if(this.handlerGetMethods){
            return this.handlerGetMethods(optionsInfo,key)
        }
        return optionsInfo&&optionsInfo.value
    }
    //修饰set的存储方法
    set(storageObject,options={}){
        //遍历对象
        Object.keys(storageObject).forEach(key=>{
            if(options.isRow){
                this.storageHandler.set(key,JSON.stringify(storageObject[key]))
                return
            }
            //添加命名空间
            const nameSpace=options.nameSpace || this.nameSpace
            key=`${nameSpace?nameSpace+'/':''}${key}`
            //创建修饰信息对象
            const decorativeObject=Object.create({})
            decorativeObject.value=storageObject[key]
            //向下提供修改配置的接口
            if(this.handlerSetMethods){
                this.handlerSetMethods(decorativeObject,options)
        }
        //调用接口进行存储
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
    //在命名空间内进行清除
    clear(options){
        const nameSpace=options.nameSpace || this.nameSpace
        if(!nameSpace){this.storageHandler.clear()}
        this.getAll().forEach(item=>{
            const key=Object.keys(item)[0]
            //获取命名空间
            const nameSpacePrefix=key.split('/')[0]
            if(nameSpace==nameSpacePrefix){
                this.delete(key)
            }
        })
    }
}