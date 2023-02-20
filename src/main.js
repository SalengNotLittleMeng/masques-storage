import {ref, watchEffect} from 'vue';
import Session from './session/index'
import Local from './local/index'
import Cache from './cache/index'
import Encryp from './encryp/index'
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
//响应式hook
const storage=null
export function useStorage(key,value={},options){
    const type=options.type || 'local'
    if(type=='session'){
        storage=new Session(options)
    }else{
        if(!storage||options.reload){
            void 0
        }else{
            storage=new Local(options)
        }
    }
    const localData = ref(storage.get(key)|| value);
    watchEffect(() => {
        storage.set({[key]:value})
    })

    return localData;

}