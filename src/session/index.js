import BaseStorage from '../base'
export default class Session extends BaseStorage{
    constructor(){
        super()
    }
    creatStorageHandler(){
        return {
            get:sessionStorage.getItem,
            set:sessionStorage.setItem,
            delete:sessionStorage.removeItem,
        }
    }
}