-- MySQL dump 10.13  Distrib 8.0.31, for Win64 (x86_64)
--
-- Host: localhost    Database: stuff_db
-- ------------------------------------------------------
-- Server version	8.0.31

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
-- Table structure for table `comentario`
--

DROP TABLE IF EXISTS `comentario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comentario` (
  `id` int NOT NULL AUTO_INCREMENT,
  `texto` varchar(800) NOT NULL,
  `idcomentou` int NOT NULL,
  `idcomentado` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idcomentou_idx` (`idcomentou`),
  KEY `idcomentado_idx` (`idcomentado`),
  CONSTRAINT `idcomentado` FOREIGN KEY (`idcomentado`) REFERENCES `musica` (`id`),
  CONSTRAINT `idcomentou` FOREIGN KEY (`idcomentou`) REFERENCES `usuario` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comentario`
--

LOCK TABLES `comentario` WRITE;
/*!40000 ALTER TABLE `comentario` DISABLE KEYS */;
INSERT INTO `comentario` VALUES (9,'pprt amo voces',1,1);
/*!40000 ALTER TABLE `comentario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `curtida`
--

DROP TABLE IF EXISTS `curtida`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `curtida` (
  `id` int NOT NULL AUTO_INCREMENT,
  `idcurtiu` int NOT NULL,
  `idcurtido` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idcurtiu_idx` (`idcurtiu`),
  KEY `idcurtido_idx` (`idcurtido`),
  CONSTRAINT `idcurtido` FOREIGN KEY (`idcurtido`) REFERENCES `musica` (`id`),
  CONSTRAINT `idcurtiu` FOREIGN KEY (`idcurtiu`) REFERENCES `usuario` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `curtida`
--

LOCK TABLES `curtida` WRITE;
/*!40000 ALTER TABLE `curtida` DISABLE KEYS */;
INSERT INTO `curtida` VALUES (1,1,1),(2,6,2),(3,7,2),(4,3,2),(5,1,2),(6,1,8),(7,3,1);
/*!40000 ALTER TABLE `curtida` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `genero`
--

DROP TABLE IF EXISTS `genero`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `genero` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `genero`
--

LOCK TABLES `genero` WRITE;
/*!40000 ALTER TABLE `genero` DISABLE KEYS */;
INSERT INTO `genero` VALUES (1,'rock alternativo'),(2,'indie'),(3,'shoegaze'),(4,'nu metal'),(5,'rock psicodélico'),(6,'grunge'),(7,'punk'),(8,'rock experimental'),(9,'blues');
/*!40000 ALTER TABLE `genero` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `musica`
--

DROP TABLE IF EXISTS `musica`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `musica` (
  `id` int NOT NULL AUTO_INCREMENT,
  `idusuario` int NOT NULL,
  `nome` varchar(75) NOT NULL,
  `musica` varchar(45) NOT NULL,
  `capa` varchar(45) NOT NULL,
  `descricao` mediumtext,
  PRIMARY KEY (`id`),
  KEY `idusuario_idx` (`idusuario`),
  CONSTRAINT `idusuario` FOREIGN KEY (`idusuario`) REFERENCES `usuario` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `musica`
--

LOCK TABLES `musica` WRITE;
/*!40000 ALTER TABLE `musica` DISABLE KEYS */;
INSERT INTO `musica` VALUES (1,2,'The Diamond Sea','musica_1696265304745.m4a','capa_1696265304742.png','Time takes it\'s crazy toll\r\nAnd how does your mirror grow\r\nYou better watch yourself when you jump into it\r\n\'Cause the mirror\'s gonna steal your soul\r\n\r\nI wonder how it came to be my friend\r\nThat someone just like you has come again\r\nYou\'ll never, never know how close you came\r\nUntil you fall in love with the diamond rain\r\n\r\nThrow all his trash away\r\nLook out he\'s here to stay\r\nYour mirror\'s gonna crack when he breaks into it\r\nAnd you\'ll never never be the same\r\n\r\nLook into his eyes and you can see\r\nWhy all the little kid\'s are dressed in dreams\r\nI wonder how he\'s gonna make it back\r\nWhen he sees that you just know it\'s make belief\r\n\r\nBlood crystallized to sand\r\nAnd now I hope you\'ll understand\r\nYou reflected into his looking glass soul\r\nAnd now the mirror is your only friend\r\n\r\nLook into his eyes and you will see\r\nThat men are not alone on the diamond sea\r\nSail into the heart of the lonely storm\r\nAnd tell her that you\'ll love her eternally\r\n\r\nTime takes its crazy toll\r\nMirror fallin\' off the wall\r\nYou better look out for the looking glass girl\r\n\'Cause she\'s gonna take you for a fall\r\n\r\nLook into his eyes and you shall see\r\nWhy everything is quiet and nothing\'s free\r\nI wonder how he\'s gonna make her smile\r\nAnd love is running wild on the diamond sea'),(2,3,'Be Quiet and Drive (Far Away)','musica_1696265445309.m4a','capa_1696265445307.jpg','This town don\'t feel mine\r\nI\'m fast to get away, far\r\n\r\nI dressed you in her clothes\r\nNow drive me far \r\n\r\nAway, away, away\r\n\r\nIt feels good to know you\'re mine\r\nNow drive me far \r\n\r\nAway, away, away\r\n\r\nFar away, i don\'t care where\r\nJust far away, i don\'t care where\r\nJust far away, i don\'t care where \r\nJust far away, i don\'t care\r\n'),(3,4,'sometimes','musica_1696265531027.m4a','capa_1696265531026.jfif','Close my eyes, feel me now\r\nI don\'t know how you could not love me now\r\nYou will know, with her feet down to the ground\r\nOver there, and I want true love to love\r\nYou can\'t hide, oh no, from the way I feel\r\n\r\nTurn my head into sound\r\nI don\'t know when I lay down on the ground\r\nYou will find the way it hurts to love\r\nNever cared, and the world turned hearts to love\r\nYou will see, oh now, oh the way I do\r\n\r\nYou will wait, see me go\r\nI don\'t care, when your head turned all alone\r\nYou will wait, when I turn my eyes around\r\nOverhead, when I hold you next to me\r\nOverhead, to know, oh the way I see\r\n\r\nClose my eyes, feel me how\r\nI don\'t know, maybe you could not hurt me now\r\nHere alone, when I feel down too\r\nOver there, when I await true love for you\r\nYou can hide, oh now, the way I do\r\nYou can see, oh now, oh the way I do'),(4,5,'Lovers Rock','musica_1696265720179.m4a','capa_1696265720179.jfif','Are you sick of me?\r\nWould you like to be?\r\nI\'m tryna tell you something\r\nSomething that I already said\r\nYou like a pretty boy\r\nWith a pretty voice\r\nWho\'s tryna sell you something\r\nSomething that you already have\r\n\r\nBut if you\'re too drunk to drive\r\nAnd the music is right\r\nShe might let you stay\r\nBut just for the night\r\nAnd if she grabs for your hand\r\nAnd drags you along\r\nShe might want a kiss\r\nBefore the end of the song\r\nBecause love can burn like a cigarette\r\nAnd leave you with nothing\r\nAnd leave you with nothing\r\n\r\nWhile the others talk\r\nWe were listening to lovers rock\r\nIn her bedroom, in her bedroom\r\nAnd if you start to kiss\r\nAnd the record skips\r\nFlip it over and sit a little closer'),(5,3,'Change (In the House of Flies)','musica_1696265875816.m4a','capa_1696265875816.jpg','I watched you change\r\nInto a fly\r\nI looked away\r\nYou were on fire\r\n\r\nI watched a change in you\r\nIt\'s like you never had wings\r\nNow, you feel so alive\r\nI\'ve watched you change\r\n\r\nI took you home\r\nSet you on the glass\r\nI pulled off your wings\r\nThen I laughed\r\n\r\nI watched a change in you\r\nIt\'s like you never had wings\r\nNow, you feel so alive\r\nI\'ve watched you change\r\nIt\'s like you never had wings\r\nAah, aah, aah, aah\r\nAah, aah, aah, aah\r\nAah, aah\r\n\r\nI look at the cross\r\nThen I look away\r\nGive you the gun\r\nBlow me away\r\n\r\nI watched a change in you\r\nIt\'s like you never had wings\r\nNow, you feel so alive\r\nI\'ve watched you change\r\n\r\nNow, you feel alive\r\nYou feel alive\r\nYou feel alive\r\nI\'ve watched you change\r\nIt\'s like you never had wings\r\nAah, aah, aah, aah\r\nAah, aah, aah, aah\r\nAah, aah\r\nYou\'ve changed\r\nYou\'ve changed\r\nYou\'ve changed'),(6,6,'Lounge Act','musica_1696298554295.mp3','capa_1696298554272.jpg','Truth covered in security\r\nI can\'t let you smother me\r\nI\'d like to, but it couldn\'t work\r\nTrading off and taking turns\r\nI don\'t regret a thing\r\n\r\nAnd I\'ve got this friend, you see, who makes me feel\r\nAnd I wanted more than I could steal\r\nI\'ll arrest myself, I\'ll wear a shield\r\nI\'ll go out of my way to prove I still\r\nSmell her on you\r\n\r\nDon\'t tell me what I wanna hear\r\nAfraid of never knowing fear\r\nExperience anything you need\r\nI\'ll keep fighting jealousy\r\nUntil it\'s fucking gone\r\n\r\nAnd I\'ve got this friend, you see, who makes me feel\r\nAnd I wanted more than I could steal\r\nI\'ll arrest myself, I\'ll wear a shield\r\nI\'ll go out of my way to prove I still\r\nSmell her on you\r\n\r\nTruth covered in security\r\nI can\'t let you smother me\r\nI\'d like to, but it couldn\'t work\r\nTrading off and taking turns\r\nI don\'t regret a thing\r\n\r\nAnd I\'ve got this friend, you see, who makes me feel and I\r\nWanted more than I could steal\r\nI\'ll arrest myself, I\'ll wear a shield\r\nI\'ll go out of my way to make you a deal\r\n\r\nWe\'ve made a pact to learn from who\r\nEver we want without new rules\r\nWe\'ll share what\'s lost and what we grew\r\nThey\'ll go out of their way to prove they still\r\n\r\nSmell her on you\r\nThey still\r\nSmell her on you\r\nSmell her on you'),(8,7,'Castles Made of Sand','musica_1696299126689.m4a','capa_1696299126689.jpg','Down the street you can hear her scream \"you\'re a disgrace\"\r\nAs she slams the door in his drunken face,\r\nAnd now he stands outside\r\nAnd all the neighbors start to gossip and drool\r\n\r\nHe cries \"Oh girl, you must be mad,\r\nWhat happened to the sweet love you and me had?\"\r\nAgainst the door he leans and starts a scene,\r\nAnd his tears fall and burn the garden green\r\n\r\nAnd so castles made of sand,\r\nFall in the sea, eventually\r\n\r\nA little Indian brave who before he was ten,\r\nPlayed war games in the woods with his Indian friends,\r\nAnd he built a dream that when he grew up,\r\nHe would be a fearless warrior Indian Chief\r\n\r\nMany moons passed and more the dream grew stronger,\r\nUntil tomorrow, he would sing his first war song,\r\nAnd fight his first battle, but something went wrong,\r\nSurprise attack killed him in his sleep that night\r\n\r\nAnd so castles made of sand,\r\nMelts into the sea, eventually\r\n\r\nThere was a young girl, whose heart was a frown,\r\n\'Cause she was crippled for life, and she couldn\'t speak a sound\r\nAnd she wished and prayed she could stop living,\r\nSo she decided to die\r\n\r\nShe drew her wheel chair to the edge of the shore, and to her legs she smiled\r\n\"You won\'t hurt me no more\"\r\nBut then a sight she\'d never seen made her jump and say\r\n\"Look, a golden winged ship is passing my way\"\r\n\r\nAnd it really didn\'t have to stop, it just kept on going\r\nAnd so castles made of sand\r\nSlips into the sea, eventually\r\n'),(9,8,'Under the Bridge','musica_1696299807336.mp3','capa_1696299807316.jpg','Sometimes I feel like I don\'t have a partner\r\nSometimes I feel like my only friend\r\nIs the city I live in, the city of angels\r\nLonely as I am, together we cry\r\n\r\nI drive on her streets \'cause she\'s my companion\r\nI walk through her hills \'cause she knows who I am\r\nShe sees my good deeds and she kisses me windy\r\nWell, I never worry, now that is a lie\r\n\r\nI don\'t ever wanna feel\r\nLike I did that day\r\nTake me to the place I love\r\nTake me all the way\r\nI don\'t ever wanna feel\r\nLike I did that day\r\nTake me to the place I love\r\nTake me all the way\r\nYeah, yeah, yeah\r\n\r\nIt\'s hard to believe that there\'s nobody out there\r\nIt\'s hard to believe that I\'m all alone\r\nAt least I have her love, the city, she loves me\r\nLonely as I am, together we cry\r\n\r\nI don\'t ever wanna feel\r\nLike I did that day\r\nTake me to the place I love\r\nTake me all the way\r\nI don\'t ever wanna feel\r\nLike I did that day\r\nTake me to the place I love\r\nTake me all the way\r\nYeah, yeah, yeah\r\n\r\nOh, no, no-no, yeah, yeah\r\nLove me, I say, yeah yeah\r\nOne time\r\n\r\nIs where I drew some blood\r\n(Under the bridge downtown)\r\nI could not get enough\r\n(Under the bridge downtown)\r\nForgot about my love\r\n(Under the bridge downtown)\r\nI gave my life away\r\nYeah, yeah\r\nOh, no, no-no-no, yeah, yeah\r\nOh, no, I said, oh, yeah, yeah\r\nWhere I stay');
/*!40000 ALTER TABLE `musica` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `musica_genero`
--

DROP TABLE IF EXISTS `musica_genero`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `musica_genero` (
  `id` int NOT NULL AUTO_INCREMENT,
  `idmusica` int NOT NULL,
  `idgenero` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idmusica_idx` (`idmusica`),
  KEY `idgenero_idx` (`idgenero`),
  CONSTRAINT `idgenero` FOREIGN KEY (`idgenero`) REFERENCES `genero` (`id`),
  CONSTRAINT `idmusica` FOREIGN KEY (`idmusica`) REFERENCES `musica` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `musica_genero`
--

LOCK TABLES `musica_genero` WRITE;
/*!40000 ALTER TABLE `musica_genero` DISABLE KEYS */;
INSERT INTO `musica_genero` VALUES (1,1,1),(2,1,5),(3,1,8),(4,2,1),(5,2,3),(6,2,4),(7,3,1),(8,3,3),(9,4,2),(10,5,1),(11,5,4),(12,6,1),(13,6,6),(14,6,7),(18,8,5),(19,8,8),(20,8,9),(21,9,1);
/*!40000 ALTER TABLE `musica_genero` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `seguida`
--

DROP TABLE IF EXISTS `seguida`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `seguida` (
  `id` int NOT NULL AUTO_INCREMENT,
  `idseguiu` int NOT NULL,
  `idseguido` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idseguiu_idx` (`idseguiu`),
  KEY `idseguido_idx` (`idseguido`),
  CONSTRAINT `idseguido` FOREIGN KEY (`idseguido`) REFERENCES `usuario` (`id`),
  CONSTRAINT `idseguiu` FOREIGN KEY (`idseguiu`) REFERENCES `usuario` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=49 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `seguida`
--

LOCK TABLES `seguida` WRITE;
/*!40000 ALTER TABLE `seguida` DISABLE KEYS */;
INSERT INTO `seguida` VALUES (15,1,5),(19,1,8),(34,1,3),(35,1,2),(36,1,4),(39,2,1),(40,3,1),(41,4,1),(42,5,1),(43,6,1),(44,7,1),(45,8,1),(46,9,1),(47,1,7),(48,1,6);
/*!40000 ALTER TABLE `seguida` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `senha` varchar(45) NOT NULL,
  `descricao` varchar(800) DEFAULT NULL,
  `pais` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES (1,'zerinh0','gabriel.fb06@gmail.com','gabriel200612','love is running wild on the diamond sea','br'),(2,'Sonic Youth','thurston@gmail.com','moore123','Thurston Moore,  Kim Gordon,\nLee Ranaldo,  Steve Shelley','us'),(3,'Deftones','chino@gmail.com','moreno123','omg chino hiiii!!','us'),(4,'my bloody valentine','kevin@gmail.com','shields123','agt faz o som mais triste do oeste irlandes kkkkkkkk','ie'),(5,'TV Girl','tv@gmail.com','tvgirl123','kkk ngm sabe quem canta nossas msc','us'),(6,'Nirvana','kurt@gmail.com','cobain123','smells like teen titans go ','us'),(7,'Jimi Hendrix','jimi@gmail.com','hendrix123','have u ever been to electric ladyland?','us'),(8,'Red Hot Chilli Peppers','anthony@gmail.com','kiedis123','Anthony Kiedis, John Frusciante, Flea, Chad Smith','us'),(9,'Júpiter Maçã','flavio@gmail.com','basso123','take it easy man','br');
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-10-09  1:01:14
