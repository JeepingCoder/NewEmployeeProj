/* To run seeds.sql, in the terminal, type: source seeds.sql */

DROP DATABASE IF EXISTS `team`;
CREATE DATABASE `team`;
USE `team`;


CREATE TABLE `department` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(30),
	PRIMARY KEY (`id`)
);



INSERT INTO `department` (`name`) VALUES('Sales');
INSERT INTO `department` (`name`) VALUES('Engineering');
INSERT INTO `department` (`name`) VALUES('Finance');
INSERT INTO `department` (`name`) VALUES('Legal');

CREATE TABLE `role` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(30),
	`salary` decimal(6),
	`department_id` int,
	PRIMARY KEY (`id`),
	FOREIGN KEY (`department_id`) REFERENCES `department` (`id`)
);
INSERT INTO `role` (`title`,`salary`,`department_id`) VALUES('Sales Lead',  85000, 1);
INSERT INTO `role` (`title`,`salary`,`department_id`) VALUES('Accountant',  85000, 3);



CREATE TABLE `employee` (
	`id` int AUTO_INCREMENT NOT NULL,
	`first_name` varchar(30) NOT NULL,
	`last_name` varchar(30) NOT NULL,
	`role_id` int,
	`manager_id` int,
	PRIMARY KEY (id),
	FOREIGN KEY (`role_id`) REFERENCES `role` (`id`),
	FOREIGN KEY (`manager_id`) REFERENCES `employee` (`id`)
);
INSERT INTO `employee` (`first_name`,`last_name`,`role_id`,`manager_id`) VALUES('Mary','Smith',1,null);
INSERT INTO `employee` (`first_name`,`last_name`,`role_id`,`manager_id`) VALUES('Jane','Doe',2,null);