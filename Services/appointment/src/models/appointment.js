module.exports = () => {

    const _data = {
        _id : null,
        customer: null,
        date: null
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