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