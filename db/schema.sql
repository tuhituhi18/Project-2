CREATE DATABASE cravings_db;

USE cravings_db;
   
CREATE Table User (
id int NOT NULL AUTO_INCREMENT,
email VARCHAR (30) NOT NULL,
password VARCHAR (30) NOT NULL,
PRIMARY KEY (id)
);