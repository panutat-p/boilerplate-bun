-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE `fruit` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(100) NOT NULL,
	`color` varchar(100) NOT NULL,
	`quantity` int,
	`updated_at` timestamp(6) DEFAULT (CURRENT_TIMESTAMP(6)) ON UPDATE CURRENT_TIMESTAMP,
	`created_at` timestamp(6) DEFAULT (CURRENT_TIMESTAMP(6)),
	CONSTRAINT `fruit_id` PRIMARY KEY(`id`)
);

*/