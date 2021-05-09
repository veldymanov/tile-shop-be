# Tile Shop BE

## FE url
https://d2lvjuwl8mt9u1.cloudfront.net/


## Serverless
### Create service in new forlder
sls create --template (or -t) aws-nodejs --path (or -p) product-service --name (or -n) product-service
sls create -t aws-nodejs-typescript -p product-service -n product-service

### Deploy service
sls deploy
### Deploy one Lambda in the service
sls deploy -f getProductsList
### Run Lambda locally
sls invoke local -f getProductsList --path (or -p) ./src/functions/get-products-list/mock.json"


## PostgreSQL in AWS. Create, connect to pgAdmin
https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/CHAP_GettingStarted.CreatingConnecting.PostgreSQL.html
