const {
    DB_URI
} = require("../config");
const {
    MongoClient,
    ObjectID
} = require('mongodb');
const mongoClient = new MongoClient(DB_URI);
const Customer = require('./customer');
let db = null;
let client = null;

test('db connection', async ()=>{

    client = await mongoClient.connect().catch(err => {
        console.log(err);
    });
    db = client.db('customer_test');
    expect(
        db === null
    ).toBe(false);
    //client.close();
});

test('test fetch all customers', async ()=>{
    
    let customer = await Customer(db);
    expect(
        Array.isArray(await customer.fetch())
    ).toBe(true);
    //client.close();
});

let _id = null;

test('insert a customer', async ()=>{

    let customer = await Customer(db, {
        name: {
            first: 'Test',
            middle: 'T',
            last: 'Testing'
        },
        address: {
            service: {
                street: '123 Test St.',
                city: 'Testberg',
                state: 'TS',
                zip: 12345
            },
            billing: {
                same: true,
            }
        }
    });

    let obj = await customer.save();
    _id = obj;
    expect(
        ObjectID.isValid(_id)
        //_id.match(/^[0-9a-fA-F]{24}$/)
    ).toBe(true);
    //client.close();
});

test('fetch one customer', async ()=>{

    let customer = await Customer(db);
    await customer.fetch(_id)
    expect(
        customer.data.name.first === 'Test'
    ).toBe(true);

});

let _customer = null;

test('fetch one customer on init', async ()=>{

    _customer = await Customer(db, _id.toString());
    expect(
        _customer.data.name.first === 'Test'
    );
    
});

test('update customer', async () => {
    _customer.update({
        middle : 'Tester'
    });
    await _customer.save();
    expect(
        ObjectID.isValid(_id)
    ).toBe(true);
})

test('Detect bad _id on fetch', async ()=>{

    //await expect(Customer(db, '1234')).rejects.toMatch('error');
    try {
        Customer(db, '1234')
    }catch(e){
        expect(e.message).toEqual('error')
    }

});

test('Reject on no connection [fetch]', async () => {
    client.close();
    try {
        Customer(db, _id.toString())
    }catch(e){
        expect(e.message).toEqual('error')
    }
});


test('Reject on no connection [save]', async () => {
    try {
        _customer.save()
    }catch(e){
        expect(e.message).toEqual('error')
    }
});

test('Reject on no connection [insert new]', async () => {
    try {
        let customer = await Customer(db, {
            name: {
                first: 'Test',
                middle: 'T',
                last: 'Testing'
            }
        });
        await customer.save();
    } catch(e){
        expect(e.message).toEqual('pool is draining, new operations prohibited')
    }
})