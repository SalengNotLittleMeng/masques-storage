// import {ref, watchEffect} from 'vue';
import Session from './session/index'
import Local from './local/index'
import Cache from './cache/index'
import Encryp from './encryp/index'
import Observe from './observe/index'
//根据不同的选项创建不同的对象
export default function useMasquesStorage(type,options={}){
    switch(type){
        case 'session':{
            return new Session(options)
        }
        case 'local':
            return new Local(options)
        case 'cache':
            return new Cache(options)
        case 'encryp':
            return new Encryp(options.key)
        default:
            return new Local(options)
    }
}
//创建响应式存储，会产生一个名叫store的事件，每次操作存储时触发
let observe=null
export function initStorageObserve(options){
        if(observe){
            return observe
        }else{
            return new Observe(options)
        }
}
//响应式hook
let storage=null
let ProxyStorageObject={}
const StorageSet=new Set()
//将一个存储对象变为响应式
export function useStorageRow(key,value={},options={}){
    initStorageObserve(options)
    getStorage(options)
    //代理对象
    ProxyStorageObject[key]={
        key,value,self:false
    }
    //收集依赖
    StorageSet.add(key)
    let ref=new Proxy(ProxyStorageObject,{
        get(target,prototype){
            if(prototype!='value'){
                return target[key][prototype]
            }
            return storage.get(key)
        },
        set(target,prototype,value){
            //修改的不是value则直接修改
            if(prototype!=='value'){
                return Reflect.set(target[key], prototype, value);
            }
            //如果是自身修改，不触发响应式
            if(!target[key]['self']){
                storage.set({[key]:value})
            }
            //重设值
            return Reflect.set(target[key], prototype, value);
        }
    })
    window.addEventListener('store',(event)=>{
        const {detail:{key,value,type}}=event
        if(type=='setItem'&&StorageSet.has(key)){
            //注意这里需要暂时锁死响应式，否则会造成递归爆栈
            ref.self=true
            ref.value=value
            ref.self=false
        }
    })
    return ref
}
// export function useStorage(key,value={},options={}){
//     getStorage(options)
//     const localData = ref(storage.get(key)|| value);
//     watchEffect(() => {
//         storage.set({[key]:value})
//     })

//     return localData;

// }
//获取使用的存储对象
function getStorage(options={}){
    const type=options.type || 'local'
    if(type=='session'){
        storage=new Session(options)
    }else{
        if(storage&&!options.reload){
            void 0
        }else{
            storage=new Local(options)
        }
    }
}