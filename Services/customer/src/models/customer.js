const merge_into = (a, b) => {
    Object.keys(b).forEach((key, i) => {
        if (typeof b[key] === 'object') {
            return merge_into(a[key], b[key]);
        }
        if (typeof a[key] !== 'undefined') b[key] = a[key];
        return b;
    });
}

module.exports = async (db, _data) => {

    let data = {
        _id: null,
        name: {
            first: null,
            middle: null,
            last: null
        },
        address: {
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
            billing: {
                same: true,
                street: null,
                street2: null,
                city: null,
                state: null,
                zip: null
            }
        },
        status : 1
    }

    if (typeof _data !== 'undefined') {
        if (typeof _data === 'object') {
            data = merge_into(_data, data);
        } else {
            await fetch(_data);
        }
    }

    const fetch = (_id) => {
        return new Promise(async (resolve, reject) => {
            if(typeof _id === 'undefined') {
                let res = await db.collection('customer').find({}).toArray();
                console.log(res)
                return resolve(res);
            } else {
                let res = await db.collection('customer').findOne({
                    _id
                }).catch(err => {
                    return reject(err);
                });
                data = merge_into(res, data);
                return resolve(data);
            }
        });
    }

    const update = (_data) => {
        data = merge_into(_data, data);
    }

    const save = () => {
        return new Promise(async (resolve, reject) => {
            let res = await db.collection('customer').insertOne(data, {
                upsert: true
            }).catch(err => {
                return reject(err);
            });
            return resolve(res)
        });
    }

    return {
        fetch,
        update,
        save,
        data
    }
}