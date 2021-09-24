# PoolERM Basic Technical Specification

## Summary

PoolERM is a planned Enterprise Resource Management style system to aid in the Swimming Pool Cleaning and Service industry. This document attempts to define base scope and the needed feature set for the system.

## Scope

The ultimate scope of PoolERM is all services that will add value to a standard Swimming Pool Cleaning and Service company. This will include things like CRM (Customer Relationship Management), HRM (Human Resource Management), IMS (Inventory Management System), Fleet Management, Scheduling, Route Optimization, Proof of Execution, etc.

> Currently all financial features are out-of-scope but may be added as the system progresses as a whole.

## Initial Feature Set

#### Customer Management

Customer Management will be a system allowing for the basic CRUD management of the companies customers (past and present). This system will later evolve into the CRM system with feature additions.

#### Data

Proposed customer data is as follows:

```json
{
  "_id": "UUID",
  "name": {
    "first": "String",
    "last": "String:null",
    "middle": "String:null",
    "company": "String:null"
  },
  "address": {
    "service": {
      "street": "String",
      "street2": "String",
      "city": "String",
      "state": "String",
      "zip": "String",
      "geo": {
        "lat": "Float",
        "lon": "Float"
      }
    },
    "billing": {
      "sameAsService": "Bool",
      "street": "String:null",
      "street2": "String:null",
      "city": "String:null",
      "state": "String:null",
      "zip": "String:null"
    }
  },
  "service": {
    "level": { "unknown": "unknown" },
    "addOns": [{ "unknown": "unknown" }]
  }
}
```

#### Service

The CM service will be a microservice with a HTTP restful API. This service may benefit from pub/sub events.

### Fleet Management

The fleet management service will handle trucks/vans for routing and scheduling. Later this can be linked to employees.

### Schedule Management

The schedule management service will handle each day's customers.

### Route Optimization

The route optimization service will take a days schedule for each truck/van and optimize the order for stops.
