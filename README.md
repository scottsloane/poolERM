# poolERM

Building a microservice platform for the Pool industry

## Add a microservice

1. Copy ./Services/_template folder to a new directory named for your new service
2. Modify the template to meet the needs of the service and arch
3. Add to the docker-compose file

  customer:
    build: "./Services/{service_name}"
    ports:
      - "300x:3000"
    depends_on:
      - db
    environment:
      - MONGO_DB_URI=mongodb://db/microservices
      - MONGO_DB_NAME=db_collection_name
