module.exports = () => {

    const _data = {
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

    const fetch = (id) => {
        return new Promise((resolve, reject)=>{
            return resolve(true)
        });
    }

    return {
        fetch
    }
}