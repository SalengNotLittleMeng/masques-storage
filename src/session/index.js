import BaseStorage from '../base'
export default class Session extends BaseStorage{
    constructor(){
        super()
    }
    creatStorageHandler(){
        return {
            get(key){
                return sessionStorage.getItem(key)
            },
            set(key,value){
                sessionStorage.setItem(key,value)
            },
            delete(key){
                sessionStorage.removeItem(key)
            }
        }
    }
}