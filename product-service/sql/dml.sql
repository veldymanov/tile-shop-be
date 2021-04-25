INSERT INTO products (title, description, price, created_date, updated_date)
VALUES
	('ProductOne', 'Short Product Description1', 240, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('ProductTwo', 'Short Product Description2', 240, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
	('ProductThree', 'Short Product Description3', 340, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
	('ProductFour', 'Short Product Description4', 440, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
	('ProductFive', 'Short Product Description5', 540, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
	('ProductSix', 'Short Product Description6', 640, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
	('ProductSeven', 'Short Product Description7', 740, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
	('ProductEight', 'Short Product Description8', 840, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
	('ProductNine', 'Short Product Description9', 940, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO stock (product_id, count)
VALUES
	('27750d24-9c66-4080-b886-31da5c2c4470',11),
	('19492ab1-0023-47ba-a6e5-182df5743945',12),
	('f0fff7d8-ed87-4928-bfd2-95e9bdce1c6e',13),
	('028b6e73-706b-4acc-aa40-6a7370a29cfc',14),
	('60632ae0-345b-4466-82c3-15dc3fc950b4',15),
	('cf0316b8-ee40-437e-8bb3-673306655ae6',16),
	('b90f8857-5a7f-4bbf-a953-40ff09e8a6e4',17),
	('9f0ea980-50dc-40f8-bfbd-a5d38a81f899',18);