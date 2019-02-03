/*
 Navicat Premium Data Transfer

 Source Server         : localhost_3306
 Source Server Type    : MySQL
 Source Server Version : 50719
 Source Host           : localhost:3306
 Source Schema         : question_system

 Target Server Type    : MySQL
 Target Server Version : 50719
 File Encoding         : 65001

 Date: 19/04/2018 13:03:36
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for admin_token
-- ----------------------------
DROP TABLE IF EXISTS `admin_token`;
CREATE TABLE `admin_token`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `token` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `deadline` bigint(255) NOT NULL,
  `admin_id` int(11) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 94 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of admin_token
-- ----------------------------
INSERT INTO `admin_token` VALUES (5, '1523244889309', 1523244889309, 1);
INSERT INTO `admin_token` VALUES (6, '1523244998061', 1523849798061, 1);
INSERT INTO `admin_token` VALUES (7, '1523246402985', 1523851202985, 1);
INSERT INTO `admin_token` VALUES (8, '1523246432806', 1523851232806, 1);
INSERT INTO `admin_token` VALUES (9, '1523246436028', 1523851236028, 1);
INSERT INTO `admin_token` VALUES (10, '1523246621393', 1523851421393, 1);
INSERT INTO `admin_token` VALUES (11, '1523246970238', 1523851770238, 1);
INSERT INTO `admin_token` VALUES (12, '1523247062924', 1523851862924, 1);
INSERT INTO `admin_token` VALUES (13, '1523247195003', 1523851995003, 1);
INSERT INTO `admin_token` VALUES (14, '1523247442854', 1523852242854, 1);
INSERT INTO `admin_token` VALUES (15, '1523247590176', 1523852390176, 1);
INSERT INTO `admin_token` VALUES (16, '1523247840599', 1523852640599, 1);
INSERT INTO `admin_token` VALUES (17, '1523247971913', 1523852771913, 1);
INSERT INTO `admin_token` VALUES (18, '1523248096388', 1523852896388, 1);
INSERT INTO `admin_token` VALUES (19, '1523248193901', 1523852993901, 1);
INSERT INTO `admin_token` VALUES (20, '1523248237648', 1523853037648, 1);
INSERT INTO `admin_token` VALUES (21, '1523248363473', 1523853163473, 1);
INSERT INTO `admin_token` VALUES (22, '1523248841545', 1523853641545, 1);
INSERT INTO `admin_token` VALUES (23, '1523249289266', 1523854089266, 1);
INSERT INTO `admin_token` VALUES (24, '1523249348020', 1523854148020, 1);
INSERT INTO `admin_token` VALUES (25, '1523249371670', 1523854171670, 1);
INSERT INTO `admin_token` VALUES (26, '1523249880695', 1523854680695, 1);
INSERT INTO `admin_token` VALUES (27, '1523250649896', 1523855449896, 1);
INSERT INTO `admin_token` VALUES (28, '1523250698406', 1523855498406, 1);
INSERT INTO `admin_token` VALUES (29, '1523250751396', 1523855551396, 1);
INSERT INTO `admin_token` VALUES (30, '1523250797134', 1523855597134, 1);
INSERT INTO `admin_token` VALUES (31, '1523250868484', 1523855668484, 1);
INSERT INTO `admin_token` VALUES (32, '1523250945370', 1523855745370, 1);
INSERT INTO `admin_token` VALUES (33, '1523251095378', 1523855895378, 1);
INSERT INTO `admin_token` VALUES (34, '1523251102065', 1523855902065, 2);
INSERT INTO `admin_token` VALUES (35, '1523251123918', 1523855923918, 1);
INSERT INTO `admin_token` VALUES (36, '1523251549266', 1523856349266, 1);
INSERT INTO `admin_token` VALUES (37, '1523251575401', 1523856375401, 1);
INSERT INTO `admin_token` VALUES (38, '1523251608821', 1523856408821, 1);
INSERT INTO `admin_token` VALUES (39, '1523251698179', 1523856498179, 1);
INSERT INTO `admin_token` VALUES (40, '1523252599611', 1523857399611, 1);
INSERT INTO `admin_token` VALUES (41, '1523258672711', 1523863472711, 1);
INSERT INTO `admin_token` VALUES (42, '1523260271368', 1523865071368, 1);
INSERT INTO `admin_token` VALUES (43, '1523323354385', 1523928154385, 1);
INSERT INTO `admin_token` VALUES (44, '1523326956866', 1523931756866, 1);
INSERT INTO `admin_token` VALUES (45, '1523331605889', 1523936405889, 1);
INSERT INTO `admin_token` VALUES (46, '1523344005236', 1523948805236, 1);
INSERT INTO `admin_token` VALUES (47, '1523410106475', 1524014906475, 1);
INSERT INTO `admin_token` VALUES (48, '1523411436909', 1524016236909, 1);
INSERT INTO `admin_token` VALUES (49, '1523412861325', 1524017661325, 1);
INSERT INTO `admin_token` VALUES (50, '1523413850636', 1524018650636, 1);
INSERT INTO `admin_token` VALUES (51, '1523414773498', 1524019573498, 2);
INSERT INTO `admin_token` VALUES (52, '1523414778379', 1524019578379, 1);
INSERT INTO `admin_token` VALUES (53, '1523415622833', 1524020422833, 1);
INSERT INTO `admin_token` VALUES (54, '1523418390087', 1524023190087, 1);
INSERT INTO `admin_token` VALUES (55, '1523428846611', 1524033646611, 1);
INSERT INTO `admin_token` VALUES (56, '1523448250625', 1524053050625, 1);
INSERT INTO `admin_token` VALUES (57, '1523495561140', 1524100361140, 1);
INSERT INTO `admin_token` VALUES (58, '1523498993741', 1524103793741, 1);
INSERT INTO `admin_token` VALUES (59, '1523499167109', 1524103967109, 1);
INSERT INTO `admin_token` VALUES (60, '1523499321119', 1524104121119, 1);
INSERT INTO `admin_token` VALUES (61, '1523518411269', 1524123211269, 1);
INSERT INTO `admin_token` VALUES (62, '1523523926144', 1524128726144, 1);
INSERT INTO `admin_token` VALUES (63, '1523525419644', 1524130219644, 1);
INSERT INTO `admin_token` VALUES (64, '1523633807352', 1524238607352, 1);
INSERT INTO `admin_token` VALUES (65, '1523858542955', 1524463342955, 1);
INSERT INTO `admin_token` VALUES (66, '1523875221497', 1524480021497, 1);
INSERT INTO `admin_token` VALUES (67, '1523927631793', 1524532431793, 1);
INSERT INTO `admin_token` VALUES (68, '1523961182521', 1524565982521, 1);
INSERT INTO `admin_token` VALUES (69, '1523962107820', 1524566907820, 1);
INSERT INTO `admin_token` VALUES (70, '1523975679310', 1524580479310, 1);
INSERT INTO `admin_token` VALUES (71, '1523980202856', 1524585002856, 1);
INSERT INTO `admin_token` VALUES (72, '1524014969406', 1524619769406, 1);
INSERT INTO `admin_token` VALUES (73, '1524014984106', 1524619784106, 1);
INSERT INTO `admin_token` VALUES (74, '1524015071882', 1524619871882, 2);
INSERT INTO `admin_token` VALUES (75, '1524015083264', 1524619883264, 1);
INSERT INTO `admin_token` VALUES (76, '1524017594862', 1524622394862, 1);
INSERT INTO `admin_token` VALUES (77, '1524017624362', 1524622424362, 2);
INSERT INTO `admin_token` VALUES (78, '1524017631029', 1524622431029, 1);
INSERT INTO `admin_token` VALUES (79, '1524017977347', 1524622777347, 1);
INSERT INTO `admin_token` VALUES (80, '1524018046944', 1524622846944, 2);
INSERT INTO `admin_token` VALUES (81, '1524023605667', 1524628405667, 1);
INSERT INTO `admin_token` VALUES (82, '1524024358809', 1524629158809, 1);
INSERT INTO `admin_token` VALUES (83, '1524024941780', 1524629741780, 1);
INSERT INTO `admin_token` VALUES (84, '1524025296104', 1524630096104, 1);
INSERT INTO `admin_token` VALUES (85, '1524025311200', 1524630111200, 2);
INSERT INTO `admin_token` VALUES (86, '1524027640921', 1524632440921, 1);
INSERT INTO `admin_token` VALUES (87, '1524028624873', 1524633424873, 1);
INSERT INTO `admin_token` VALUES (88, '1524029338878', 1524634138878, 1);
INSERT INTO `admin_token` VALUES (89, '1524039040054', 1524643840054, 1);
INSERT INTO `admin_token` VALUES (90, '1524065800205', 1524670600205, 1);
INSERT INTO `admin_token` VALUES (91, '1524066399612', 1524671199612, 1);
INSERT INTO `admin_token` VALUES (92, '1524067539402', 1524672339402, 1);
INSERT INTO `admin_token` VALUES (93, '1524113854502', 1524718654502, 1);

-- ----------------------------
-- Table structure for admin_user
-- ----------------------------
DROP TABLE IF EXISTS `admin_user`;
CREATE TABLE `admin_user`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(200) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `roles_id` int(20) NOT NULL,
  `tel` varchar(11) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `avatar` varchar(1000) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `password` varchar(15) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `create_time` bigint(15) NOT NULL,
  `isDel` int(2) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci COMMENT = '产品明细' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of admin_user
-- ----------------------------
INSERT INTO `admin_user` VALUES (1, 'admin', 1, '13900000000', 'http://localhost:3000/admin_avatar/admin_avatar152352057939415677.jpg', 'admin', 1523520579, 0);
INSERT INTO `admin_user` VALUES (2, 'editor', 2, '13800000001', 'http://localhost:3000/stu_avatar/默认.jpg', 'admin', 1523421448, 0);
INSERT INTO `admin_user` VALUES (3, 'lizp', 1, '13555555555', 'http://localhost:3000/stu_avatar/默认.jpg', 'admin', 1523420705, 0);

-- ----------------------------
-- Table structure for course
-- ----------------------------
DROP TABLE IF EXISTS `course`;
CREATE TABLE `course`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `course_name` text CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `course_price` int(20) NOT NULL,
  `course_class_id` int(11) NOT NULL,
  `video_url` varchar(225) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `isBanner` int(11) NOT NULL,
  `cover` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `course_desp` varchar(225) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `isDel` int(11) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 10 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of course
-- ----------------------------
INSERT INTO `course` VALUES (1, 'js', 50, 1, 'http://localhost:3000/vedio/vedio152397621551516102.mp4', 1, 'http://localhost:3000/course_cover/course_cover152352310268712152.jpeg', 'JavaScript一种直译式脚本语言，是一种动态类型、弱类型、基于原型的语言，内置支持类型。它的解释器被称为JavaScript引擎，为浏览器的一部分，广泛用于客户端的脚本语言，最早是在HTML（标准通用标记语言下的一个应用）网页上使用，用来给HTML网页增加动态功能。11', 0);
INSERT INTO `course` VALUES (2, 'css', 10, 1, 'http://localhost:3000/vedio/vedio152397620535813523.mp4', 1, 'http://localhost:3000/course_cover/course_cover152352239138212722.jpeg', '层叠样式表(英文全称：Cascading Style Sheets)是一种用来表现HTML（标准通用标记语言的一个应用）或XML（标准通用标记语言的一个子集）等文件样式的计算机语言。', 0);
INSERT INTO `course` VALUES (3, 'html', 0, 1, 'http://localhost:3000/vedio/vedio152397619691114292.mp4', 0, 'http://localhost:3000/course_cover/course_cover152352235899618006.jpeg', '超文本标记语言，标准通用标记语言下的一个应用。\n“超文本”就是指页面内可以包含图片、链接，甚至音乐、程序等非文字元素。', 0);
INSERT INTO `course` VALUES (4, '数据结构', 24, 2, 'http://localhost:3000/vedio/vedio152397617088112780.mp4', 0, 'http://localhost:3000/course_cover/course_cover152352236540513063.jpeg', '数据结构是计算机存储、组织数据的方式。数据结构是指相互之间存在一种或多种特定关系的数据元素的集合。通常情况下，精心选择的数据结构可以带来更高的运行或者存储效率。数据结构往往同高效的检索算法和索引技术有关。', 0);
INSERT INTO `course` VALUES (5, 'JAVA', 10, 3, 'http://localhost:3000/vedio/vedio152397614592018017.mp4', 0, 'http://localhost:3000/course_cover/course_cover152352214380215349.jpg', 'Java是一门面向对象编程语言，不仅吸收了C++语言的各种优点，还摒弃了C++里难以理解的多继承、指针等概念，因此Java语言具有功能强大和简单易用两个特征。Java语言作为静态面向对象编程语言的代表，极好地实现了面向对象理论，允许程序员以优雅的思维方式进行复杂的编程', 0);
INSERT INTO `course` VALUES (6, 'test1', 9999, 3, 'http://localhost:3000/vedio/vedio152397647219416210.mp4', 0, 'http://localhost:3000/course_cover/course_cover152392861158111747.png', 'ewq', 0);
INSERT INTO `course` VALUES (7, '数据结构test2', 222, 2, 'http://localhost:3000/vedio/vedio152397703474311345.mp4', 1, 'http://localhost:3000/course_cover/course_cover152397662395813785.jpeg', '数据结构test2', 1);
INSERT INTO `course` VALUES (8, '大数据', 9999999, 2, 'http://localhost:3000/vedio/vedio152397708770218165.mp4', 0, 'http://localhost:3000/course_cover/course_cover152397691908614293.jpg', '大数据', 0);
INSERT INTO `course` VALUES (9, '会计课程', 10, 2, 'http://localhost:3000/vedio/vedio152406758586918407.qlv', 0, 'http://localhost:3000/course_cover/course_cover152406758557618402.jpg', '会计', 0);

-- ----------------------------
-- Table structure for course_class
-- ----------------------------
DROP TABLE IF EXISTS `course_class`;
CREATE TABLE `course_class`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `course_class_name` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `isDel` int(11) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of course_class
-- ----------------------------
INSERT INTO `course_class` VALUES (1, '前端课程', 0);
INSERT INTO `course_class` VALUES (2, '算法课程', 0);
INSERT INTO `course_class` VALUES (3, '后台课程', 0);
INSERT INTO `course_class` VALUES (4, '数据库', 0);
INSERT INTO `course_class` VALUES (5, '开发工具', 0);

-- ----------------------------
-- Table structure for course_favorite
-- ----------------------------
DROP TABLE IF EXISTS `course_favorite`;
CREATE TABLE `course_favorite`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `course_id` int(11) NOT NULL,
  `stu_id` int(11) NOT NULL,
  `create_time` bigint(20) NOT NULL,
  `isDel` int(11) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 16 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of course_favorite
-- ----------------------------
INSERT INTO `course_favorite` VALUES (1, 1, 2, 1523524612, 1);
INSERT INTO `course_favorite` VALUES (2, 1, 2, 1523529999, 1);
INSERT INTO `course_favorite` VALUES (3, 6, 2, 1523533333, 1);
INSERT INTO `course_favorite` VALUES (4, 6, 2, 1523599999, 1);
INSERT INTO `course_favorite` VALUES (5, 2, 5, 1523954061, 1);
INSERT INTO `course_favorite` VALUES (6, 3, 5, 1523954371, 1);
INSERT INTO `course_favorite` VALUES (7, 1, 2, 1523954396, 1);
INSERT INTO `course_favorite` VALUES (8, 6, 2, 1523978298, 1);
INSERT INTO `course_favorite` VALUES (9, 6, 2, 1523978302, 0);
INSERT INTO `course_favorite` VALUES (10, 2, 5, 1523978366, 1);
INSERT INTO `course_favorite` VALUES (11, 3, 5, 1524015329, 1);
INSERT INTO `course_favorite` VALUES (12, 3, 5, 1524015397, 0);
INSERT INTO `course_favorite` VALUES (13, 5, 5, 1524018168, 1);
INSERT INTO `course_favorite` VALUES (14, 5, 5, 1524018189, 0);
INSERT INTO `course_favorite` VALUES (15, 2, 5, 1524025566, 1);

-- ----------------------------
-- Table structure for news
-- ----------------------------
DROP TABLE IF EXISTS `news`;
CREATE TABLE `news`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `news_name` text CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `news_desp` varchar(225) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `news_type_id` int(11) NOT NULL,
  `page_view` int(20) NOT NULL DEFAULT 0,
  `create_time` bigint(15) NOT NULL,
  `cover` varchar(2000) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `isDel` int(11) NOT NULL,
  `content` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 14 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of news
-- ----------------------------
INSERT INTO `news` VALUES (1, '科大讯飞AIUI项目总监丁瑞：打造属于你的AI交互产品', '随着人工智能时代的快速到来，智能交互产品已经越来越多的进入千家万户。AI人机交互的痛点在哪里？如何打造一款属于你的AI交互产品呢？', 1, 50, 1523380273, 'http://localhost:3000/news_cover/news_cover152352402362410631.jpg', 0, '<!DOCTYPE html>\n<html>\n<head>\n</head>\n<body>\n<p>作为早于人工智能大潮出现的产品形态，AI助手某种程度上并不是什么新奇事物，但随着人工智能的日趋火热，围绕智能终端的AI助手之争又再度成为焦点。</p>\n<p>一直以来，各大巨头，无论新旧对此领域都非常关注，前赴后继地加入这个战场，就在11月21日，三星旗下的人工智能平台Bixby中文（普通话）版正式在中国发布。之前就听说Bixby的定位是&ldquo;作为用户设备生态的控制中枢&rdquo;，即除了面向智能手机的功能升级，Bixby还能连接智能家电，这无疑标志着AI交互领域的对抗强度又被加码。</p>\n<p>那么，人工智能时代到来、AI技术竞争成为科技主旋律后，在智能手机、PAD、PC甚至智能家居上大行其道的AI交互产品，究竟要靠什么构建核心竞争力赢得市场，从激烈的竞争中脱颖而出，开辟出硬件之外的另一片江山呢？</p>\n</body>\n</html>');
INSERT INTO `news` VALUES (2, '测试测试', '这个是测试用的', 1, 0, 1523480273, 'http://localhost:3000/news_cover/news_cover152352405649318122.jpeg', 1, '<!DOCTYPE html>\n<html>\n<head>\n</head>\n<body>\n<h1 align=\"center\"><b>测</b><i>试</i><u>富</u><strike>文</strike><font color=\"#993300\">本</font><font style=\"background-color: #ffff99;\">编</font><sub>辑</sub><sup>器</sup></h1>\n</body>\n</html>');
INSERT INTO `news` VALUES (3, 'node.js简介', '简单介绍node.js', 1, 0, 1523680273, 'http://localhost:3000/news_cover/news_cover152352845244715554.jpeg', 0, '<!DOCTYPE html>\n<html>\n<head>\n</head>\n<body>\n<p>简单的说 Node.js 就是运行在服务端的 JavaScript。</p>\n<p>Node.js 是一个基于Chrome JavaScript 运行时建立的一个平台。</p>\n<p>Node.js是一个事件驱动I/O服务端JavaScript环境，基于Google的V8引擎，V8引擎执行Javascript的速度非常快，性能非常好。</p>\n</body>\n</html>');
INSERT INTO `news` VALUES (4, 'qwe', 'ewq', 1, 0, 1523928784, 'http://localhost:3000/news_cover/news_cover152392878444715864.png', 1, '<!DOCTYPE html>\n<html>\n<head>\n</head>\n<body>\n<p>qwe</p>\n</body>\n</html>');
INSERT INTO `news` VALUES (5, '人工智能', '由微软Cortana和苹果Siri引发的人工智能思考', 1, 0, 1524027146, 'http://localhost:3000/news_cover/news_cover152402714632016363.jpg', 0, '<!DOCTYPE html>\n<html>\n<head>\n</head>\n<body>\n<p>在国外的一档脱口秀节目中，微软Cortana和苹果Siri这对欢喜冤家爆笑开怼。在主持人的&ldquo;挑唆&rdquo;下，安装有Siri和Cortana的iPhone和Windows Phone手机互不相让，从一开始的对喷，发展到对骂，最后甚至动了刀枪&hellip;&hellip;</p>\n<p>试想一下这样的生活，清晨你醒来，你想知道外面是什么天气，于是你拿起你的iPhone手机，&ldquo;Hey，Siri，今天的天气如何？&rdquo;&ldquo;今天阳光很好，先生。&rdquo;&ldquo;好，帮我把窗帘打开&rdquo;&ldquo;是，正在为您打开窗帘&rdquo;于是，你手上的iPhone打开了一款智能家居的应用程序，它帮你把窗帘拉开了。你突然想到今天还要给员工开一个视频会议，需要提醒秘书准备会议相关事宜，你在准备刷牙的时间空档中，开始语音喊话&ldquo;Hi，Cortana，给张秘书发一封有关会议的邮件&rdquo;你的电脑准确的识别出你的声音，&ldquo;正在给张秘书发邮件。&rdquo;OK，你昨晚准备好的有关视频会议的注意事项发送到了秘书的邮箱里。新的一天就此开始。</p>\n<p>至今为止，人类经过了三次工业革命：机械化、电气化和自动化，这三次，中国都没能及时跟上，错过了发展的最好时机。反观美国，每一次的及时技术更新，使美国成为了世界上科技最发达的国家。近些年随着信息技术的飞速发展，人类有可能迎来新一次的工业革命，这一次的革命，应该就是智能化，基于人机交互，大数据，云计算等技术的智能化社会革命会因此拉开序幕。自计算机发明以来，经过60多年的演进，特别在移动互联网、大数据、超级计算、传感网、脑科学等新理论新技术以及经济社会发展需求的共同驱动下，人工智能加速发展，呈现出深度学习、跨界融合、人机协同、群智开放、自主操控等新特征。</p>\n</body>\n</html>');
INSERT INTO `news` VALUES (6, '全球外汇储备美元份额再度下降', '金融外汇', 2, 0, 1524027984, 'http://localhost:3000/news_cover/news_cover152402798467615118.jpg', 0, '<!DOCTYPE html>\n<html>\n<head>\n</head>\n<body>\n<p>MF官方外汇储备货币构成(COFER)数据显示，外汇储备中的美元份额再度下降（由此前63.5%下降至62.7%），储备经理用其他货币补充了这一减持幅度（最明显的是日圆），市场原本看好将大大增加欧元持仓，但事实并非如此。</p>\n<p>-尽管4季度欧元储备大幅增加了850亿美元，但这一增长具有误导性。因为在增加的850亿美元中近一半是对原先已有的欧元头寸重新计算，并不是外界预期的全部为新增。<br />-为何4季度储备经历减持了欧元？因为很多亚洲储备经理人无法购买负利率债券（大多数欧元区2年期政府债券都是负利率），随着IMF继续完善中国的外汇储备数据，这一模式将越来越清晰。</p>\n<p>-有传闻称欧洲央行出于保护欧洲央行政策的目的可能劝说储备经理人不增加欧元储备持仓，而如果该情况属实，增持日圆储备可能会对日本央行带来严重影响。</p>\n</body>\n</html>');
INSERT INTO `news` VALUES (7, '什么是深度学习？', '深度学习', 1, 0, 1524028713, 'http://localhost:3000/news_cover/news_cover152402871338112961.jpg', 0, '<!DOCTYPE html>\n<html>\n<head>\n</head>\n<body>\n<p>深度学习的概念源于<a class=\"ed_inner_link\" href=\"https://baike.sogou.com/v145633953.htm\" target=\"_blank\" rel=\"noopener\">人工神经网络</a>的研究。含多隐层的多层感知器就是一种深度学习结构。深度学习通过组合低层特征形成更加抽象的高层表示属性类别或特征，以发现数据的分布式特征表示。</p>\n<p>深度学习的概念由Hinton等人于2006年提出。基于深度置信网络(DBN)提出非监督贪心逐层训练算法，为解决深层结构相关的优化难题带来希望，随后提出多层自动<a class=\"ed_inner_link\" href=\"https://baike.sogou.com/v304833.htm\" target=\"_blank\" rel=\"noopener\">编码器</a>深层结构。此外Lecun等人提出的<a class=\"ed_inner_link\" href=\"https://baike.sogou.com/v139400779.htm\" target=\"_blank\" rel=\"noopener\">卷积神经网络</a>是第一个真正多层<a class=\"ed_inner_link\" href=\"https://baike.sogou.com/v10786238.htm\" target=\"_blank\" rel=\"noopener\">结构学习</a>算法，它利用空间相对关系减少参数数目以提高训练性能。</p>\n<p>深度学习是机器学习中一种基于对数据进行表征学习的方法。<a class=\"ed_inner_link\" href=\"https://baike.sogou.com/v9061495.htm\" target=\"_blank\" rel=\"noopener\">观测值</a>（例如一幅图像）可以使用多种方式来表示，如每个像素强度值的向量，或者更抽象地表示成一系列边、特定形状的区域等。而使用某些特定的表示方法更容易从实例中学习任务（例如，人脸识别或面部表情识别）。</p>\n<p>深度学习是机器学习研究中的一个新的领域，其动机在于建立、模拟人脑进行分析学习的神经网络，它模仿人脑的机制来解释数据，例如图像，声音和文本</p>\n</body>\n</html>');
INSERT INTO `news` VALUES (8, '2018能源应用数字货币，错过后悔一生', '数字能源货币', 2, 0, 1524029018, 'http://localhost:3000/news_cover/news_cover152402901842915095.jpg', 0, '<!DOCTYPE html>\n<html>\n<head>\n</head>\n<body>\n<p>&nbsp; &nbsp;近来，普惠币出现在小部分币圈精英的视野之中，其以区块链技术达到能源上链，未来的前景广大，让人充满遐想。其可以运用区块链技术解决多数能源共享的问题，打造出新的能源消费链，以实际的刚需保证其币值的增长，大大降低了投资者的风险！</p>\n<p>&nbsp; &nbsp; 例如电动汽车的痛点是私人充电桩难以实现共享，电动汽车V2G缺乏激励机制，动力电池梯级利用无法保证电芯质量。</p>\n<p>&nbsp; &nbsp; 普惠币和能源结合是全方位的，从资源上油、气、煤、水等，都可以通过其区块链进行重构。在眼下无数投资人将数字货币看做一种投资品今天，在无数人获得上百上万倍的回报，数字货币就如当年股市最开始时一样，终将有一日会变成大牛市。更何况普惠币这样应用完善的项目？</p>\n<section data-=\"\" data-tools=\"135编辑器\">\n<section data-role=\"paragraph\">\n<section>\n<section>\n<section data-=\"\" data-role=\"square\"></section>\n</section>\n</section>\n</section>\n</section>\n<section data-=\"\" data-tools=\"135编辑器\"></section>\n</body>\n</html>');
INSERT INTO `news` VALUES (9, '储存免疫细胞的平台“细胞云”在深圳发布', '储存免疫细胞', 2, 0, 1524029393, 'http://localhost:3000/news_cover/news_cover152402939363013856.png', 0, '<!DOCTYPE html>\n<html>\n<head>\n</head>\n<body>\n<div id=\"artical_real\" class=\"js_img_share_area\">\n<div id=\"main_content\" class=\"js_selection_area\">\n<p>一个储存免疫细胞、管理健康的一站式服务平台&ldquo;细胞云&rdquo;，11日下午在深圳发布，运用生命科学最新成果，建立全生命周期的健康管理。</p>\n<p>　　&ldquo;科技+&rdquo;生命健康和生物产业可持续发展高峰论坛暨细胞云发布会，当天在深圳市高新园北科大厦&ldquo;生命科学馆&rdquo;举办。欧洲学术研究院、德国科学院院士Lothar Willmitzer博士，中国妇幼保健协会会长陈资全等中外知名生物科技、医疗临床专家到会，探讨以&ldquo;科技+&rdquo;为手段，通过科技融合临床、监管、服务等，打造生命健康软环境。</p>\n<p>　　北科生物、北科生命董事长胡祥博士介绍说，每个人都是由40万亿&mdash;60万亿个细胞组成的，作为人身体的基本组成单位，细胞不仅组成了各个器官和组织，更关乎着人的身体健康。免疫细胞是人的免疫系统最重要的部分，当免疫细胞的活性和杀伤力正常时，人的身体就健康;当细胞的活性和杀伤力下降时，人体就会走向衰老。正常人体每天会产生3000&mdash;6000个癌变细胞，人没得癌症不是一种幸运，而是因为免疫细胞随时监视并清除病损、衰老、癌变的细胞。因此储存免疫细胞就是储存生命健康的种子，除了可以保护身体对抗外来病毒和细菌，它还可以在人体需要时进行扩增或加装抗体，实现保健抗衰和防癌抗病。目前接受免疫细胞治疗癌症已经有了成功案例。</p>\n<p>　　北科生命总裁叶圣勤表示，北科&ldquo;细胞云&rdquo;以细胞储存为入口，搭建医学知识库、组学知识库、个人健康数据库，依托人工智能算法，为疾病的诊疗提供技术精准支撑。</p>\n</div>\n</div>\n<div class=\"clear\">&nbsp;</div>\n<div id=\"artical_sth2\" class=\"box_share ss_none ipad_block iphone_block clearfix\">&nbsp;</div>\n</body>\n</html>');
INSERT INTO `news` VALUES (10, '中国央行降准的三重政策含义', '央行降准方式', 2, 0, 1524064976, 'http://localhost:3000/news_cover/news_cover152406497660115605.webp', 0, '<!DOCTYPE html>\n<html>\n<head>\n</head>\n<body>\n<p>那么央行的意图是什么？联系四月中旬的另外一个新闻，媒体报道市场利率定价自律机制机构成员召开会议，讨论关于放开商业银行存款利率自律上限的事宜。这意味着，商业银行存款利率上限行业自律约定可能将放开，一旦成行，实际存款利率必然大幅度上浮，缩银行利差，这对于银行与金融业的冲击可想而知。</p>\n<p>两相结合，可见这次降准本质是一次对冲。可以认为，这是贯彻落实中央的结构化去杠杆的配套措施，所谓的结构化去杠杆在金融层面，最基本意图就是银行表外资产转向表内资产。从一季度数据来看，这一趋势已经开始，信贷新增4.86万亿元，比去年同期多增6339亿元，对比之下，表外业务的委托贷款反而降低了1464亿元。</p>\n<p>在表外转表内过程中，银行经营压力自然增加，尤其中小银行。值得注意的是，当前降准大部分增量资金，其实释放给了小银行，例如城商行和非县域农商行，这些银行是中国金融系统薄弱环节，他们过去得到MLF不多，本次也无需偿还，通过普遍降准首当其冲缓解他们的流动性压力。</p>\n</body>\n</html>');
INSERT INTO `news` VALUES (11, '中国央行降准的三重政策含义', '央行降准', 2, 0, 1524064976, 'http://localhost:3000/news_cover/news_cover152406497660117694.jpeg', 0, '<!DOCTYPE html>\n<html>\n<head>\n</head>\n<body>\n<p>4月17日，中国央行表示从2018年4月25日起，下调大型商业银行、股份制商业银行、城市商业银行、非县域农村商业银行、外资银行人民币存款准备金率1个百分点。</p>\n<p>告别周小川时代的央行首次降准，如何解读？</p>\n<p>理论而言，中国存准率降低有很大空间。国外很多国家已经取消了存款准备金制度，中国存准金制度本身就有一定的不合理性，也是对于金融资源的极大浪费，笔者在FT中文网专栏以及公号《徐瑾经济人》也多次撰文表示存款准备金应该一降再降，甚至取消这一制度。从当下时间而言，存款准备金&ldquo;蓄水池&rdquo;意义已经降低。过去中国贸易顺差居高不下，存准金金有部分着对冲外汇占款的意义，即回收流入的美元。然而，当下来看，外汇流入的速度在降低，官方数据今年一季度的贸易顺差3261.8亿元，收窄21.8%，此外，国外直接投资也减少了很多。两者叠加，中国外汇储备已经从最高点的4万亿美元降低到目前的3.1万亿美元左右，需要装下的&ldquo;水&rdquo;已经降低了，存准率自然也应该调低。</p>\n</body>\n</html>');
INSERT INTO `news` VALUES (12, '中国钢铁业“去产能之战”促使产能转移', '中国钢铁', 2, 0, 1524065853, 'http://localhost:3000/news_cover/news_cover152406585349016268.jpg', 0, '<!DOCTYPE html>\n<html>\n<head>\n</head>\n<body>\n<p>在名义上，中国正在进行一场钢铁去产能的战争。过去两年，中国当局削减了数以百万吨计的钢铁产能，同时中国大多数钢铁产能最大的地区都命令钢厂在冬季削减一半产量。</p>\n<p>不过，在山西省建龙钢铁厂，钢铁工人们抱怨整个冬天都在加班。&ldquo;去年冬天，我每周至少有一天要上15小时的班，&rdquo;一名钢铁工人抱怨说。他只透露了自己姓王，过去十年一直在该厂工作。</p>\n<p>尽管钢铁产能因季节性而大幅缩减，但2018年1-2月中国粗钢产量同比增长了6%，而2017年则创下了中国钢铁产量的记录。</p>\n<p>这一增长说明了中国政府在试图精简包括钢铁在内一些低效重工业部门方面所面临的困难。官方设定的产量上限只是意味着产能被转移到那些未设定上限的地区</p>\n</body>\n</html>');
INSERT INTO `news` VALUES (13, 'Element UI', 'Element ', 1, 0, 1524066509, 'http://localhost:3000/news_cover/news_cover152406650995111775.jpg', 0, '<!DOCTYPE html>\n<html>\n<head>\n</head>\n<body>\n<p>Element UI 是一套采用 Vue 2.0 作为基础框架实现的组件库，它面向企业级的后台应用，能够帮助你快速地搭建网站，极大地减少研发的人力与时间成本。在这个月的 NingJS 上我们开源了这个项目，当时它的文档还没有准备好。今天，经过两周多的完善， Element UI 的文档正式上线啦！目前它处于 rc 阶段，正式版将于 Vue 2.0 发布后第一时间跟进。 欢迎大家来使用和完善，一起<font style=\"background-color: #ffff00;\" color=\"#FF0000\">把它做成 Vue 最好的企业级组件库。</font></p>\n</body>\n</html>');

-- ----------------------------
-- Table structure for news_favorite
-- ----------------------------
DROP TABLE IF EXISTS `news_favorite`;
CREATE TABLE `news_favorite`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `news_id` int(11) NOT NULL,
  `stu_id` int(11) NOT NULL,
  `create_time` bigint(20) NOT NULL,
  `isDel` int(11) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 11 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of news_favorite
-- ----------------------------
INSERT INTO `news_favorite` VALUES (1, 1, 3, 1523524612, 0);
INSERT INTO `news_favorite` VALUES (2, 2, 5, 1523529999, 1);
INSERT INTO `news_favorite` VALUES (3, 4, 2, 1523956370, 1);
INSERT INTO `news_favorite` VALUES (4, 4, 2, 1523956385, 1);
INSERT INTO `news_favorite` VALUES (5, 4, 2, 1523956422, 1);
INSERT INTO `news_favorite` VALUES (6, 4, 2, 1523956424, 1);
INSERT INTO `news_favorite` VALUES (7, 4, 2, 1523956425, 1);
INSERT INTO `news_favorite` VALUES (8, 4, 2, 1523957659, 0);
INSERT INTO `news_favorite` VALUES (9, 3, 2, 1523957664, 0);
INSERT INTO `news_favorite` VALUES (10, 2, 5, 1524015474, 1);

-- ----------------------------
-- Table structure for news_type
-- ----------------------------
DROP TABLE IF EXISTS `news_type`;
CREATE TABLE `news_type`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `news_type_name` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `isDel` int(11) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of news_type
-- ----------------------------
INSERT INTO `news_type` VALUES (1, '技术新闻', 0);
INSERT INTO `news_type` VALUES (2, '商业新闻', 0);

-- ----------------------------
-- Table structure for news_visit_log
-- ----------------------------
DROP TABLE IF EXISTS `news_visit_log`;
CREATE TABLE `news_visit_log`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `news_id` int(11) NOT NULL COMMENT '资讯id',
  `stu_id` int(11) NOT NULL COMMENT '学生id',
  `create_time` bigint(20) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 65 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of news_visit_log
-- ----------------------------
INSERT INTO `news_visit_log` VALUES (1, 1, -1, 1523854101);
INSERT INTO `news_visit_log` VALUES (2, 1, -1, 1523854125);
INSERT INTO `news_visit_log` VALUES (3, 1, 5, 1523854058);
INSERT INTO `news_visit_log` VALUES (4, 2, 1, 1523858404);
INSERT INTO `news_visit_log` VALUES (5, 3, 5, 1523721600);
INSERT INTO `news_visit_log` VALUES (6, 3, 2, 1523635200);
INSERT INTO `news_visit_log` VALUES (7, 4, 1, 1523931327);
INSERT INTO `news_visit_log` VALUES (8, 3, 1, 1523931329);
INSERT INTO `news_visit_log` VALUES (9, 2, 1, 1523931332);
INSERT INTO `news_visit_log` VALUES (10, 2, 1, 1523931334);
INSERT INTO `news_visit_log` VALUES (11, 3, 1, 1523931335);
INSERT INTO `news_visit_log` VALUES (12, 4, 1, 1523931344);
INSERT INTO `news_visit_log` VALUES (13, 4, 1, 1523931345);
INSERT INTO `news_visit_log` VALUES (14, 4, 1, 1523931346);
INSERT INTO `news_visit_log` VALUES (15, 4, 1, 1523931348);
INSERT INTO `news_visit_log` VALUES (16, 4, 1, 1523931350);
INSERT INTO `news_visit_log` VALUES (17, 4, 1, 1523931351);
INSERT INTO `news_visit_log` VALUES (18, 3, 1, 1523931526);
INSERT INTO `news_visit_log` VALUES (19, 3, 1, 1523931934);
INSERT INTO `news_visit_log` VALUES (20, 4, 2, 1523955483);
INSERT INTO `news_visit_log` VALUES (21, 4, 2, 1523955532);
INSERT INTO `news_visit_log` VALUES (22, 4, 2, 1523955568);
INSERT INTO `news_visit_log` VALUES (23, 4, 2, 1523955626);
INSERT INTO `news_visit_log` VALUES (24, 4, 2, 1523955659);
INSERT INTO `news_visit_log` VALUES (25, 4, 2, 1523955691);
INSERT INTO `news_visit_log` VALUES (26, 4, 2, 1523955786);
INSERT INTO `news_visit_log` VALUES (27, 4, 2, 1523955919);
INSERT INTO `news_visit_log` VALUES (28, 4, 2, 1523956030);
INSERT INTO `news_visit_log` VALUES (29, 4, 2, 1523956091);
INSERT INTO `news_visit_log` VALUES (30, 4, 2, 1523956095);
INSERT INTO `news_visit_log` VALUES (31, 4, 2, 1523956368);
INSERT INTO `news_visit_log` VALUES (32, 4, 2, 1523956373);
INSERT INTO `news_visit_log` VALUES (33, 4, 2, 1523956382);
INSERT INTO `news_visit_log` VALUES (34, 4, 2, 1523956407);
INSERT INTO `news_visit_log` VALUES (35, 4, 2, 1523956421);
INSERT INTO `news_visit_log` VALUES (36, 4, 2, 1523957658);
INSERT INTO `news_visit_log` VALUES (37, 3, 2, 1523957662);
INSERT INTO `news_visit_log` VALUES (38, 2, 2, 1523957975);
INSERT INTO `news_visit_log` VALUES (39, 1, 5, 1524015462);
INSERT INTO `news_visit_log` VALUES (40, 2, 5, 1524015471);
INSERT INTO `news_visit_log` VALUES (41, 4, 5, 1524017809);
INSERT INTO `news_visit_log` VALUES (42, 4, 5, 1524018351);
INSERT INTO `news_visit_log` VALUES (43, 3, 5, 1524018355);
INSERT INTO `news_visit_log` VALUES (44, 3, 5, 1524018511);
INSERT INTO `news_visit_log` VALUES (45, 4, 5, 1524025621);
INSERT INTO `news_visit_log` VALUES (46, 4, 5, 1524025720);
INSERT INTO `news_visit_log` VALUES (47, 5, 5, 1524027170);
INSERT INTO `news_visit_log` VALUES (48, 5, -1, 1524027273);
INSERT INTO `news_visit_log` VALUES (49, 1, -1, 1524027578);
INSERT INTO `news_visit_log` VALUES (50, 3, 5, 1524028606);
INSERT INTO `news_visit_log` VALUES (51, 2, 5, 1524028638);
INSERT INTO `news_visit_log` VALUES (52, 2, -1, 1524028642);
INSERT INTO `news_visit_log` VALUES (53, 2, -1, 1524028655);
INSERT INTO `news_visit_log` VALUES (54, 8, -1, 1524029031);
INSERT INTO `news_visit_log` VALUES (55, 7, -1, 1524034899);
INSERT INTO `news_visit_log` VALUES (56, 9, -1, 1524034912);
INSERT INTO `news_visit_log` VALUES (57, 2, 5, 1524065019);
INSERT INTO `news_visit_log` VALUES (58, 10, 5, 1524065036);
INSERT INTO `news_visit_log` VALUES (59, 11, 5, 1524065044);
INSERT INTO `news_visit_log` VALUES (60, 11, 5, 1524065133);
INSERT INTO `news_visit_log` VALUES (61, 12, 5, 1524113883);
INSERT INTO `news_visit_log` VALUES (62, 12, 5, 1524113925);
INSERT INTO `news_visit_log` VALUES (63, 13, 5, 1524113928);
INSERT INTO `news_visit_log` VALUES (64, 13, 5, 1524114007);

-- ----------------------------
-- Table structure for order
-- ----------------------------
DROP TABLE IF EXISTS `order`;
CREATE TABLE `order`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `course_id` int(11) NOT NULL,
  `stu_id` int(11) NOT NULL,
  `spend` int(11) NULL DEFAULT NULL,
  `create_time` bigint(20) NOT NULL,
  `isDel` int(11) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 30 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of order
-- ----------------------------
INSERT INTO `order` VALUES (2, 2, 2, 100, 1523425904, 0);
INSERT INTO `order` VALUES (3, 2, 3, 100, 1523429999, 0);
INSERT INTO `order` VALUES (12, 1, 5, 50, 1523848059, 0);
INSERT INTO `order` VALUES (13, 5, 5, 10, 1523848544, 0);
INSERT INTO `order` VALUES (14, 4, 5, 24, 1523848566, 0);
INSERT INTO `order` VALUES (20, 5, 1, 10, 1523857758, 1);
INSERT INTO `order` VALUES (21, 4, 1, 24, 1523857972, 1);
INSERT INTO `order` VALUES (22, 2, 1, 10, 1523858131, 0);
INSERT INTO `order` VALUES (23, 3, 1, 0, 1523858364, 1);
INSERT INTO `order` VALUES (24, 1, 1, 50, 1523858380, 0);
INSERT INTO `order` VALUES (25, 6, 1, 123, 1523930396, 1);
INSERT INTO `order` VALUES (26, 6, 5, 9999, 1523936804, 0);
INSERT INTO `order` VALUES (27, 3, 5, 0, 1524015408, 0);
INSERT INTO `order` VALUES (28, 2, 5, 10, 1524018272, 0);
INSERT INTO `order` VALUES (29, 9, 5, 10, 1524067601, 0);

-- ----------------------------
-- Table structure for roles
-- ----------------------------
DROP TABLE IF EXISTS `roles`;
CREATE TABLE `roles`  (
  `id` int(3) NOT NULL AUTO_INCREMENT,
  `roles` text CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `isDel` int(11) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of roles
-- ----------------------------
INSERT INTO `roles` VALUES (1, '超级管理员', 0);
INSERT INTO `roles` VALUES (2, '管理员', 0);

-- ----------------------------
-- Table structure for sign
-- ----------------------------
DROP TABLE IF EXISTS `sign`;
CREATE TABLE `sign`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `stu_id` int(11) NOT NULL,
  `sign_time` int(20) NOT NULL COMMENT '1970年01月01日00时00分00秒至现在的天数',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 8 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sign
-- ----------------------------
INSERT INTO `sign` VALUES (2, 5, 17639);
INSERT INTO `sign` VALUES (6, 1, 17639);
INSERT INTO `sign` VALUES (7, 5, 17640);

-- ----------------------------
-- Table structure for stu_token
-- ----------------------------
DROP TABLE IF EXISTS `stu_token`;
CREATE TABLE `stu_token`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `token` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `deadline` bigint(255) NOT NULL,
  `stu_id` int(11) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 155 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of stu_token
-- ----------------------------
INSERT INTO `stu_token` VALUES (65, '1523705737435', 1524310537435, 5);
INSERT INTO `stu_token` VALUES (66, '1523705894239', 1524310694239, 5);
INSERT INTO `stu_token` VALUES (67, '1523706405458', 1524311205458, 5);
INSERT INTO `stu_token` VALUES (68, '1523706425049', 1524311225049, 5);
INSERT INTO `stu_token` VALUES (69, '1523707311096', 1524312111096, 5);
INSERT INTO `stu_token` VALUES (70, '1523707359895', 1524312159895, 5);
INSERT INTO `stu_token` VALUES (71, '1523707445083', 1524312245083, 5);
INSERT INTO `stu_token` VALUES (72, '1523707537772', 1524312337772, 5);
INSERT INTO `stu_token` VALUES (73, '1523707563445', 1524312363445, 5);
INSERT INTO `stu_token` VALUES (74, '1523707693731', 1524312493731, 5);
INSERT INTO `stu_token` VALUES (75, '1523707786114', 1524312586114, 5);
INSERT INTO `stu_token` VALUES (76, '1523707838552', 1524312638552, 5);
INSERT INTO `stu_token` VALUES (77, '1523707893215', 1524312693215, 5);
INSERT INTO `stu_token` VALUES (78, '1523708328981', 1524313128981, 5);
INSERT INTO `stu_token` VALUES (79, '1523708371741', 1524313171741, 5);
INSERT INTO `stu_token` VALUES (80, '1523708381446', 1524313181446, 5);
INSERT INTO `stu_token` VALUES (81, '1523708481547', 1524313281547, 5);
INSERT INTO `stu_token` VALUES (82, '1523708508636', 1524313308636, 5);
INSERT INTO `stu_token` VALUES (83, '1523708564472', 1524313364472, 5);
INSERT INTO `stu_token` VALUES (84, '1523708642123', 1524313442123, 5);
INSERT INTO `stu_token` VALUES (85, '1523708786907', 1524313586907, 5);
INSERT INTO `stu_token` VALUES (86, '1523708879211', 1524313679211, 5);
INSERT INTO `stu_token` VALUES (87, '1523708935163', 1524313735163, 5);
INSERT INTO `stu_token` VALUES (88, '1523708957027', 1524313757027, 5);
INSERT INTO `stu_token` VALUES (89, '1523708990958', 1524313790958, 5);
INSERT INTO `stu_token` VALUES (90, '1523709166644', 1524313966644, 5);
INSERT INTO `stu_token` VALUES (91, '1523709785383', 1524314585383, 7);
INSERT INTO `stu_token` VALUES (92, '1523709806503', 1524314606503, 7);
INSERT INTO `stu_token` VALUES (93, '1523709821636', 1524314621636, 5);
INSERT INTO `stu_token` VALUES (94, '1523709868518', 1524314668518, 5);
INSERT INTO `stu_token` VALUES (95, '1523709930079', 1524314730079, 5);
INSERT INTO `stu_token` VALUES (96, '1523709944301', 1524314744301, 5);
INSERT INTO `stu_token` VALUES (97, '1523710047490', 1524314847490, 5);
INSERT INTO `stu_token` VALUES (98, '1523710096251', 1524314896251, 5);
INSERT INTO `stu_token` VALUES (99, '1523711407595', 1524316207595, 7);
INSERT INTO `stu_token` VALUES (100, '1523711426675', 1524316226675, 7);
INSERT INTO `stu_token` VALUES (101, '1523712662690', 1524317462690, 7);
INSERT INTO `stu_token` VALUES (102, '1523712818244', 1524317618244, 7);
INSERT INTO `stu_token` VALUES (103, '1523713381195', 1524318181195, 5);
INSERT INTO `stu_token` VALUES (104, '1523713528600', 1524318328600, 5);
INSERT INTO `stu_token` VALUES (105, '1523713822488', 1524318622488, 5);
INSERT INTO `stu_token` VALUES (106, '1523713858425', 1524318658425, 5);
INSERT INTO `stu_token` VALUES (107, '1523714231190', 1524319031190, 5);
INSERT INTO `stu_token` VALUES (108, '1523714258520', 1524319058520, 5);
INSERT INTO `stu_token` VALUES (109, '1523714288536', 1524319088536, 5);
INSERT INTO `stu_token` VALUES (110, '1523714506037', 1524319306037, 5);
INSERT INTO `stu_token` VALUES (111, '1523714598994', 1524319398994, 5);
INSERT INTO `stu_token` VALUES (112, '1523714651955', 1524319451955, 5);
INSERT INTO `stu_token` VALUES (113, '1523714742343', 1524319542343, 5);
INSERT INTO `stu_token` VALUES (114, '1523715156339', 1524319956339, 5);
INSERT INTO `stu_token` VALUES (115, '1523719275847', 1524324075847, 6);
INSERT INTO `stu_token` VALUES (116, '1523719443387', 1524324243387, 5);
INSERT INTO `stu_token` VALUES (117, '1523720040309', 1524324840309, 5);
INSERT INTO `stu_token` VALUES (118, '1523720051384', 1524324851384, 5);
INSERT INTO `stu_token` VALUES (119, '1523751229343', 1524356029343, 5);
INSERT INTO `stu_token` VALUES (120, '1523751260574', 1524356060574, 5);
INSERT INTO `stu_token` VALUES (121, '1523751307050', 1524356107050, 5);
INSERT INTO `stu_token` VALUES (122, '1523751393117', 1524356193117, 5);
INSERT INTO `stu_token` VALUES (123, '1523751443418', 1524356243418, 5);
INSERT INTO `stu_token` VALUES (124, '1523751752439', 1524356552439, 5);
INSERT INTO `stu_token` VALUES (125, '1523756642697', 1524361442697, 1);
INSERT INTO `stu_token` VALUES (126, '1523760517351', 1524365317351, 2);
INSERT INTO `stu_token` VALUES (127, '1523760907947', 1524365707947, 5);
INSERT INTO `stu_token` VALUES (128, '1523792918542', 1524397718542, 6);
INSERT INTO `stu_token` VALUES (129, '1523792998843', 1524397798843, 2);
INSERT INTO `stu_token` VALUES (130, '1523796038869', 1524400838869, 5);
INSERT INTO `stu_token` VALUES (131, '1523842954356', 1524447754356, 5);
INSERT INTO `stu_token` VALUES (132, '1523849132976', 1524453932976, 6);
INSERT INTO `stu_token` VALUES (133, '1523851812488', 1524456612488, 5);
INSERT INTO `stu_token` VALUES (134, '1523857219108', 1524462019108, 1);
INSERT INTO `stu_token` VALUES (135, '1523930940338', 1524535740338, 1);
INSERT INTO `stu_token` VALUES (136, '1523934960706', 1524539760706, 5);
INSERT INTO `stu_token` VALUES (137, '1523935454188', 1524540254188, 5);
INSERT INTO `stu_token` VALUES (138, '1523935981705', 1524540781705, 5);
INSERT INTO `stu_token` VALUES (139, '1523944553052', 1524549353052, 1);
INSERT INTO `stu_token` VALUES (140, '1523945422050', 1524550222050, 2);
INSERT INTO `stu_token` VALUES (141, '1523977642926', 1524582442926, 1);
INSERT INTO `stu_token` VALUES (142, '1523978297560', 1524583097560, 2);
INSERT INTO `stu_token` VALUES (143, '1523978363103', 1524583163103, 3);
INSERT INTO `stu_token` VALUES (144, '1524013881083', 1524618681083, 5);
INSERT INTO `stu_token` VALUES (145, '1524015726182', 1524620526182, 5);
INSERT INTO `stu_token` VALUES (146, '1524016360262', 1524621160262, 5);
INSERT INTO `stu_token` VALUES (147, '1524018150324', 1524622950324, 5);
INSERT INTO `stu_token` VALUES (148, '1524025410543', 1524630210543, 5);
INSERT INTO `stu_token` VALUES (149, '1524025441864', 1524630241864, 5);
INSERT INTO `stu_token` VALUES (150, '1524025679452', 1524630479452, 5);
INSERT INTO `stu_token` VALUES (151, '1524025998917', 1524630798917, 5);
INSERT INTO `stu_token` VALUES (152, '1524027160703', 1524631960703, 5);
INSERT INTO `stu_token` VALUES (153, '1524028593335', 1524633393335, 5);
INSERT INTO `stu_token` VALUES (154, '1524034938974', 1524639738974, 5);

-- ----------------------------
-- Table structure for student
-- ----------------------------
DROP TABLE IF EXISTS `student`;
CREATE TABLE `student`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `stu_name` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `tel` varchar(13) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `balance` int(20) NOT NULL COMMENT '余额',
  `avatar` varchar(1000) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `create_time` bigint(20) NOT NULL,
  `ischecked` int(1) NOT NULL DEFAULT 0 COMMENT '是否被审核',
  `sex` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `password` varchar(15) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `isDel` int(11) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 8 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of student
-- ----------------------------
INSERT INTO `student` VALUES (1, '张3333', '13500000000', 97852, 'http://localhost:3000/stu_avatar/1.jpg', 1523352574, 1, '男', 'aaaaaa', 0);
INSERT INTO `student` VALUES (2, '李4444', '13555555555', 100, 'http://localhost:3000/stu_avatar/2.jpg', 1523352614, 1, '男', 'aaaaaa', 0);
INSERT INTO `student` VALUES (3, '王5555', '13599999999', 200, 'http://localhost:3000/stu_avatar/stu_avatar152351937983813001.png', 1523352636, 1, '女', 'aaaaaa', 0);
INSERT INTO `student` VALUES (4, '赵6666', '18966666666', 0, 'http://localhost:3000/stu_avatar/默认.jpg', 1523352665, 1, '男', 'aaaaaa', 0);
INSERT INTO `student` VALUES (5, 'test1', '13512877130', 988788, 'http://localhost:3000/stu_avatar/stu_avatar152379251915915917.png', 1523699878, 1, '男', 'qqqqqq', 0);
INSERT INTO `student` VALUES (6, 'test2', '13512877130', 10, 'http://localhost:3000/stu_avatar/stu_avatar152379297088716402.gif', 1523700065, 1, '男', 'aaa111', 0);
INSERT INTO `student` VALUES (7, 'aaaaa', '13555548774', 0, 'http://localhost:3000/stu_avatar/stu_avatar152397960624011002.png', 1523700099, 0, '男', 'aaaaaa', 0);

SET FOREIGN_KEY_CHECKS = 1;
