DROP DATABASE IF EXISTS codicePostale;
CREATE DATABASE codicePostale;
USE MaintHelp;

CREATE TABLE IF NOT EXISTS comuni (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    codicePostale VARCHAR(10) NOT NULL
);