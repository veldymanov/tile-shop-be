CREATE extension "uuid-ossp";

CREATE TABLE products (
	id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
	title text not null,
	description text,
	price int,
	created_date timestamp not null,
	updated_date timestamp not null
);

CREATE TABLE stock (
  product_id uuid REFERENCES products (id),
	count int
);

-- ALTER TABLE products
-- ADD UNIQUE (title, description);

-- ALTER TABLE products
-- DROP CONSTRAINT products_title_description_key

ALTER TABLE products
ADD COLUMN sku varchar(50) NOT NULL UNIQUE;