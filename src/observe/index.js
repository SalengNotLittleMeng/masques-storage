//观测localstorage的值，由于存储对象的方法跟Storage以子类的调用关系是强绑定，
//因此这里采用的方案是修改Storage对象的原型链调用
const STORAGEEVENT='store'
export default class Observe{
    constructor(options={}){
        //确认观测的对象
        this.storageType=this.ensureObserveType(options)
        this.reWriteStorageMethods()
    }
    //重写存储的方法
    reWriteStorageMethods(){
        const that=this
        const methodsList=['getItem','setItem','clear','removeItem']
        methodsList.forEach(method=>{
            Storage.prototype[method] = (function(key, value) {
                //创建自定义事件并触发
                dispatchEvent(that.createCustomEvent({detail
                :{
                    type:method,
                    key,
                    value
                }
                }))
                //将this跟存储对象绑定调用
                this.call(that.storageType, key, value);
            }).bind(Storage.prototype[method]);
        })
    }
    //创建可以传递信息的自定义事件对象
    createCustomEvent(options={}){
        return new CustomEvent(STORAGEEVENT,options)
    }
    //确认观测的对象
    ensureObserveType(options){
        const type=options.type || 'local'
        if(type=='session'){
            return sessionStorage
        }else {
            return localStorage
        }
    }
}