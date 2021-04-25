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
