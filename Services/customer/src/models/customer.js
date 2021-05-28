const { ObjectID } = require("bson");

const merge_into = (a, b) => {
    Object.keys(b).forEach((key, i) => {
        if (typeof b[key] === 'object' && b[key] !== null) {
          if(typeof a[key] === 'undefined') a[key] = {};
            return merge_into(a[key], b[key]);
        }
        if (typeof a[key] !== 'undefined') b[key] = a[key];
    });
  return b;
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

    const fetch = (_id) => {
        return new Promise(async (resolve, reject) => {
            try {
                if(typeof _id === 'string') _id = ObjectID(_id);
            }catch(e){
                return reject(e);
            }
            if(typeof _id === 'undefined') {
                let res = await db.collection('customer').find({}).toArray();
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
            let res = null;
            if(data._id === null){
                res = await db.collection('customer').insertOne(data, {
                    upsert: true
                }).catch(err => {
                    return reject(err);
                });
            }else{
                res = await db.collection('customer').replaceOne({_id: data._id}, data).catch(err => {
                    return reject(err);
                });
            }
            
            return resolve(res.insertedId)
        });
    }

    if (typeof _data !== 'undefined') {
        if (typeof _data === 'object') {
            data = merge_into(_data, data);
        } else {
            await fetch(_data);
        }
    }

    return {
        fetch,
        update,
        save,
        data
    }
}