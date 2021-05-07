# Tile Shop BE

## FE url
https://d2lvjuwl8mt9u1.cloudfront.net/

## getProducs endpoint
GET - https://i7pjln1loi.execute-api.eu-west-1.amazonaws.com/dev/products

## createProduc endpoint
POST - https://i7pjln1loi.execute-api.eu-west-1.amazonaws.com/dev/products
Body:
``
{
	"title": "ProductTitle",
  "description": "Short Product Description",
  "price": 13,
  "count": 13
}
``

## getProductById endpoint
GET - https://i7pjln1loi.execute-api.eu-west-1.amazonaws.com/dev/product/{id}


## Serverless
### Create service in new forlder
sls create --template (or -t) aws-nodejs --path (or -p) product-service --name (or -n) --name (or -n) product-service
sls create --template (or -t) aws-nodejs-typescript --path (or -p) product-service --name (or -n) product-service

### Deploy service
sls deploy
### Deploy one Lambda in the service
sls deploy -f getProductsList
### Run Lambda locally
sls invoke local -f getProductsList --path (or -p) ./src/functions/get-products-list/mock.json"


## PostgreSQL in AWS. Create, connect to pgAdmin
https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/CHAP_GettingStarted.CreatingConnecting.PostgreSQL.html
