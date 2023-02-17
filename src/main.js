import Session from './session/index'
import Local from './local/index'
import Cache from './cache/index'
export default function useMasquesStorage(type,options){
    switch(type){
        case 'session':{
            return new Session(options)
        }
        case 'local':
            return new Local(options)
        case 'cache':
            return new Cache(options)
        default:
            return new Local(options)
    }
}