CREATE TABLE category (
cat_id int(11) NOT NULL AUTO_INCREMENT,
name varchar(100),
PRIMARY KEY (cat_id)
) ENGINE=InnoDB;

INSERT INTO category (name) VALUES
('Hedelmät ja vihannekset'),
('Juomat'),
('Kala ja liha'),
('Pakasteet'),
('Ateriaratkaisut'),
('Herkut');

CREATE TABLE brand (
brand_id int(11) NOT NULL AUTO_INCREMENT,
name varchar(100),
PRIMARY KEY (brand_id)
) ENGINE=InnoDB;

INSERT INTO brand (name) VALUES
('Pirkka'),
('Rainbow'),
('Atria'),
('Saarioinen'),
('HK'),
('Valio'),
('Fazer'),
('Paulig');

INSERT INTO brand (name) VALUES
('Ei merkkiä');

CREATE TABLE groceries (
gr_id int(11) NOT NULL AUTO_INCREMENT,
name varchar(100),
cat_id int(100),
brand_id int(100),
PRIMARY KEY (gr_id),
FOREIGN KEY (cat_id) REFERENCES category(cat_id),
FOREIGN KEY (brand_id) REFERENCES brand(brand_id)
);

ALTER TABLE groceries ADD price VARCHAR(100);
ALTER TABLE groceries ADD amount VARCHAR(100);



INSERT INTO groceries (name, cat_id, brand_id, price, amount) VALUES
('Banaani', 1, 9, '0,20', '50g'),
('Maito', 2, 6, '0,85', '1l'),
('Jauheliha', 3, 5, '3,0', '400g'),
('Sininen suklaalevy', 6, 7, '2,0', '200g'),
('Kurkku', 1, 9, '1,0', '50g'),
('Kahvi', 2, 8, '3,0', '500g');

CREATE TABLE order_row (
or_id int(11) NOT NULL AUTO_INCREMENT,
quantity int(11),
gr_id int(11),
PRIMARY KEY (or_id),
FOREIGN KEY (gr_id) REFERENCES groceries(gr_id)
);

CREATE TABLE shoppinglist (
shop_id int(11) NOT NULL AUTO_INCREMENT,
date varchar(200),
resolved varchar(100),
or_id int(11),
PRIMARY KEY (shop_id),
FOREIGN KEY (or_id) REFERENCES order_row(or_id)
);