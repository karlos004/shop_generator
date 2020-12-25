DROP DATABASE IF EXISTS `shop_gen`;
CREATE DATABASE `shop_gen`;
USE `shop_gen`;

CREATE TABLE `user`(
    `user_id` int NOT NULL AUTO_INCREMENT PRIMARY KEY ,
    `email` varchar(40) NOT NULL UNIQUE ,
    `password` binary(60) NOT NULL ,
    `active` boolean NOT NULL DEFAULT true,
    `registration_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE `shop`(
    `shop_id` int NOT NULL PRIMARY KEY ,
    `user_id` int NOT NULL ,
    `name` varchar(50) NOT NULL ,
    `options` json ,
    `shop_url` varchar(80) ,
    `shop_git` varchar(80)
);

ALTER TABLE `shop` ADD FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`);