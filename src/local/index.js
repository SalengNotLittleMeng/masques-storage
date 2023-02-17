import BaseStorage from '../base'
export default class Local extends BaseStorage{
    constructor(){
        super()
    }
    creatStorageHandler(){
        return {
            get:localStorage.getItem,
            set:localStorage.setItem,
            delete:localStorage.removeItem,
        }
    }
}