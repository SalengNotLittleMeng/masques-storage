export function getStorageOptions(value){
    if(typeof value =='string'){
        try{
            return JSON.stringify(value)
        }catch(e){void 0}
    }
    return value
}