import Session from './session/index'
import Local from './local/index'
export default function useMasquesStorage(type,options){
    switch(type){
        case 'session':{
            return new Session(options)
        }
        case 'local':
            return new Local(options)
        case 'cache':
            return
        default:
            return new Local(options)
    }
}