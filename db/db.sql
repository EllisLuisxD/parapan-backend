create database Parapan;
use Parapan;


CREATE TABLE users (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user VARCHAR(90) NOT NULL,
    email VARCHAR(180) NOT NULL UNIQUE, 
	phone VARCHAR(90) NOT NULL UNIQUE,
    dni VARCHAR(90) NOT NULL,
    password VARCHAR(90) NOT NULL,
    image VARCHAR(255) NULL,
    created_at TIMESTAMP(0) NOT NULL,
    updated_at TIMESTAMP(0) NOT NULL
);