let obj = {
    name: 'Hello',
    data: [
        {
            age: '',
            number:''
        }
    ]
}


let name = 'cash';
let value = 211;

obj = {
    ...obj,
    data:[
        obj.data,
        
    ]
}

console.log(obj);