Drop DATABASE IF EXSITS company;
CREATE DATABASE company;

USE company;

CREATE TABLE deapartment(
    id INTEGER AUTO_INCREMENT,
    name VARCHAR(30),
    PRIMARY KEY(id)
);


