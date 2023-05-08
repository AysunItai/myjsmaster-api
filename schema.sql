CREATE DATABASE myjsmaster_app;
USE myjsmaster_app;

CREATE TABLE signup (
  id integer PRIMARY KEY AUTO_INCREMENT,
  name varchar(100) NOT NULL,
  email varchar(100) NOT NULL,
  password varchar(100) NOT NULL,
  created_at timestamp NOT NULL DEFAULT NOW()
) ;

INSERT INTO signup (name,email,password)
VALUES
('LIZA MERRY','liza@marry','aA1cbnhnmlk');