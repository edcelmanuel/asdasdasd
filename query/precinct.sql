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

CREATE TABLE IF NOT EXISTS `precinct` (
  `uid` int NOT NULL AUTO_INCREMENT,
  `mun` tinytext,
  `brgy` tinytext,
  `prec` tinytext,
  PRIMARY KEY (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `master`
--

INSERT INTO `precinct` (`mun`, `brgy`, `prec`) VALUES
 ('municipal 1', 'barangay 1', 'precinct 1'),
 ('municipal 1', 'barangay 1', 'precinct 2'),
 ('municipal 1', 'barangay 2', 'precinct 3'),
 ('municipal 1', 'barangay 2', 'precinct 4'),
 ('municipal 2', 'barangay 3', 'precinct 5'),
 ('municipal 2', 'barangay 3', 'precinct 6'),
 ('municipal 2', 'barangay 4', 'precinct 7'),
 ('municipal 2', 'barangay 4', 'precinct 8');