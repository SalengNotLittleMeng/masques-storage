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
            },
            has(key){
                return sessionStorage.has(key)
            },
            getAll(){
                const len = sessionStorage.length;  
                var arr = new Array(); 
                for(let i = 0; i < len; i++) {
                    const getKey = sessionStorage.key(i);
                    const getVal = sessionStorage.getItem(getKey);
                    arr[i] = {
                        [getKey]: getVal,
                    }
                }
                return arr
            },
            clear(){
                sessionStorage.clear()
            }
        }
    }
}