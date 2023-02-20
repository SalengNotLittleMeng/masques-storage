// import {ref, watchEffect} from 'vue';
import Session from './session/index'
import Local from './local/index'
import Cache from './cache/index'
import Encryp from './encryp/index'
import Observe from './observe/index'
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
export function initStorageObserve(){
        return new Observe()
}
//响应式hook
let storage=null
var ProxyStorageObject={}
export function useStorageRow(key,value={},options={}){
    initStorageObserve()
    getStorage(options)
    ProxyStorageObject[key]={
        key,value
    }
    let ref=new Proxy(ProxyStorageObject,{
        get(target,prototype){
            return target[key][prototype]
        },
        set(target,prototype,value){
            storage.set({key:value})
            return Reflect.set(target[key], prototype, value);
        }
    })
    window.addEventListener('storage',(e)=>{
        console.log(e)
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