# poolERM User Microservice

## Summary

The poolERM User Microservice handles user management and authentication.

### API V1 Endpoints

``{post}/api/v1/user``
body:
```json
{
    "email": "string",
    "name": {
       "fist": "string", 
       "middle": "?string", 
       "last": "string"
    },
    "password": "string"
}
```

Creates a new user.

Returns:
```json
{
    "userId" : "string"
}
```

``{post}/api/v1/user/login``
body:
```json
{
    "email": "string",
    "password": "string"
}
```

Logs a user in.

Returns:
```js
JWT({
    _id : "string",
    name: {
        first: "string",
        middle: "string",
        last: "string"
    },
    email: "string",
    default_tenant: "Number",
    iat: "Number"
})
```


``{get}/api/v1/user/validate``
header:
```json
{
    "Authorization": "Bearer JWT_TOKEN"
}
```

Logs a user in.

Returns:
```js
JWT({
    _id : "string",
    name: {
        first: "string",
        middle: "string",
        last: "string"
    },
    email: "string",
    default_tenant: "Number",
    iat: "Number"
})
```