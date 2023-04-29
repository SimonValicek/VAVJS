CREATE DATABASE IF NOT EXISTS skurvenadbvdockeri CHARACTER SET utf8 COLLATE utf8_general_ci;

USE skurvenadbvdockeri;

ALTER USER 'root'@'%' IDENTIFIED WITH mysql_native_password BY 'root';

FLUSH PRIVILEGES;
