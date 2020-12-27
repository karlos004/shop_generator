DROP DATABASE IF EXISTS `shop_gen`;
CREATE DATABASE `shop_gen`;
USE `shop_gen`;

CREATE TABLE `user`(
    `user_id` int NOT NULL AUTO_INCREMENT PRIMARY KEY ,
    `name` varchar(40) NOT NULL ,
    `email` varchar(40) NOT NULL UNIQUE ,
    `password` varchar(60) NOT NULL ,
    `active` boolean NOT NULL DEFAULT true,
    `registration_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE `shop`(
    `shop_id` int NOT NULL AUTO_INCREMENT PRIMARY KEY ,
    `user_id` int NOT NULL ,
    `uid` varchar(50) NOT NULL ,
    `name` varchar(50) NOT NULL ,
    `options` json ,
    `shop_url` varchar(80) ,
    `shop_git` varchar(80)
);

ALTER TABLE `shop` ADD FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`);


INSERT INTO shop (user_id, uid, name, shop_url) values (1, 'shop1-uwvb37vbugvibfguuigfgu', 'shop1', 'https://shop1-uwvb37vbugvibfguuigfgu.heroku.com');
INSERT INTO shop (user_id, uid, name, shop_url) values (1, 'shop2-uwvb37vbugvibfguuigfgu', 'shop2', 'https://shop2-uwvb37vbugvibfguuigfgu.heroku.com');
INSERT INTO shop (user_id, uid, name, shop_url) values (1, 'shop3-uwvb37vbugvibfguuigfgu', 'shop3', 'https://shop3-uwvb37vbugvibfguuigfgu.heroku.com');

SELECT * from user;

SELECT * FROM shop;