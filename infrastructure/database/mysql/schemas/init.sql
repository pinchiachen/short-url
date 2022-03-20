/******************************************
* 1: Create database short_url
******************************************/

CREATE DATABASE IF NOT EXISTS `short_url`
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

USE `short_url`;

/******************************************
* 2: Create tables for short_url
******************************************/

CREATE TABLE IF NOT EXISTS `short_url`.`url_key_0000`
(
  `id` SERIAL,
  `url_key` VARCHAR(20) NOT NULL,
  `original_url` VARCHAR(1024) NOT NULL,
  `expired_stamp` DATETIME,
  `create_stamp` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `upadte_stamp` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_url_key` (`url_key`)
);

CREATE TABLE IF NOT EXISTS `short_url`.`url_key_0001`
(
  `id` SERIAL,
  `url_key` VARCHAR(20) NOT NULL,
  `original_url` VARCHAR(1024) NOT NULL,
  `expired_stamp` DATETIME,
  `create_stamp` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `upadte_stamp` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_url_key` (`url_key`)
);

CREATE TABLE IF NOT EXISTS `short_url`.`url_key_0002`
(
  `id` SERIAL,
  `url_key` VARCHAR(20) NOT NULL,
  `original_url` VARCHAR(1024) NOT NULL,
  `expired_stamp` DATETIME,
  `create_stamp` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `upadte_stamp` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_url_key` (`url_key`)
);

CREATE TABLE IF NOT EXISTS `short_url`.`url_key_0003`
(
  `id` SERIAL,
  `url_key` VARCHAR(20) NOT NULL,
  `original_url` VARCHAR(1024) NOT NULL,
  `expired_stamp` DATETIME,
  `create_stamp` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `upadte_stamp` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_url_key` (`url_key`)
);

CREATE TABLE IF NOT EXISTS `short_url`.`url_key_0004`
(
  `id` SERIAL,
  `url_key` VARCHAR(20) NOT NULL,
  `original_url` VARCHAR(1024) NOT NULL,
  `expired_stamp` DATETIME,
  `create_stamp` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `upadte_stamp` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_url_key` (`url_key`)
);

CREATE TABLE IF NOT EXISTS `short_url`.`url_key_0005`
(
  `id` SERIAL,
  `url_key` VARCHAR(20) NOT NULL,
  `original_url` VARCHAR(1024) NOT NULL,
  `expired_stamp` DATETIME,
  `create_stamp` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `upadte_stamp` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_url_key` (`url_key`)
);

CREATE TABLE IF NOT EXISTS `short_url`.`url_key_0006`
(
  `id` SERIAL,
  `url_key` VARCHAR(20) NOT NULL,
  `original_url` VARCHAR(1024) NOT NULL,
  `expired_stamp` DATETIME,
  `create_stamp` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `upadte_stamp` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_url_key` (`url_key`)
);

CREATE TABLE IF NOT EXISTS `short_url`.`url_key_0007`
(
  `id` SERIAL,
  `url_key` VARCHAR(20) NOT NULL,
  `original_url` VARCHAR(1024) NOT NULL,
  `expired_stamp` DATETIME,
  `create_stamp` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `upadte_stamp` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_url_key` (`url_key`)
);
