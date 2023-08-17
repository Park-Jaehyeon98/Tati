CREATE DATABASE  IF NOT EXISTS `tati` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `tati`;
-- MySQL dump 10.13  Distrib 8.0.20, for Win64 (x86_64)
--
-- Host: i9b305.p.ssafy.io    Database: tati
-- ------------------------------------------------------
-- Server version	8.0.34-0ubuntu0.20.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `attendance`
--

DROP TABLE IF EXISTS `attendance`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `attendance` (
  `attendance_id` int NOT NULL AUTO_INCREMENT,
  `content` varchar(255) DEFAULT NULL,
  `in_time` datetime NOT NULL,
  `is_attended` char(1) DEFAULT NULL,
  `out_time` datetime DEFAULT NULL,
  `penalty_amt` int DEFAULT '0',
  `score` int DEFAULT '0',
  `member_id` int DEFAULT NULL,
  `study_member_id` int DEFAULT NULL,
  PRIMARY KEY (`attendance_id`),
  KEY `FKslaf4mu3eu0gi72u4t9xcsxjd` (`member_id`),
  KEY `FKk5byigce4lylhgt69bytn00j2` (`study_member_id`),
  CONSTRAINT `FKk5byigce4lylhgt69bytn00j2` FOREIGN KEY (`study_member_id`) REFERENCES `study_member` (`study_member_id`),
  CONSTRAINT `FKslaf4mu3eu0gi72u4t9xcsxjd` FOREIGN KEY (`member_id`) REFERENCES `member` (`member_id`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `attendance`
--

LOCK TABLES `attendance` WRITE;
/*!40000 ALTER TABLE `attendance` DISABLE KEYS */;
INSERT INTO `attendance` VALUES (10,'1일 1독서 결석','2023-08-17 23:00:00','0','2023-08-17 22:15:00',2000,-4,9,NULL);
/*!40000 ALTER TABLE `attendance` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `board`
--

DROP TABLE IF EXISTS `board`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `board` (
  `board_id` int NOT NULL AUTO_INCREMENT,
  `board_content` varchar(255) NOT NULL,
  `board_file` varchar(300) DEFAULT NULL,
  `board_hit` int NOT NULL,
  `board_title` varchar(50) NOT NULL,
  `board_type` char(1) NOT NULL,
  `created_date` datetime DEFAULT NULL,
  `main_notice_yn` bit(1) DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `member_id` int DEFAULT NULL,
  `study_id` int DEFAULT NULL,
  PRIMARY KEY (`board_id`),
  KEY `FKsds8ox89wwf6aihinar49rmfy` (`member_id`),
  KEY `FK5k7cumrcnv50rfeec0hsckvxo` (`study_id`),
  CONSTRAINT `FK5k7cumrcnv50rfeec0hsckvxo` FOREIGN KEY (`study_id`) REFERENCES `study` (`study_id`),
  CONSTRAINT `FKsds8ox89wwf6aihinar49rmfy` FOREIGN KEY (`member_id`) REFERENCES `member` (`member_id`)
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `board`
--

LOCK TABLES `board` WRITE;
/*!40000 ALTER TABLE `board` DISABLE KEYS */;
INSERT INTO `board` VALUES (1,'- 스터디에 신청할 때, 스터디 방장이 설정한 금액만큼의 보증금이 포인트에서 차감됩니다.                                                                \n- 포인트가 부족할 경우 스터디 생성 및 신청이 제한될 수 있습니다.\n\n\n\n\n\n- 스터디 신청이 거절된 경우 신청 시 지불한 보증금이 반환됩니다.',NULL,40,'스터디 보증금 규칙','0','2023-08-17 07:47:12',_binary '\0','2023-08-17 12:06:46',1,NULL),(2,'스터디 일정을 기준으로 해당 요일의 스터디 시작 시간 10분 전부터 캠스터디에 입실할 수 있습니다.',NULL,28,'스터디 입퇴실 규칙','0','2023-08-17 07:49:35',_binary '\0','2023-08-17 12:53:38',1,NULL),(3,'보증금은 12000원\n결석 1번 시 보증금 4000원\n결석 금지 지각 금지!',NULL,1,'스터디 규칙 공지 (0817)','1','2023-08-17 08:02:51',_binary '','2023-08-17 08:02:55',6,4),(4,'- 스터디 일정을 기준으로 해당 요일의 스터디 시작 시간 10분 전부터 캠스터디에 입실할 수 있습니다.\n',NULL,0,'스터디 입퇴실 규칙','9','2023-08-17 08:10:05',_binary '\0','2023-08-17 08:10:05',1,NULL),(5,'보증금은 6000원으로, 결석 1번 시 보증금 2000원이 차감됩니다. 스터디 게시판에서는 자격증과 관련한 이야기만 하실 수 있습니다.',NULL,1,'공지사항','1','2023-08-17 08:10:07',_binary '','2023-08-17 08:10:11',2,2),(6,'보증금은 3000원으로, 결석 1번시 보증금 1000원이 차감됩니다. 교재는 수제비, 시나공 두 개로 진행합니다. 스터디 게시판에서 자유롭게 이야기하실 수 있습니다.',NULL,5,'공지사항','1','2023-08-17 08:10:59',_binary '','2023-08-17 08:42:33',2,1),(7,'보증금은 3000원으로, 결석 1번시 보증금 1000원이 차감됩니다. 실제 면접이라고 생각하고 양복을 준비해주세요. 스터디 시작 10분 전 까지 스터디 게시판에 자기소개서 제출 필수입니다. ',NULL,1,'공지사항','1','2023-08-17 08:12:29',_binary '','2023-08-17 08:12:32',2,3),(8,'보증금은 3000원으로, 결석 1번시 보증금 1000원이 차감됩니다. pt 면접을 위해 하루에 하나씩 기사 스크랩 정리하고, 그에 대한 꼬리 질문을 하나씩 댓글로 달아주세요.',NULL,6,'공지사항','1','2023-08-17 08:14:00',_binary '','2023-08-17 08:43:30',2,5),(9,'보증금은 3000원입니다. 과제 제출하기 전에 서로 못 푼 문제들 알려주고 같이 A+ 받아요!',NULL,5,'공지사항','1','2023-08-17 08:26:23',_binary '','2023-08-17 10:40:25',2,8),(40,'반갑습니다.',NULL,2,'안녕하세여','2','2023-08-17 15:16:51',_binary '\0','2023-08-17 15:17:37',8,24),(41,'열심히 합시다.',NULL,1,'공지사항입니다.','1','2023-08-17 15:17:29',_binary '\0','2023-08-17 15:17:32',8,24),(42,'반갑습니다','https://tatibucket.s3.ap-northeast-2.amazonaws.com/8e39ff49-7d5d-46cb-891c-5e0ac8f19b4b_611311110011938257_1.jpg',1,'안녕하세요','2','2023-08-17 15:18:17',_binary '\0','2023-08-17 15:18:18',8,24);
/*!40000 ALTER TABLE `board` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `category_id` int NOT NULL AUTO_INCREMENT,
  `category_name` varchar(20) NOT NULL,
  PRIMARY KEY (`category_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (1,'자격증'),(2,'취업'),(3,'학교'),(4,'공시'),(5,'기타');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comment`
--

DROP TABLE IF EXISTS `comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comment` (
  `comment_id` int NOT NULL AUTO_INCREMENT,
  `comment_content` varchar(255) NOT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `board_id` int DEFAULT NULL,
  `member_id` int DEFAULT NULL,
  PRIMARY KEY (`comment_id`),
  KEY `FKlij9oor1nav89jeat35s6kbp1` (`board_id`),
  KEY `FKmrrrpi513ssu63i2783jyiv9m` (`member_id`),
  CONSTRAINT `FKlij9oor1nav89jeat35s6kbp1` FOREIGN KEY (`board_id`) REFERENCES `board` (`board_id`),
  CONSTRAINT `FKmrrrpi513ssu63i2783jyiv9m` FOREIGN KEY (`member_id`) REFERENCES `member` (`member_id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comment`
--

LOCK TABLES `comment` WRITE;
/*!40000 ALTER TABLE `comment` DISABLE KEYS */;
INSERT INTO `comment` VALUES (11,'ㅎㅎ','2023-08-17 15:17:00','2023-08-17 15:17:00',40,8),(12,'ㅎㅎ','2023-08-17 15:18:22','2023-08-17 15:18:22',42,8),(13,'ㅎㅎ','2023-08-17 15:18:22','2023-08-17 15:18:22',42,8);
/*!40000 ALTER TABLE `comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `member`
--

DROP TABLE IF EXISTS `member`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `member` (
  `member_id` int NOT NULL AUTO_INCREMENT,
  `created_date` date DEFAULT NULL,
  `email` varchar(50) NOT NULL,
  `member_img` varchar(300) DEFAULT NULL,
  `member_name` varchar(20) NOT NULL,
  `member_nick_name` varchar(10) NOT NULL,
  `password` varchar(70) NOT NULL,
  `total_point` int NOT NULL,
  `total_score` tinyint NOT NULL,
  `total_study_time` int NOT NULL,
  PRIMARY KEY (`member_id`),
  UNIQUE KEY `UK_mbmcqelty0fbrvxp1q58dn57t` (`email`),
  UNIQUE KEY `UK_sc5dmxky3y33h11glkb5sm84` (`member_nick_name`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `member`
--

LOCK TABLES `member` WRITE;
/*!40000 ALTER TABLE `member` DISABLE KEYS */;
INSERT INTO `member` VALUES (1,'2023-08-17','admin@gmail.com',NULL,'관리자','admin','{bcrypt}$2a$10$iCg8RcbZY2tWgyjqzdDQz.rlQKOHap1UU7packHEcVIrb571aYkWC',0,10,0),(2,'2023-08-10','zhdwldus@naver.com',NULL,'유지연','유싸피','{bcrypt}$2a$10$dHdYkgQHasDh53d3NEyQs.5jcHWkZtWEZPhiCb/Ly0JKRM.dAqocS',29600,16,4631),(3,'2023-08-17','gydls',NULL,'효인','효인','{bcrypt}$2a$10$Z1eF1sIinaBR0GzTi6yVYesghfDGADlGoBLzx19epNML/GC1st9Du',105000,10,0),(4,'2023-08-17','t01045999371@gmail.com','https://tatibucket.s3.ap-northeast-2.amazonaws.com/c27b34c2-ca3a-469f-92c9-ee5234788752_%ED%86%A0%EB%A7%88%EC%8A%A4.jpg','공포의 토마스','공포의 토마스','{bcrypt}$2a$10$wSvvSkHOi2XA7VuWmNSxqetgpGH129SwmjmL74LChbMKOoXBaiGNu',552000,10,0),(5,'2023-08-17','holizon9@naver.com','https://tatibucket.s3.ap-northeast-2.amazonaws.com/6e32c95e-ad7c-4141-b42c-f2df49df3eef_%ED%98%B8%EB%9E%91%EC%9D%B4.jfif','박재현','박타티','{bcrypt}$2a$10$zmEHQDhOG4bQg3zrcImeUuCzv7eGvIVQjpbNkPV5vVmgi/l7wXZ7y',140300,6,12),(6,'2023-08-17','gyxkxl',NULL,'효타티','효타티','{bcrypt}$2a$10$XgRWU.gZA1UHdTD6i849he7tEpoQa/BxuMYiQF9m795wz1tOnHDSG',93000,10,0),(8,'2023-08-17','okip0428@gmail.com',NULL,'박영기','영스터디','{bcrypt}$2a$10$GXJQMIAOIQr1BT64PBvsUulFJZvz/ePnEMiVqeLhbS5KqMIg4TCQS',85000,10,0),(9,'2023-08-17','1@naver.com',NULL,'박재현','재타티','{bcrypt}$2a$10$J/boV8LOV0Og0HK/v/vW6OTxl.pSK4s1vI9zWdp.RuzwE7/E8AlKm',32000,52,356025),(10,'2023-08-17','2@naver.com',NULL,'박재현','현타티','{bcrypt}$2a$10$fZnzG2EyFGpBp7CcL3Qd0.J90jGi2nd2lTzJUyiFMlXCAl0L52sIe',54000,2,50408),(11,'2023-08-17','seoyeonlee0723@gmail.com',NULL,'이타티','이타티','{bcrypt}$2a$10$J0blSWJKmffLobvI0Mn3LOY0ivXCaiEinQ8iSH9w.hK/LtBuSIShm',107000,10,0);
/*!40000 ALTER TABLE `member` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `member_schedule`
--

DROP TABLE IF EXISTS `member_schedule`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `member_schedule` (
  `member_schedule_id` int NOT NULL AUTO_INCREMENT,
  `member_schedule_content` varchar(50) NOT NULL,
  `member_schedule_date` date DEFAULT NULL,
  `member_schedule_title` varchar(15) NOT NULL,
  `member_id` int NOT NULL,
  PRIMARY KEY (`member_schedule_id`),
  KEY `FKjmxjh6tt9uegmkeb6kqn7xoj5` (`member_id`),
  CONSTRAINT `FKjmxjh6tt9uegmkeb6kqn7xoj5` FOREIGN KEY (`member_id`) REFERENCES `member` (`member_id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `member_schedule`
--

LOCK TABLES `member_schedule` WRITE;
/*!40000 ALTER TABLE `member_schedule` DISABLE KEYS */;
/*!40000 ALTER TABLE `member_schedule` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `point`
--

DROP TABLE IF EXISTS `point`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `point` (
  `point_id` int NOT NULL AUTO_INCREMENT,
  `amount` int NOT NULL,
  `p_content` varchar(100) DEFAULT NULL,
  `point_data` datetime NOT NULL,
  `tid` varchar(255) DEFAULT NULL,
  `member_id` int NOT NULL,
  PRIMARY KEY (`point_id`),
  KEY `FKbet7cyy000fgj8pm7pbuuur46` (`member_id`),
  CONSTRAINT `FKbet7cyy000fgj8pm7pbuuur46` FOREIGN KEY (`member_id`) REFERENCES `member` (`member_id`)
) ENGINE=InnoDB AUTO_INCREMENT=200 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `point`
--

LOCK TABLES `point` WRITE;
/*!40000 ALTER TABLE `point` DISABLE KEYS */;
INSERT INTO `point` VALUES (1,100000,NULL,'2023-08-10 04:38:06',NULL,2),(2,-1000,'\'정처기 스터디\' 생성','2023-08-17 07:49:44','',2),(3,105000,'포인트 충전','2023-08-17 07:50:51','T4ddd14276b90283f05c',3),(4,-6000,'\'SQLD 스터디\' 생성','2023-08-17 07:51:18','',2),(5,-3000,'\'삼성전자 면접 스터디\' 생성','2023-08-17 07:54:53','',2),(6,510000,'포인트 충전','2023-08-17 07:59:24','T4ddd3464ce74cf5e003',4),(7,150000,'포인트 충전','2023-08-17 07:59:31','T4ddd34e76b90283f087',6),(8,-12000,'\'9급 공무원 스터디 \' 생성','2023-08-17 08:01:54','',6),(9,-1200,'\'싸피 11기 면접 스터디\' 생성','2023-08-17 08:02:05','',2),(10,195000,'포인트 충전','2023-08-17 08:06:42','T4ddd4f94ce74cf5e018',5),(11,-12000,'\'월수금 독서 챌린지\' 생성','2023-08-17 08:10:04','',6),(12,-12000,'\'수능 영어 같이 준비해요! \' 생성','2023-08-17 08:16:01','',2),(13,-3000,'\'싸피대학교 자바 수업 과제 같이 하실 분!\' 생성','2023-08-17 08:18:14','',2),(14,-3000,'\'싸피 자바 과제 같이 해요!\' 신청','2023-08-17 08:23:18','',5),(15,-12000,'\'수능 영어 준비해요! \' 신청','2023-08-17 08:23:23','',5),(16,-12000,'\'월수금 독서 챌린지\' 신청','2023-08-17 08:23:25','',5),(17,-1200,'\'싸피 11기 면접 스터디\' 신청','2023-08-17 08:23:32','',5),(18,-12000,'\'9급 공무원 스터디 \' 신청','2023-08-17 08:23:36','',5),(19,-3000,'\'삼성전자 면접 스터디\' 신청','2023-08-17 08:23:40','',5),(20,-6000,'\'SQLD 스터디\' 신청','2023-08-17 08:23:42','',5),(21,-1000,'\'정처기 스터디\' 신청','2023-08-17 08:23:45','',5),(22,-3000,'\'Study Wtih Me\' 생성','2023-08-17 08:26:41','',6),(24,-3000,'\'자바 한 달 뽀개기\' 신청','2023-08-17 08:27:54','',6),(26,-3000,'\'자바 한 달 뽀개기\' 신청','2023-08-17 08:28:20','',4),(28,1000,'포인트 인출','2023-08-17 08:48:48',NULL,4),(29,1000,'포인트 인출','2023-08-17 08:49:08',NULL,4),(31,-1500,'\'알고리즘 스터디\' 신청','2023-08-17 12:13:38','',5),(32,-1500,'\'알고리즘 스터디\' 신청','2023-08-17 12:14:46','',2),(34,15000,'포인트 충전','2023-08-17 12:16:46','T4de0f9876b90283f3c1',4),(37,1000,'포인트 인출','2023-08-17 12:17:46',NULL,4),(38,15000,'결제 취소','2023-08-17 12:21:39','T4de0f9876b90283f3c1',4),(41,-1500,'\'알고리즘 스터디\' 신청','2023-08-17 12:30:50','',2),(42,15000,'포인트 충전','2023-08-17 12:32:57','T4de136676b90283f3e8',4),(44,15000,'결제 취소','2023-08-17 12:35:23','T4de136676b90283f3e8',4),(45,50000,'포인트 충전','2023-08-17 12:58:38','T4de195776b90283f420',9),(46,-3000,'\'취업 대비 CS 스터디\' 생성','2023-08-17 13:00:08','',9),(104,-3000,'\'취업 대비 CS 스터디\' 신청','2023-08-17 13:21:15','',4),(106,-12000,'\'월수금 독서 챌린지\' 신청','2023-08-17 13:22:28','',4),(107,-3000,'\'알고리즘 스터디\' 신청','2023-08-17 13:22:53','',4),(108,-6000,'\'1일 1독서\' 생성','2023-08-17 13:23:41','',9),(109,-6000,'\'1일 1독서\' 신청','2023-08-17 13:23:46','',4),(110,-3000,'\'취업스터디\' 신청','2023-08-17 13:24:03','',4),(112,3000,'\'알고리즘 스터디\' 탈퇴 보증금','2023-08-17 13:25:28','',4),(113,4000,'\'1일 1독서\' 탈퇴 보증금','2023-08-17 13:28:45','',9),(114,2000,'\'취업 대비 CS 스터디\' 탈퇴 보증금','2023-08-17 13:28:57','',9),(116,-3000,'\'1일 1코테 스터디\' 생성','2023-08-17 13:30:18','',9),(117,-3000,'\'1일 1코테 스터디\' 신청','2023-08-17 13:30:26','',4),(119,-3000,'\'알고리즘 스터디\' 신청','2023-08-17 13:31:54','',4),(134,60000,'포인트 충전','2023-08-17 13:35:34','T4de221076b90283f46b',10),(150,6000,'\'1일 1독서\' 탈퇴 보증금','2023-08-17 13:37:38','',4),(159,-3000,'\'알고리즘 스터디\' 신청','2023-08-17 13:45:29','',4),(160,3000,'\'알고리즘 스터디\' 탈퇴 보증금','2023-08-17 13:48:02','',4),(165,-3000,'\'알고리즘 스터디\' 신청','2023-08-17 13:48:37','',4),(166,-3000,'\'알고리즘 스터디\' 신청','2023-08-17 13:48:57','',2),(168,3000,'\'알고리즘 스터디\' 탈퇴 보증금','2023-08-17 13:49:10','',4),(171,-3000,'\'알고리즘 스터디\' 신청','2023-08-17 13:55:09','',2),(172,-3000,'\'알고리즘 스터디\' 신청','2023-08-17 13:55:12','',4),(173,-3000,'\'취업 대비 CS 스터디\' 신청','2023-08-17 13:57:28','',10),(175,3000,'\'취업 대비 CS 스터디\' 탈퇴 보증금','2023-08-17 13:58:23','',4),(176,-3000,'\'취업 대비 CS 스터디\' 신청','2023-08-17 14:06:35','',2),(178,3000,'\'알고리즘 스터디\' 탈퇴 보증금','2023-08-17 14:07:26','',4),(181,-3000,'\'알고리즘 스터디\' 신청','2023-08-17 14:14:52','',10),(182,-3000,'\'알고리즘 스터디\' 신청','2023-08-17 14:14:52','',2),(183,-3000,'\'알고리즘 스터디\' 신청','2023-08-17 14:14:56','',4),(185,3000,'\'알고리즘 스터디\' 탈퇴 보증금','2023-08-17 14:20:09','',4),(187,-3000,'\'알고리즘 스터디\' 신청','2023-08-17 14:33:17','',4),(190,100000,NULL,'2023-08-17 04:38:06',NULL,8),(191,3000,'\'알고리즘 스터디\' 탈퇴 보증금','2023-08-17 15:04:04','',4),(192,3000,'\'알고리즘 스터디\' 탈퇴 보증금','2023-08-17 15:04:10','',4),(193,-3000,'\'스프링 스터디\' 생성','2023-08-17 15:04:57','',8),(194,-3000,'\'싸피 자바 시험대비\' 신청','2023-08-17 15:07:08','',8),(195,-3000,'\'스프링 스터디\' 신청','2023-08-17 15:13:14','',2),(196,-3000,'\'스프링 스터디\' 신청','2023-08-17 15:13:17','',5),(197,-3000,'\'스프링 스터디\' 신청','2023-08-17 15:14:24','',11),(198,-3000,'\'취준스터디\' 생성','2023-08-17 15:16:13','',8),(199,100000,NULL,'2023-08-17 04:38:06',NULL,11);
/*!40000 ALTER TABLE `point` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `study`
--

DROP TABLE IF EXISTS `study`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `study` (
  `study_id` int NOT NULL AUTO_INCREMENT,
  `deposit_end_yn` bit(1) DEFAULT b'0',
  `disclosure` tinyint(1) NOT NULL,
  `img` varchar(255) DEFAULT NULL,
  `study_deposit` int NOT NULL,
  `study_description` varchar(255) NOT NULL,
  `study_end_date` date NOT NULL,
  `study_host` int NOT NULL,
  `study_name` varchar(50) NOT NULL,
  `study_password` int DEFAULT NULL,
  `study_start_date` date NOT NULL,
  `total_deposit` int DEFAULT NULL,
  `total_member` int NOT NULL,
  `total_penalty` int DEFAULT '0',
  `category_id` int DEFAULT NULL,
  PRIMARY KEY (`study_id`),
  KEY `FK61rof6gu4refc35aae1g62eus` (`category_id`),
  CONSTRAINT `FK61rof6gu4refc35aae1g62eus` FOREIGN KEY (`category_id`) REFERENCES `category` (`category_id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `study`
--

LOCK TABLES `study` WRITE;
/*!40000 ALTER TABLE `study` DISABLE KEYS */;
INSERT INTO `study` VALUES (1,_binary '\0',1,NULL,3000,'일주일에 세번 정처기 문제 리뷰하는 스터디 입니다.','2023-08-20',2,'정처기 스터디',NULL,'2023-07-01',1000,6,0,1),(2,_binary '\0',1,'https://tatibucket.s3.ap-northeast-2.amazonaws.com/719abd44-e7cf-45ee-be68-18f46b8a510d_sqld.jpg',6000,'일주일에 세 번 SQLD 문제 리뷰하는 스터디 입니다.','2023-09-15',2,'SQLD 스터디',NULL,'2023-07-01',6000,4,0,1),(3,_binary '\0',1,'https://tatibucket.s3.ap-northeast-2.amazonaws.com/929fb49e-8437-4d0a-9d10-dd982420f92d_111136428.2%20%281%29.jpg',3000,'삼성전자 면접 준비하는 스터디입니다.','2023-08-30',2,'삼성전자 면접 스터디',NULL,'2023-08-12',3000,4,0,2),(4,_binary '\0',1,'https://tatibucket.s3.ap-northeast-2.amazonaws.com/a4a98da5-7c71-4ba6-99fa-ba1fa4072f1a_%EB%85%B8%EB%9F%89%EC%A7%84.jpg',12000,'공무원 준비로 같이 으쌰으쌰해요!','2023-11-15',6,'9급 공무원 스터디 ',NULL,'2023-08-17',12000,4,0,4),(5,_binary '\0',0,'https://tatibucket.s3.ap-northeast-2.amazonaws.com/16cd7711-ce92-4714-82b2-4ebbe7dc6fa3_%EC%8B%B8%ED%94%BC%20IMG.jpg',3000,'싸피 11기 면접 준비하는 스터디입니다.','2023-08-19',2,'싸피 11기 면접 스터디',1234,'2023-07-11',1200,4,0,2),(6,_binary '\0',1,'https://tatibucket.s3.ap-northeast-2.amazonaws.com/c87627c2-8e86-4fd7-b84b-0a073e2e14e1_%EB%8F%85%EC%84%9C.jpeg',12000,'저녁 시간에 같이 모여서 책 읽는 모임입니다.\n퇴근 후 잠깐 짬 내서 일상 속의 여유를 즐깁시다.','2023-08-30',6,'월수금 독서 챌린지',NULL,'2023-08-17',12000,3,0,5),(7,_binary '\0',1,'https://tatibucket.s3.ap-northeast-2.amazonaws.com/9e42bcda-b859-4c11-8229-922951cc32a5_%EB%8B%A4%EC%9A%B4%EB%A1%9C%EB%93%9C.jpg',12000,'일주일에 두 번 영어 모의고사 문제푸는 스터디 입니다.','2023-08-19',2,'수능 영어 준비해요! ',NULL,'2023-07-11',12000,4,0,3),(8,_binary '\0',0,NULL,3000,'자바수업 문제풀이 과제 같이 풀어요','2023-08-24',2,'싸피 자바 시험대비',1234,'2023-07-11',3000,5,0,3),(9,_binary '\0',0,'https://tatibucket.s3.ap-northeast-2.amazonaws.com/30b5ce78-b64f-4124-ade7-ff0a7b74755a_studyWithMe.jpeg',3000,'캠 켜놓고 각자 공부하는 스터디.\n \n\n하고싶은 공부 각자 하시면 되고, 스터디 시간만 지켜주면 됩니다.\n\n\n저랑 같이 공부해요.','2023-09-30',6,'Study Wtih Me',1234,'2023-08-17',3000,2,0,5),(12,_binary '\0',1,NULL,3000,'취업 대비 CS 스터디','2023-08-25',10,'취업 대비 CS 스터디',NULL,'2023-08-17',3000,6,5000,2),(13,_binary '\0',1,'https://tatibucket.s3.ap-northeast-2.amazonaws.com/3c58a477-cee1-44a4-87a8-05a72db0268e_%EC%8A%A4%ED%84%B0%EB%94%94%20%EC%83%81%EC%84%B8%ED%8E%98%EC%9D%B4%EC%A7%80%20-%20%EB%A9%A4%EB%B2%84%20%282%29.png',3000,'알고리즘 스터디\n\n일주일에 한번 알고리즘 문제를 풀고 코드 리뷰하는 스터디 입니다.','2023-09-02',7,'취업스터디',NULL,'2023-08-17',3000,6,0,2),(16,_binary '\0',1,NULL,3000,'1일 1코테 스터디','2023-12-01',9,'1일 1코테 스터디',NULL,'2023-08-17',3000,4,1000,2),(23,_binary '\0',1,'https://tatibucket.s3.ap-northeast-2.amazonaws.com/1bca1744-79de-4817-b5ff-7ecd6e297383_611311110011938257_1.jpg',3000,'스프링 스터디입니다.','2023-08-24',8,'스프링 스터디',NULL,'2023-08-18',3000,5,0,1),(24,_binary '\0',1,'https://tatibucket.s3.ap-northeast-2.amazonaws.com/7f2e36f4-8728-4240-8c61-ececc2d83074_%E1%84%83%E1%85%A1%E1%84%8B%E1%85%AE%E1%86%AB%E1%84%85%E1%85%A9%E1%84%83%E1%85%B3.jpeg',3000,'취준스터디입니다.','2023-08-19',8,'취준스터디',NULL,'2023-08-18',3000,5,0,2);
/*!40000 ALTER TABLE `study` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `study_applicant`
--

DROP TABLE IF EXISTS `study_applicant`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `study_applicant` (
  `study_applicant_id` int NOT NULL AUTO_INCREMENT,
  `member_id` int DEFAULT NULL,
  `study_id` int DEFAULT NULL,
  PRIMARY KEY (`study_applicant_id`),
  KEY `FKsyt6i422m6rlwpq6ocjfhiq13` (`member_id`),
  KEY `FKom100n65mpy00yb5ncoheixtd` (`study_id`),
  CONSTRAINT `FKom100n65mpy00yb5ncoheixtd` FOREIGN KEY (`study_id`) REFERENCES `study` (`study_id`),
  CONSTRAINT `FKsyt6i422m6rlwpq6ocjfhiq13` FOREIGN KEY (`member_id`) REFERENCES `member` (`member_id`)
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `study_applicant`
--

LOCK TABLES `study_applicant` WRITE;
/*!40000 ALTER TABLE `study_applicant` DISABLE KEYS */;
INSERT INTO `study_applicant` VALUES (3,5,6),(5,5,4),(6,5,3),(7,5,2),(17,4,6),(35,8,8),(36,2,23),(37,5,23),(38,11,23);
/*!40000 ALTER TABLE `study_applicant` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `study_member`
--

DROP TABLE IF EXISTS `study_member`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `study_member` (
  `study_member_id` int NOT NULL AUTO_INCREMENT,
  `absence_count` int DEFAULT NULL,
  `study_join_date` date NOT NULL,
  `study_member_penalty` int DEFAULT NULL,
  `member_id` int DEFAULT NULL,
  `study_id` int DEFAULT NULL,
  PRIMARY KEY (`study_member_id`),
  KEY `FKf2jvkah9v99o0ujl7ilpshptk` (`member_id`),
  KEY `FKxu4jds4ab0mfyrvdxsu60iut` (`study_id`),
  CONSTRAINT `FKf2jvkah9v99o0ujl7ilpshptk` FOREIGN KEY (`member_id`) REFERENCES `member` (`member_id`),
  CONSTRAINT `FKxu4jds4ab0mfyrvdxsu60iut` FOREIGN KEY (`study_id`) REFERENCES `study` (`study_id`)
) ENGINE=InnoDB AUTO_INCREMENT=49 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `study_member`
--

LOCK TABLES `study_member` WRITE;
/*!40000 ALTER TABLE `study_member` DISABLE KEYS */;
INSERT INTO `study_member` VALUES (1,0,'2023-08-17',0,2,1),(2,0,'2023-08-17',0,2,2),(3,0,'2023-08-17',0,2,3),(4,0,'2023-08-17',0,6,4),(5,0,'2023-08-17',0,2,5),(6,0,'2023-08-17',0,6,6),(7,0,'2023-08-17',0,2,7),(8,0,'2023-08-17',0,2,8),(9,0,'2023-08-17',0,6,9),(10,0,'2023-08-17',0,5,7),(11,0,'2023-08-17',0,5,5),(12,0,'2023-08-17',0,5,1),(13,0,'2023-08-17',0,6,8),(14,0,'2023-08-17',0,5,8),(15,0,'2023-08-17',0,4,8),(20,0,'2023-08-17',0,8,23),(48,0,'2023-08-17',0,8,24);
/*!40000 ALTER TABLE `study_member` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `study_schedule`
--

DROP TABLE IF EXISTS `study_schedule`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `study_schedule` (
  `study_schedule_id` int NOT NULL AUTO_INCREMENT,
  `study_day` varchar(255) NOT NULL,
  `study_end_time` time NOT NULL,
  `study_start_time` time NOT NULL,
  `study_id` int DEFAULT NULL,
  PRIMARY KEY (`study_schedule_id`),
  KEY `FKhvgmmvdjkh0u8naleohuokfll` (`study_id`),
  CONSTRAINT `FKhvgmmvdjkh0u8naleohuokfll` FOREIGN KEY (`study_id`) REFERENCES `study` (`study_id`)
) ENGINE=InnoDB AUTO_INCREMENT=81 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `study_schedule`
--

LOCK TABLES `study_schedule` WRITE;
/*!40000 ALTER TABLE `study_schedule` DISABLE KEYS */;
INSERT INTO `study_schedule` VALUES (1,'0','20:00:00','19:00:00',1),(2,'2','21:00:00','16:00:00',1),(5,'2','20:00:00','19:00:00',2),(6,'5','21:00:00','16:00:00',2),(9,'2','20:00:00','19:00:00',3),(10,'5','21:00:00','16:00:00',3),(13,'1','12:00:00','09:00:00',4),(15,'0','20:00:00','19:00:00',5),(16,'3','12:00:00','10:00:00',5),(19,'1','23:00:00','21:00:00',6),(20,'3','23:00:00','21:00:00',6),(21,'5','23:00:00','21:00:00',6),(25,'0','20:00:00','19:00:00',7),(26,'3','12:00:00','10:00:00',7),(29,'4','20:00:00','19:00:00',8),(33,'0','17:00:00','14:00:00',9),(41,'0','23:45:00','00:00:00',12),(42,'1','23:45:00','00:00:00',12),(43,'2','23:45:00','00:00:00',12),(44,'3','23:45:00','00:00:00',12),(45,'4','23:45:00','00:00:00',12),(46,'5','23:45:00','00:00:00',12),(47,'6','23:45:00','00:00:00',12),(75,'0','09:00:00','06:00:00',23),(76,'5','15:00:00','13:00:00',23),(79,'5','02:00:00','00:00:00',24),(80,'5','02:00:00','00:00:00',NULL);
/*!40000 ALTER TABLE `study_schedule` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'tati'
--

--
-- Dumping routines for database 'tati'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-08-18  0:18:29
