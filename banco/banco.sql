CREATE DATABASE  IF NOT EXISTS `stuff` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `stuff`;
-- MySQL dump 10.13  Distrib 5.6.11, for Win32 (x86)
--
-- Host: 127.0.0.1    Database: stuff
-- ------------------------------------------------------
-- Server version	5.5.20-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
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
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `comentario` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `texto` varchar(800) NOT NULL,
  `idcomentou` int(11) NOT NULL,
  `idcomentado` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idcomentou_idx` (`idcomentou`),
  KEY `idcomentado_idx` (`idcomentado`),
  CONSTRAINT `idcomentado` FOREIGN KEY (`idcomentado`) REFERENCES `musica` (`id`),
  CONSTRAINT `idcomentou` FOREIGN KEY (`idcomentou`) REFERENCES `usuario` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comentario`
--

LOCK TABLES `comentario` WRITE;
/*!40000 ALTER TABLE `comentario` DISABLE KEYS */;
/*!40000 ALTER TABLE `comentario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `curtida`
--

DROP TABLE IF EXISTS `curtida`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `curtida` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idcurtiu` int(11) NOT NULL,
  `idcurtido` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idcurtiu_idx` (`idcurtiu`),
  KEY `idcurtido_idx` (`idcurtido`),
  CONSTRAINT `idcurtido` FOREIGN KEY (`idcurtido`) REFERENCES `musica` (`id`),
  CONSTRAINT `idcurtiu` FOREIGN KEY (`idcurtiu`) REFERENCES `usuario` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=64 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `curtida`
--

LOCK TABLES `curtida` WRITE;
/*!40000 ALTER TABLE `curtida` DISABLE KEYS */;
INSERT INTO `curtida` VALUES (6,1,8),(8,1,12),(10,1,13),(13,12,13),(17,1,14),(18,1,11),(19,2,1),(20,2,6),(21,2,3),(22,2,9),(23,2,11),(24,2,13),(25,8,2),(26,8,4),(27,8,9),(28,8,6),(29,8,11),(30,8,13),(31,3,12),(36,3,2),(37,3,4),(38,3,5),(39,3,8),(40,3,14),(45,4,1),(46,4,5),(47,4,11),(48,4,3),(49,4,8),(50,4,13),(51,7,3),(52,7,4),(53,7,8),(54,7,9),(55,7,13),(56,7,14),(57,6,15),(58,6,12),(59,6,9),(60,6,3),(61,6,6),(62,6,11);
/*!40000 ALTER TABLE `curtida` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `genero`
--

DROP TABLE IF EXISTS `genero`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `genero` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `genero`
--

LOCK TABLES `genero` WRITE;
/*!40000 ALTER TABLE `genero` DISABLE KEYS */;
INSERT INTO `genero` VALUES (1,'rock alternativo'),(2,'indie'),(3,'shoegaze'),(4,'nu metal'),(5,'rock psicodélico'),(6,'grunge'),(7,'punk'),(8,'rock experimental'),(9,'blues'),(10,'noise rock'),(11,'pop'),(12,'jazz'),(13,'funk'),(14,'r&b'),(15,'raggae'),(16,'hip hop'),(17,'country'),(18,'new wave');
/*!40000 ALTER TABLE `genero` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `musica`
--

DROP TABLE IF EXISTS `musica`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `musica` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idusuario` int(11) NOT NULL,
  `nome` varchar(75) NOT NULL,
  `musica` varchar(45) NOT NULL,
  `capa` varchar(45) NOT NULL,
  `descricao` mediumtext,
  PRIMARY KEY (`id`),
  KEY `idusuario_idx` (`idusuario`),
  CONSTRAINT `idusuario` FOREIGN KEY (`idusuario`) REFERENCES `usuario` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `musica`
--

LOCK TABLES `musica` WRITE;
/*!40000 ALTER TABLE `musica` DISABLE KEYS */;
INSERT INTO `musica` VALUES (1,2,'The Diamond Sea','musica_1696265304745.m4a','capa_1696265304742.png','Time takes it\'s crazy toll\r\nAnd how does your mirror grow\r\nYou better watch yourself when you jump into it\r\n\'Cause the mirror\'s gonna steal your soul\r\n\r\nI wonder how it came to be my friend\r\nThat someone just like you has come again\r\nYou\'ll never, never know how close you came\r\nUntil you fall in love with the diamond rain\r\n\r\nThrow all his trash away\r\nLook out he\'s here to stay\r\nYour mirror\'s gonna crack when he breaks into it\r\nAnd you\'ll never never be the same\r\n\r\nLook into his eyes and you can see\r\nWhy all the little kid\'s are dressed in dreams\r\nI wonder how he\'s gonna make it back\r\nWhen he sees that you just know it\'s make belief\r\n\r\nBlood crystallized to sand\r\nAnd now I hope you\'ll understand\r\nYou reflected into his looking glass soul\r\nAnd now the mirror is your only friend\r\n\r\nLook into his eyes and you will see\r\nThat men are not alone on the diamond sea\r\nSail into the heart of the lonely storm\r\nAnd tell her that you\'ll love her eternally\r\n\r\nTime takes its crazy toll\r\nMirror fallin\' off the wall\r\nYou better look out for the looking glass girl\r\n\'Cause she\'s gonna take you for a fall\r\n\r\nLook into his eyes and you shall see\r\nWhy everything is quiet and nothing\'s free\r\nI wonder how he\'s gonna make her smile\r\nAnd love is running wild on the diamond sea'),(2,3,'Be Quiet and Drive (Far Away)','musica_1696265445309.m4a','capa_1696265445307.jpg','This town don\'t feel mine\r\nI\'m fast to get away, far\r\n\r\nI dressed you in her clothes\r\nNow drive me far \r\n\r\nAway, away, away\r\n\r\nIt feels good to know you\'re mine\r\nNow drive me far \r\n\r\nAway, away, away\r\n\r\nFar away, i don\'t care where\r\nJust far away, i don\'t care where\r\nJust far away, i don\'t care where \r\nJust far away, i don\'t care\r\n'),(3,4,'sometimes','musica_1696265531027.m4a','capa_1696265531026.jfif','Close my eyes, feel me now\r\nI don\'t know how you could not love me now\r\nYou will know, with her feet down to the ground\r\nOver there, and I want true love to love\r\nYou can\'t hide, oh no, from the way I feel\r\n\r\nTurn my head into sound\r\nI don\'t know when I lay down on the ground\r\nYou will find the way it hurts to love\r\nNever cared, and the world turned hearts to love\r\nYou will see, oh now, oh the way I do\r\n\r\nYou will wait, see me go\r\nI don\'t care, when your head turned all alone\r\nYou will wait, when I turn my eyes around\r\nOverhead, when I hold you next to me\r\nOverhead, to know, oh the way I see\r\n\r\nClose my eyes, feel me how\r\nI don\'t know, maybe you could not hurt me now\r\nHere alone, when I feel down too\r\nOver there, when I await true love for you\r\nYou can hide, oh now, the way I do\r\nYou can see, oh now, oh the way I do'),(4,5,'Lovers Rock','musica_1696265720179.m4a','capa_1696265720179.jfif','Are you sick of me?\r\nWould you like to be?\r\nI\'m tryna tell you something\r\nSomething that I already said\r\nYou like a pretty boy\r\nWith a pretty voice\r\nWho\'s tryna sell you something\r\nSomething that you already have\r\n\r\nBut if you\'re too drunk to drive\r\nAnd the music is right\r\nShe might let you stay\r\nBut just for the night\r\nAnd if she grabs for your hand\r\nAnd drags you along\r\nShe might want a kiss\r\nBefore the end of the song\r\nBecause love can burn like a cigarette\r\nAnd leave you with nothing\r\nAnd leave you with nothing\r\n\r\nWhile the others talk\r\nWe were listening to lovers rock\r\nIn her bedroom, in her bedroom\r\nAnd if you start to kiss\r\nAnd the record skips\r\nFlip it over and sit a little closer'),(5,3,'Change (In the House of Flies)','musica_1696265875816.m4a','capa_1696265875816.jpg','I watched you change\r\nInto a fly\r\nI looked away\r\nYou were on fire\r\n\r\nI watched a change in you\r\nIt\'s like you never had wings\r\nNow, you feel so alive\r\nI\'ve watched you change\r\n\r\nI took you home\r\nSet you on the glass\r\nI pulled off your wings\r\nThen I laughed\r\n\r\nI watched a change in you\r\nIt\'s like you never had wings\r\nNow, you feel so alive\r\nI\'ve watched you change\r\nIt\'s like you never had wings\r\nAah, aah, aah, aah\r\nAah, aah, aah, aah\r\nAah, aah\r\n\r\nI look at the cross\r\nThen I look away\r\nGive you the gun\r\nBlow me away\r\n\r\nI watched a change in you\r\nIt\'s like you never had wings\r\nNow, you feel so alive\r\nI\'ve watched you change\r\n\r\nNow, you feel alive\r\nYou feel alive\r\nYou feel alive\r\nI\'ve watched you change\r\nIt\'s like you never had wings\r\nAah, aah, aah, aah\r\nAah, aah, aah, aah\r\nAah, aah\r\nYou\'ve changed\r\nYou\'ve changed\r\nYou\'ve changed'),(6,6,'Lounge Act','musica_1696298554295.mp3','capa_1696298554272.jpg','Truth covered in security\r\nI can\'t let you smother me\r\nI\'d like to, but it couldn\'t work\r\nTrading off and taking turns\r\nI don\'t regret a thing\r\n\r\nAnd I\'ve got this friend, you see, who makes me feel\r\nAnd I wanted more than I could steal\r\nI\'ll arrest myself, I\'ll wear a shield\r\nI\'ll go out of my way to prove I still\r\nSmell her on you\r\n\r\nDon\'t tell me what I wanna hear\r\nAfraid of never knowing fear\r\nExperience anything you need\r\nI\'ll keep fighting jealousy\r\nUntil it\'s fucking gone\r\n\r\nAnd I\'ve got this friend, you see, who makes me feel\r\nAnd I wanted more than I could steal\r\nI\'ll arrest myself, I\'ll wear a shield\r\nI\'ll go out of my way to prove I still\r\nSmell her on you\r\n\r\nTruth covered in security\r\nI can\'t let you smother me\r\nI\'d like to, but it couldn\'t work\r\nTrading off and taking turns\r\nI don\'t regret a thing\r\n\r\nAnd I\'ve got this friend, you see, who makes me feel and I\r\nWanted more than I could steal\r\nI\'ll arrest myself, I\'ll wear a shield\r\nI\'ll go out of my way to make you a deal\r\n\r\nWe\'ve made a pact to learn from who\r\nEver we want without new rules\r\nWe\'ll share what\'s lost and what we grew\r\nThey\'ll go out of their way to prove they still\r\n\r\nSmell her on you\r\nThey still\r\nSmell her on you\r\nSmell her on you'),(8,7,'Castles Made of Sand','musica_1696299126689.m4a','capa_1696299126689.jpg','Down the street you can hear her scream \"you\'re a disgrace\"\r\nAs she slams the door in his drunken face,\r\nAnd now he stands outside\r\nAnd all the neighbors start to gossip and drool\r\n\r\nHe cries \"Oh girl, you must be mad,\r\nWhat happened to the sweet love you and me had?\"\r\nAgainst the door he leans and starts a scene,\r\nAnd his tears fall and burn the garden green\r\n\r\nAnd so castles made of sand,\r\nFall in the sea, eventually\r\n\r\nA little Indian brave who before he was ten,\r\nPlayed war games in the woods with his Indian friends,\r\nAnd he built a dream that when he grew up,\r\nHe would be a fearless warrior Indian Chief\r\n\r\nMany moons passed and more the dream grew stronger,\r\nUntil tomorrow, he would sing his first war song,\r\nAnd fight his first battle, but something went wrong,\r\nSurprise attack killed him in his sleep that night\r\n\r\nAnd so castles made of sand,\r\nMelts into the sea, eventually\r\n\r\nThere was a young girl, whose heart was a frown,\r\n\'Cause she was crippled for life, and she couldn\'t speak a sound\r\nAnd she wished and prayed she could stop living,\r\nSo she decided to die\r\n\r\nShe drew her wheel chair to the edge of the shore, and to her legs she smiled\r\n\"You won\'t hurt me no more\"\r\nBut then a sight she\'d never seen made her jump and say\r\n\"Look, a golden winged ship is passing my way\"\r\n\r\nAnd it really didn\'t have to stop, it just kept on going\r\nAnd so castles made of sand\r\nSlips into the sea, eventually\r\n'),(9,8,'Under the Bridge','musica_1696299807336.mp3','capa_1696299807316.jpg','Sometimes I feel like I don\'t have a partner\r\nSometimes I feel like my only friend\r\nIs the city I live in, the city of angels\r\nLonely as I am, together we cry\r\n\r\nI drive on her streets \'cause she\'s my companion\r\nI walk through her hills \'cause she knows who I am\r\nShe sees my good deeds and she kisses me windy\r\nWell, I never worry, now that is a lie\r\n\r\nI don\'t ever wanna feel\r\nLike I did that day\r\nTake me to the place I love\r\nTake me all the way\r\nI don\'t ever wanna feel\r\nLike I did that day\r\nTake me to the place I love\r\nTake me all the way\r\nYeah, yeah, yeah\r\n\r\nIt\'s hard to believe that there\'s nobody out there\r\nIt\'s hard to believe that I\'m all alone\r\nAt least I have her love, the city, she loves me\r\nLonely as I am, together we cry\r\n\r\nI don\'t ever wanna feel\r\nLike I did that day\r\nTake me to the place I love\r\nTake me all the way\r\nI don\'t ever wanna feel\r\nLike I did that day\r\nTake me to the place I love\r\nTake me all the way\r\nYeah, yeah, yeah\r\n\r\nOh, no, no-no, yeah, yeah\r\nLove me, I say, yeah yeah\r\nOne time\r\n\r\nIs where I drew some blood\r\n(Under the bridge downtown)\r\nI could not get enough\r\n(Under the bridge downtown)\r\nForgot about my love\r\n(Under the bridge downtown)\r\nI gave my life away\r\nYeah, yeah\r\nOh, no, no-no-no, yeah, yeah\r\nOh, no, I said, oh, yeah, yeah\r\nWhere I stay'),(11,10,'Heaven Knows I\'m Miserable Now','musica_1697560732870.mp3','capa_1697560732867.jpg','I was happy in the haze of a drunken hour\r\nBut heaven knows I\'m miserable now\r\nI was looking for a job, and then I found a job\r\nAnd heaven knows I\'m miserable now\r\n\r\nIn my life\r\nWhy do I give valuable time\r\nTo people who don\'t care if I live or die?\r\n\r\nTwo lovers entwined pass me by\r\nAnd heaven knows I\'m miserable now\r\nI was looking for a job, and then I found a job\r\nAnd heaven knows I\'m miserable now\r\n\r\nIn my life\r\nOh, why do I give valuable time\r\nTo people who don\'t care if I live or die?\r\n\r\nWhat she asked of me at the end of the day\r\nCaligula would have blushed\r\n\"Oh, you\'ve been in the house too long\" she said\r\nAnd I naturally fled\r\n\r\nIn my life\r\nWhy do I smile\r\nAt people who I\'d much rather kick in the eye?\r\n\r\nI was happy in the haze of a drunken hour\r\nBut heaven knows I\'m miserable now\r\n\"Oh, you\'ve been in the house too long\" she said\r\nAnd I naturally fled\r\n\r\nIn my life\r\nOh, why do I give valuable time\r\nTo people who don\'t care if I live or die?'),(12,2,'Schizophrenia','musica_1697561134172.mp3','capa_1697561134169.png','I went away to see an old friend of mine\r\nHis sister came over she was out of her mind\r\nShe said Jesus had a twin who knew nothing about sin\r\nShe was laughing like crazy at the trouble I\'m in\r\nHer light eyes were dancing she is insane\r\nHer brother says she\'s just a bitch with a golden chain\r\nShe keeps coming closer saying: I can feel it in my bones\r\nSchizophrenia is taking me home\r\n\r\nMy Future is static\r\nIt\'s already had it\r\nI could tuck you in\r\nAnd we can talk about it\r\nI had a dream\r\nAnd it split the scene\r\nBut I got a hunch\r\nIt\'s coming back to me'),(13,11,'She','musica_1697564040843.mp3','capa_1697564040842.jpg','She walked out with empty arms\r\nMachine gun in her hand\r\nShe is good and she is bad\r\nNo one understands\r\n\r\nShe walked in in silence\r\nNever spoke a word\r\nShe\'s got a rich daddy\r\nShe\'s her daddy\'s girl\r\n\r\nShe loves naked sin\r\nHe loves evil stare\r\nShe has lost control\r\nThey are growing old\r\n\r\nShe will hide in silence\r\nThen her day will come\r\nShe was virgin vixen\r\nShe is on the run\r\nShe is on the run\r\nShe is on the run'),(14,12,'Run Run Run','musica_1697849830978.m4a','capa_1697849830977.jpg','Teenage Mary said to Uncle Dave\r\nI sold my soul, must be saved\r\nGonna take a walk down to Union Square\r\nYou never know who you\'re gonna find there\r\n\r\nYou gotta run, run, run, run, run\r\nTake a drag or two\r\nRun, run, run, run, run\r\nGypsy Death and you\r\nTell you whatcha do\r\n\r\nMarguerita Passion had to get her fix\r\nShe wasn\'t well, she was getting sick\r\nWent to sell her soul, she wasn\'t high\r\nDidn\'t know, thinks she could buy it\r\n\r\nAnd she would run, run, run, run, run\r\nTake a drag or two\r\nRun, run, run, run, run\r\nGypsy Death and you\r\nTell you whatcha do\r\n\r\nSeasick Sarah had a golden nose\r\nHobnail boots wrapped around her toes\r\nWhen she turned blue, all the angels screamed\r\nThey didn\'t know, they couldn\'t make the scene\r\n\r\nShe had to run, run, run, run, run\r\nTake a drag or two\r\nRun, run, run, run, run\r\nGypsy Death and you\r\nTell you whatcha do\r\n\r\nBeardless Harry, what a waste\r\nCouldn\'t even get a small town taste\r\nRode the trolleys down to forty seven\r\nFigured he was good to get himself to heaven\r\n\r\n\'Cause he had to run, run, run, run, run\r\nTake a drag or two\r\nRun, run, run, run, run\r\nGypsy Death and you\r\nTell you whatcha do'),(15,7,'Crosstown Traffic','musica_1700508731784.jfif','capa_1700508731781.jfif','You jump in front of my car when you, you know all the time that\r\nNinety miles an hour, girl, is the speed I drive.\r\nYou tell me it\'s alright, you don\'t mind a little pain.\r\nYou say you just want me to take you for a ride.\r\n\r\nYou\'re just like crosstown traffic, so hard to get through to you.\r\nCrosstown traffic, I don\'t need to run over you.\r\nCrosstown traffic, all you do is slow me down\r\nAnd I\'m trying to get on the other side of town.\r\n\r\nI\'m not the only soul who\'s accused of hit and run,\r\nTire tracks all across your back, uh-huh, I can see you had your fun.\r\nBut a darling, can\'t you see my signals turn from green to red\r\nAnd with you I can see a traffic jam straight up ahead.\r\n\r\nYou\'re just like Crosstown traffic, so hard to get through to you.\r\nCrosstown traffic, I don\'t need to run over you.\r\nCrosstown traffic, all you do is slow me down\r\nAnd I got better things on the other side of town.\r\n\r\nYeah now crosstown traffic, look out, look out, baby, let me through.\r\nCrosstown traffic yeah, look out.\r\nCrosstown traffic yeah, look out, look out, look out.\r\nCrosstown traffic yeah, look out, watch that street.\r\n'),(16,6,'All Apologies','musica_1700508989784.jfif','capa_1700508989784.jfif','What else should I be?\r\nAll apologies\r\nWhat else could I say?\r\nEveryone is gay\r\nWhat else could I write?\r\nI don\'t have the right\r\nWhat else should I be?\r\nAll apologies\r\n\r\nIn the sun\r\nIn the sun, I feel as one\r\nIn the sun\r\nIn the sun\r\nMarried\r\nBuried\r\n\r\nI wish I was like you\r\nEasily amused\r\nFind my nest of salt\r\nEverything is my fault\r\nI\'ll take all the blame\r\nAqua sea foam shame\r\nSunburn freezer burn\r\nChoking on the ashes of her enemy\r\n\r\nIn the sun\r\nIn the sun, I feel as one\r\nIn the sun\r\nIn the sun\r\nMarried\r\nMarried\r\nMarried\r\nBuried\r\nYeah, yeah, yeah, yeah\r\n\r\nAll in all is all we are\r\n'),(17,7,'Third Stone From the Sun','musica_1700509198032.jpg','capa_1700509198026.jpg','Starfleet to scoutship, please give your position, Over.\r\nI\'m in orbit around the third planet from the star called\r\nThe sun. Over.\r\nYou mean its the earth? Over.\r\nPositive. It is known to have some form of intelligent\r\nSpecies. Over.\r\nI think we should take a look.\r\nStrange beautiful grass of green\r\nWith your majestic silver seas\r\nYour mysterious mountains I wish to see closer\r\nMay I land my kinky machine\r\nStrange beautiful grass of green\r\nWith your majestic silver seas\r\nYour mysterious mountains I wish to see closer\r\nMay I land my kinky machine\r\nAlthough your world wonders me\r\nWith your majestic and superior cackling hen\r\nYour people I do not understand\r\nSo to you I shall put an end\r\nAnd you\'ll\r\nNever hear\r\nSurf music again\r\nSecret\r\nOh, secret\r\nOh\r\nShhhh...'),(18,2,'Winner\'s Blues','musica_1700509793734.jfif','capa_1700509793734.jfif','...ifor by the away, go out not today (?)\r\nmove back along and wait a long long time\r\nnothing running free, you gotta time it all\r\nrun out the door come back when you score\r\nnew times will come and you will see a door\r\ninto the lion eye and now i\'m gone\r\nand it\'s out\r\nand it\'s not what you thought it was about\r\nbut a life, that you know\r\nwill keep you bound in...\r\nsometimes you win, sometimes you lose\r\nsometimes you got still the blues for me\r\nI could run away, a long time to stay\r\nburn out your eyes, burn out surprise\r\nlook out today you know it\'s not the same\r\nit\'s all the rage, it\'s every day\r\nand it\'s out\r\nand it\'s not what you thought it was about\r\nbut a life, that you know\r\nwill keep you round in love\r\n');
/*!40000 ALTER TABLE `musica` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `musica_genero`
--

DROP TABLE IF EXISTS `musica_genero`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `musica_genero` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idmusica` int(11) NOT NULL,
  `idgenero` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idmusica_idx` (`idmusica`),
  KEY `idgenero_idx` (`idgenero`),
  CONSTRAINT `idgenero` FOREIGN KEY (`idgenero`) REFERENCES `genero` (`id`),
  CONSTRAINT `idmusica` FOREIGN KEY (`idmusica`) REFERENCES `musica` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=56 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `musica_genero`
--

LOCK TABLES `musica_genero` WRITE;
/*!40000 ALTER TABLE `musica_genero` DISABLE KEYS */;
INSERT INTO `musica_genero` VALUES (1,1,1),(2,1,5),(3,1,8),(4,2,1),(5,2,3),(6,2,4),(7,3,1),(8,3,3),(9,4,2),(10,5,1),(11,5,4),(12,6,1),(13,6,6),(14,6,7),(18,8,5),(19,8,8),(20,8,9),(21,9,1),(24,11,1),(25,11,2),(26,12,1),(27,12,8),(28,13,7),(29,13,1),(30,14,1),(31,14,8),(32,14,9),(33,14,10),(34,1,10),(35,12,10),(36,3,10),(37,4,11),(38,6,11),(40,9,11),(41,11,11),(42,15,1),(43,15,5),(44,15,8),(45,15,9),(46,16,1),(47,16,6),(48,16,7),(49,17,1),(50,17,5),(51,17,8),(52,17,10),(53,18,1),(54,18,8),(55,18,10);
/*!40000 ALTER TABLE `musica_genero` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `musica_playlist`
--

DROP TABLE IF EXISTS `musica_playlist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `musica_playlist` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idplaylist` int(11) NOT NULL,
  `idmusicas` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idplaylist_idx` (`idplaylist`),
  KEY `idmusica_idx` (`idmusicas`),
  KEY `idmusicas_idx` (`idmusicas`),
  CONSTRAINT `idmusicas` FOREIGN KEY (`idmusicas`) REFERENCES `musica` (`id`),
  CONSTRAINT `idplaylist` FOREIGN KEY (`idplaylist`) REFERENCES `playlist` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `musica_playlist`
--

LOCK TABLES `musica_playlist` WRITE;
/*!40000 ALTER TABLE `musica_playlist` DISABLE KEYS */;
/*!40000 ALTER TABLE `musica_playlist` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `playlist`
--

DROP TABLE IF EXISTS `playlist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `playlist` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idcriou` int(11) NOT NULL,
  `nome` varchar(45) NOT NULL,
  `descricao` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idcriou_idx` (`idcriou`),
  CONSTRAINT `idcriou` FOREIGN KEY (`idcriou`) REFERENCES `usuario` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `playlist`
--

LOCK TABLES `playlist` WRITE;
/*!40000 ALTER TABLE `playlist` DISABLE KEYS */;
/*!40000 ALTER TABLE `playlist` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `seguida`
--

DROP TABLE IF EXISTS `seguida`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `seguida` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idseguiu` int(11) NOT NULL,
  `idseguido` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idseguiu_idx` (`idseguiu`),
  KEY `idseguido_idx` (`idseguido`),
  CONSTRAINT `idseguido` FOREIGN KEY (`idseguido`) REFERENCES `usuario` (`id`),
  CONSTRAINT `idseguiu` FOREIGN KEY (`idseguiu`) REFERENCES `usuario` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=108 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `seguida`
--

LOCK TABLES `seguida` WRITE;
/*!40000 ALTER TABLE `seguida` DISABLE KEYS */;
INSERT INTO `seguida` VALUES (42,5,1),(43,6,1),(44,7,1),(45,8,1),(77,11,1),(78,1,11),(84,1,4),(85,1,5),(86,1,10),(88,12,1),(89,1,12),(90,1,3),(92,10,1),(93,3,2),(94,3,4),(98,3,11),(105,2,4);
/*!40000 ALTER TABLE `seguida` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `usuario` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `senha` varchar(45) NOT NULL,
  `descricao` varchar(800) DEFAULT NULL,
  `pais` varchar(45) DEFAULT NULL,
  `ouvindo` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `ouvindo_idx` (`ouvindo`),
  CONSTRAINT `ouvindo` FOREIGN KEY (`ouvindo`) REFERENCES `musica` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES (1,'zerinh0','gabriel.fb06@gmail.com','gabriel200612','o diabo eh o pai do rock','br',12),(2,'Sonic Youth','thurston@gmail.com','moore123','Banda Nova-Iorquina formada em meados dos anos 80.\nThurston Moore, Kim Gordon, Steve Shelley e Lee Ranaldo.','us',13),(3,'Deftones','chino@gmail.com','moreno123','Banda de Nu Metal/Shoegaze formada nos Estados \nUnidos em meados de 1996.','us',13),(4,'my bloody valentine','kevin@gmail.com','shields123','','ie',6),(5,'TV Girl','tv@gmail.com','tvgirl123','kkk ngm sabe quem canta nossas msc','us',NULL),(6,'Nirvana','kurt@gmail.com','cobain123','Banda que iniciou o movimento grunge nos anos 90.\nKurt Cobain, Krist Novocelic, Dave Grohl.','us',NULL),(7,'Jimi Hendrix','jimi@gmail.com','hendrix123','Guitarrista experimental da década de 60.\nLíder da Jimi Hendrix Experience.','us',NULL),(8,'Red Hot Chilli Peppers','anthony@gmail.com','kiedis123','Anthony Kiedis, Flea, John Frusciante, Chad Smith','us',NULL),(9,'Júpiter Maçã','flavio@gmail.com','basso123','take it easy man','br',NULL),(10,'The Smiths','morrisey@gmail.com','jhonny123','o céu sabe que estou miserável agora','gb',11),(11,'The Misfits','misfits@gmail.com','misfits123',NULL,'us',3),(12,'The Velvet Underground','lou@gmail.com','reedd123','take a walk on the wild side','us',14),(13,'Banca TCC','bancatcc@gmail.com','bancatcc123','','',1);
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

-- Dump completed on 2023-11-20 17:00:13
