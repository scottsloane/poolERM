module.exports = () => {

    const _data = {
        _id : null,
        customer: null,
        employee: null,
        date: null,
        timein: null,
        timeout:null,
        images: [],
        actions: [],
        notes: []
        
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