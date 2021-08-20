USE cvl;
-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: db:3306
-- Generation Time: Aug 20, 2021 at 12:50 PM
-- Server version: 8.0.26
-- PHP Version: 7.4.20

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `cvl`
--

-- --------------------------------------------------------

--
-- Table structure for table `master`
--

CREATE TABLE IF NOT EXISTS `users` (
  `uid` int NOT NULL AUTO_INCREMENT,
  `user` tinytext,
  `pass` tinytext,
  `email` tinytext,
  `name` mediumtext,
  `name_first` mediumtext,
  `name_middle` mediumtext,
  `name_last` mediumtext,
  `type` tinytext,
  `picture` tinytext,
  `pending` tinytext,
  `access` json DEFAULT NULL,
  `added_by` tinytext,
  `added_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `master`
--

INSERT INTO `users` (`access`, `added_by`, `added_time`, `email`, `name`, `name_first`, `name_middle`, `name_last`,`pass`, `picture`, `type`, `user`, `pending`) VALUES
 ('{"1": true}', 'dev', '2021-08-17 20:15:47', 'edcelmanuel9@gmail.com', 'john carl edcel manuel',  'John Carl Edcel', 'Ancheta', 'Manuel', 'comtechie', '', 'dev', 'edcelmanuel9', 'approved'),
 ('{"1": true}', 'dev', '2021-08-17 20:47:07', 'edcelmanuel9@gmail.com', 'john edwin manuel',  'John Edwin', 'Ancheta', 'Manuel', 'elprimo12', '', 'dev', 'intoymanuel', 'approved');