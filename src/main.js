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