const merge_into = (a,b) => {
    Object.keys(b).forEach((k,i)=>{
        if(typeof b[key] === 'object'){
            return merge_into(a[key], b[key]);
        }
        if(typeof a[key] !== 'undefined') b[key] = a[key];
        return b;
    });
}

module.exports = async (db, _data) => {
   
    const data = {
        _id : null,
        name : {
            first : null,
            middle: null,
            last: null
        },
        address : {
            service: {
                street: null,
                street2: null,
                city: null,
                state: null,
                zip: null,
                geo: {
                    lat: null,
                    lon: null
                }
            },
            billing : {
                same: true,
                street: null,
                street2: null,
                city: null,
                state: null,
                zip: null
            }
        }
    }

    if(typeof data !== 'undefined') {
        if(typeof data === 'object') {
            data = merge_into(_data, data);       
        } else {
            await fetch(data);
        }
    }

    const fetch = (id) => {
        return new Promise((resolve, reject)=>{
            return resolve(true)
        });
    }

    const save = () => {

    }

    return {
        fetch,
        save,
        data
    }
}