const { ObjectID } = require("bson");
const DB_COLLECTION = 'user';

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
            last: null,
        },
        email: null,
        default_tenant: 0,
        tenants: [0],
        status : 1,
        auth: {
            credential: null,
            validated: false,
            token: null,
        }
    }

    const lookup = (email) => {
        return new Promise(async (resolve, reject) => {
            if(typeof email === 'undefined') {
                return reject('No user defined');
            } else {
                let res = await db.collection(DB_COLLECTION).findOne({
                    email
                }).catch(err => {
                    return reject(err);
                });
                
                data = merge_into(res, data);
                return resolve(data);
            }
        });
    }

    const fetch = (_id) => {
        return new Promise(async (resolve, reject) => {
            try {
                if(typeof _id === 'string') _id = ObjectID(_id);
            }catch(e){
                return reject(e);
            }
            if(typeof _id === 'undefined') {
                let res = await db.collection(DB_COLLECTION).find({}).toArray();
                return resolve(res);
            } else {
                let res = await db.collection(DB_COLLECTION).findOne({
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
                res = await db.collection(DB_COLLECTION).insertOne(data, {
                    upsert: true
                }).catch(err => {
                    return reject(err);
                });
            }else{
                res = await db.collection(DB_COLLECTION).replaceOne({_id: data._id}, data).catch(err => {
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

    const getSafe = () => {
        return {
            _id : data._id,
            name: data.name,
            email: data.email,
            default_tenant: data.default_tenant

        }
    }

    return {
        fetch,
        lookup,
        update,
        save,
        getSafe,
        data
    }
}