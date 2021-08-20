USE cvl;
CREATE TABLE IF NOT EXISTS `users` (
  `uid` int NOT NULL AUTO_INCREMENT,
  `user` tinytext,
  `pass` tinytext,
  `name` mediumtext,
  `type` tinytext,
  `picture` tinytext,
  `access` json DEFAULT NULL,
  `added_by` tinytext,
  `added_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`uid`)
) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

insert into `users` (`access`, `added_by`, `added_time`, `name`, `pass`, `picture`, `type`, `user`) values ('{"1": true}', 'dev', '2021-08-17 20:15:47', 'john carl edcel manuel', 'comtechie', '', 'dev', 'edcelmanuel9');
insert into `users` (`access`, `added_by`, `added_time`, `name`, `pass`, `picture`, `type`,  `user`) values ('{"1": true}', 'dev', '2021-08-17 20:47:07', 'john edwin manuel', 'elprimo12', '', 'dev', 'intoymanuel');
