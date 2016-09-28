/*
Navicat MySQL Data Transfer

Source Server         : Local
Source Server Version : 50525
Source Host           : 127.0.0.1:3306
Source Database       : hrstock

Target Server Type    : MYSQL
Target Server Version : 50525
File Encoding         : 65001

Date: 2016-09-27 16:04:29
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `bills`
-- ----------------------------
DROP TABLE IF EXISTS `bills`;
CREATE TABLE `bills` (
  `bill_no` bigint(7) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `service_date` datetime DEFAULT NULL,
  `receive_date` datetime DEFAULT NULL,
  `status_pay` text,
  `depcode` varchar(5) DEFAULT NULL,
  `user_order` text,
  `update_time` datetime DEFAULT NULL,
  PRIMARY KEY (`bill_no`)
) ENGINE=MyISAM AUTO_INCREMENT=22 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of bills
-- ----------------------------
INSERT INTO `bills` VALUES ('0000002', '2016-08-29 11:36:17', '2016-08-29 00:00:00', null, 'IT11', 'ncd', '2016-08-29 11:36:17');
INSERT INTO `bills` VALUES ('0000003', '2016-08-29 11:38:20', '2016-08-05 00:00:00', null, 'IT11', 'ncd', '2016-08-29 11:38:20');
INSERT INTO `bills` VALUES ('0000004', '2016-08-29 11:41:25', '2016-08-29 00:00:00', null, 'IT11', 'ncd', '2016-08-29 11:41:25');
INSERT INTO `bills` VALUES ('0000005', '2016-08-29 11:44:14', '2016-08-29 00:00:00', 'Y', 'IT11', 'ncd', '2016-09-13 19:31:18');
INSERT INTO `bills` VALUES ('0000006', '2016-08-29 11:49:18', '2016-08-29 00:00:00', 'Y', 'IT11', 'ncd', '2016-09-14 11:42:25');
INSERT INTO `bills` VALUES ('0000007', '2016-08-29 11:56:21', '2016-08-30 00:00:00', null, 'IT11', 'ncd', '2016-08-29 11:56:21');
INSERT INTO `bills` VALUES ('0000008', '2016-08-30 11:55:32', '2016-08-30 00:00:00', null, 'IT11', 'ncd', '2016-08-30 11:55:32');
INSERT INTO `bills` VALUES ('0000009', '2016-09-03 09:57:24', '2016-09-03 00:00:00', null, 'IT11', 'ncd', '2016-09-03 09:57:24');
INSERT INTO `bills` VALUES ('0000010', '2016-09-06 11:58:44', '2016-09-06 00:00:00', null, 'IT11', 'ncd', '2016-09-06 11:58:44');
INSERT INTO `bills` VALUES ('0000011', '2016-09-08 10:29:16', '2016-09-08 00:00:00', null, 'IT11', 'ncd', '2016-09-08 10:29:16');
INSERT INTO `bills` VALUES ('0000012', '2016-09-09 09:11:30', '2016-09-09 00:00:00', null, 'IT11', 'ncd', '2016-09-09 11:40:46');
INSERT INTO `bills` VALUES ('0000013', '2016-09-09 09:23:20', '2016-09-09 00:00:00', 'Y', 'IT11', 'ncd', '2016-09-09 11:36:37');
INSERT INTO `bills` VALUES ('0000014', '2016-09-11 20:10:33', '2016-09-11 00:00:00', 'Y', 'IT11', 'ncd', '2016-09-11 20:26:14');
INSERT INTO `bills` VALUES ('0000015', '2016-09-11 20:27:49', '2016-09-11 00:00:00', 'Y', 'IT11', 'ncd', '2016-09-11 20:28:38');
INSERT INTO `bills` VALUES ('0000016', '2016-09-12 09:50:49', '2016-09-12 00:00:00', 'Y', 'IT11', 'ncd', '2016-09-12 10:14:38');
INSERT INTO `bills` VALUES ('0000017', '2016-09-12 10:17:38', '2016-09-12 00:00:00', null, 'IT11', 'ncd', '2016-09-12 10:44:43');
INSERT INTO `bills` VALUES ('0000018', '2016-09-12 10:23:31', '2016-09-12 00:00:00', null, 'IT11', 'ncd', '2016-09-12 11:00:14');
INSERT INTO `bills` VALUES ('0000019', '2016-09-13 18:40:35', '2016-09-13 00:00:00', 'Y', 'IT11', 'ncd', '2016-09-14 11:41:56');
INSERT INTO `bills` VALUES ('0000020', '2016-09-14 10:40:08', '2016-09-14 00:00:00', 'Y', 'IT03', 'uma', '2016-09-14 10:44:16');
INSERT INTO `bills` VALUES ('0000021', '2016-09-27 15:43:30', '2016-09-28 00:00:00', 'Y', 'IT12', 'it', '2016-09-27 15:46:32');

-- ----------------------------
-- Table structure for `stock_material`
-- ----------------------------
DROP TABLE IF EXISTS `stock_material`;
CREATE TABLE `stock_material` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `bill_no` int(11) NOT NULL,
  `items_id` int(11) NOT NULL,
  `qty` int(11) NOT NULL,
  `pay` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=262 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of stock_material
-- ----------------------------
INSERT INTO `stock_material` VALUES ('10', '7', '199', '1', null);
INSERT INTO `stock_material` VALUES ('11', '7', '200', '2', null);
INSERT INTO `stock_material` VALUES ('12', '7', '157', '3', null);
INSERT INTO `stock_material` VALUES ('13', '8', '198', '12', null);
INSERT INTO `stock_material` VALUES ('14', '8', '8', '12', null);
INSERT INTO `stock_material` VALUES ('15', '9', '61', '1', null);
INSERT INTO `stock_material` VALUES ('16', '9', '62', '2', null);
INSERT INTO `stock_material` VALUES ('17', '10', '103', '1', null);
INSERT INTO `stock_material` VALUES ('18', '10', '104', '2', null);
INSERT INTO `stock_material` VALUES ('19', '10', '92', '3', null);
INSERT INTO `stock_material` VALUES ('20', '11', '61', '1', null);
INSERT INTO `stock_material` VALUES ('21', '11', '62', '2', null);
INSERT INTO `stock_material` VALUES ('22', '11', '56', '3', null);
INSERT INTO `stock_material` VALUES ('23', '11', '177', '4', null);
INSERT INTO `stock_material` VALUES ('24', '11', '70', '7', null);
INSERT INTO `stock_material` VALUES ('35', '13', '199', '1', '1');
INSERT INTO `stock_material` VALUES ('36', '13', '200', '2', '2');
INSERT INTO `stock_material` VALUES ('37', '13', '157', '3', '3');
INSERT INTO `stock_material` VALUES ('38', '13', '159', '4', '4');
INSERT INTO `stock_material` VALUES ('39', '13', '158', '5', '5');
INSERT INTO `stock_material` VALUES ('40', '12', '126', '1', '1');
INSERT INTO `stock_material` VALUES ('41', '12', '124', '3', '3');
INSERT INTO `stock_material` VALUES ('42', '12', '139', '4', '4');
INSERT INTO `stock_material` VALUES ('43', '12', '137', '5', '5');
INSERT INTO `stock_material` VALUES ('44', '12', '144', '1', '1');
INSERT INTO `stock_material` VALUES ('56', '15', '126', '1', '1');
INSERT INTO `stock_material` VALUES ('57', '15', '124', '3', '3');
INSERT INTO `stock_material` VALUES ('58', '15', '139', '4', '4');
INSERT INTO `stock_material` VALUES ('59', '15', '121', '5', '5');
INSERT INTO `stock_material` VALUES ('64', '16', '126', '1', '1');
INSERT INTO `stock_material` VALUES ('65', '16', '124', '2', '2');
INSERT INTO `stock_material` VALUES ('66', '16', '139', '3', '3');
INSERT INTO `stock_material` VALUES ('67', '16', '121', '4', '4');
INSERT INTO `stock_material` VALUES ('110', '17', '103', '1', '1');
INSERT INTO `stock_material` VALUES ('111', '17', '104', '2', '2');
INSERT INTO `stock_material` VALUES ('112', '17', '92', '34', '34');
INSERT INTO `stock_material` VALUES ('113', '17', '109', '35', '35');
INSERT INTO `stock_material` VALUES ('114', '17', '110', '6', '6');
INSERT INTO `stock_material` VALUES ('115', '17', '201', '7', '7');
INSERT INTO `stock_material` VALUES ('116', '17', '102', '8', '8');
INSERT INTO `stock_material` VALUES ('117', '17', '189', '9', '9');
INSERT INTO `stock_material` VALUES ('118', '17', '108', '5', '5');
INSERT INTO `stock_material` VALUES ('119', '17', '97', '6', '6');
INSERT INTO `stock_material` VALUES ('120', '17', '98', '9', '9');
INSERT INTO `stock_material` VALUES ('161', '18', '103', '1', '1');
INSERT INTO `stock_material` VALUES ('162', '18', '104', '2', '2');
INSERT INTO `stock_material` VALUES ('163', '18', '92', '3', '3');
INSERT INTO `stock_material` VALUES ('164', '18', '93', '4', '4');
INSERT INTO `stock_material` VALUES ('165', '18', '109', '5', '5');
INSERT INTO `stock_material` VALUES ('166', '18', '110', '6', '6');
INSERT INTO `stock_material` VALUES ('167', '18', '201', '7', '7');
INSERT INTO `stock_material` VALUES ('168', '18', '102', '8', '8');
INSERT INTO `stock_material` VALUES ('169', '18', '189', '9', '9');
INSERT INTO `stock_material` VALUES ('170', '18', '188', '10', '10');
INSERT INTO `stock_material` VALUES ('178', '5', '103', '1', '1');
INSERT INTO `stock_material` VALUES ('179', '5', '104', '1', '1');
INSERT INTO `stock_material` VALUES ('180', '5', '92', '2', '2');
INSERT INTO `stock_material` VALUES ('194', '20', '61', '3', '3');
INSERT INTO `stock_material` VALUES ('195', '20', '46', '3', '3');
INSERT INTO `stock_material` VALUES ('196', '20', '71', '3', '3');
INSERT INTO `stock_material` VALUES ('197', '20', '75', '2', '2');
INSERT INTO `stock_material` VALUES ('198', '20', '76', '2', '2');
INSERT INTO `stock_material` VALUES ('199', '20', '69', '2', '2');
INSERT INTO `stock_material` VALUES ('200', '20', '103', '3', '3');
INSERT INTO `stock_material` VALUES ('201', '20', '112', '3', '3');
INSERT INTO `stock_material` VALUES ('202', '20', '95', '2', '2');
INSERT INTO `stock_material` VALUES ('203', '20', '107', '2', '2');
INSERT INTO `stock_material` VALUES ('204', '20', '100', '2', '2');
INSERT INTO `stock_material` VALUES ('205', '20', '99', '2', '2');
INSERT INTO `stock_material` VALUES ('206', '20', '108', '2', '2');
INSERT INTO `stock_material` VALUES ('207', '19', '126', '1', '1');
INSERT INTO `stock_material` VALUES ('208', '19', '124', '2', '2');
INSERT INTO `stock_material` VALUES ('209', '19', '139', '3', '2');
INSERT INTO `stock_material` VALUES ('210', '19', '121', '43', '36');
INSERT INTO `stock_material` VALUES ('211', '19', '120', '2', '2');
INSERT INTO `stock_material` VALUES ('212', '19', '137', '3', '2');
INSERT INTO `stock_material` VALUES ('213', '19', '135', '1', '1');
INSERT INTO `stock_material` VALUES ('214', '6', '61', '1', '1');
INSERT INTO `stock_material` VALUES ('215', '6', '62', '2', '2');
INSERT INTO `stock_material` VALUES ('216', '6', '56', '3', '3');
INSERT INTO `stock_material` VALUES ('217', '6', '199', '4', '3');
INSERT INTO `stock_material` VALUES ('218', '6', '200', '5', '2');
INSERT INTO `stock_material` VALUES ('219', '6', '157', '6', '2');
INSERT INTO `stock_material` VALUES ('241', '21', '61', '1', '1');
INSERT INTO `stock_material` VALUES ('242', '21', '62', '2', '2');
INSERT INTO `stock_material` VALUES ('243', '21', '56', '3', '3');
INSERT INTO `stock_material` VALUES ('244', '21', '41', '4', '4');
INSERT INTO `stock_material` VALUES ('245', '21', '198', '2', '2');
INSERT INTO `stock_material` VALUES ('246', '21', '8', '3', '3');
INSERT INTO `stock_material` VALUES ('247', '21', '3', '4', '4');
INSERT INTO `stock_material` VALUES ('248', '21', '19', '5', '5');
INSERT INTO `stock_material` VALUES ('249', '21', '103', '1', '1');
INSERT INTO `stock_material` VALUES ('250', '21', '104', '3', '3');
INSERT INTO `stock_material` VALUES ('251', '21', '92', '4', '4');
INSERT INTO `stock_material` VALUES ('252', '21', '93', '5', '5');
INSERT INTO `stock_material` VALUES ('253', '21', '126', '1', '1');
INSERT INTO `stock_material` VALUES ('254', '21', '124', '2', '2');
INSERT INTO `stock_material` VALUES ('255', '21', '139', '3', '3');
INSERT INTO `stock_material` VALUES ('256', '21', '121', '4', '4');
INSERT INTO `stock_material` VALUES ('257', '21', '199', '1', '1');
INSERT INTO `stock_material` VALUES ('258', '21', '200', '2', '2');
INSERT INTO `stock_material` VALUES ('259', '21', '157', '3', '3');
INSERT INTO `stock_material` VALUES ('260', '21', '159', '4', '4');
INSERT INTO `stock_material` VALUES ('261', '21', '158', '3', '3');

-- ----------------------------
-- Table structure for `stock_tb_kind_category`
-- ----------------------------
DROP TABLE IF EXISTS `stock_tb_kind_category`;
CREATE TABLE `stock_tb_kind_category` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `kind_category` text COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=46 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of stock_tb_kind_category
-- ----------------------------
INSERT INTO `stock_tb_kind_category` VALUES ('1', 'เครื่องมือประเภทซอง Seal');
INSERT INTO `stock_tb_kind_category` VALUES ('2', 'เครื่องมือประเภท Set / ห่อ');
INSERT INTO `stock_tb_kind_category` VALUES ('3', 'เครื่องมือประเภทสายยาง');
INSERT INTO `stock_tb_kind_category` VALUES ('4', 'เครื่องมือทันตกรรม');
INSERT INTO `stock_tb_kind_category` VALUES ('5', 'รายการผ้างานซักฟอก');

-- ----------------------------
-- Table structure for `stock_tb_kind_type`
-- ----------------------------
DROP TABLE IF EXISTS `stock_tb_kind_type`;
CREATE TABLE `stock_tb_kind_type` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `kind_name` text COLLATE utf8_unicode_ci NOT NULL,
  `kind_category_id` int(11) NOT NULL,
  `unitid` int(11) NOT NULL,
  `status` varchar(3) COLLATE utf8_unicode_ci DEFAULT 'Y',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=205 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of stock_tb_kind_type
-- ----------------------------
INSERT INTO `stock_tb_kind_type` VALUES ('1', 'Set Tracheostony', '2', '2', 'Y');
INSERT INTO `stock_tb_kind_type` VALUES ('2', 'Set ICD', '2', '2', 'Y');
INSERT INTO `stock_tb_kind_type` VALUES ('3', 'Set cutdown', '2', '2', 'Y');
INSERT INTO `stock_tb_kind_type` VALUES ('4', 'Set เจาะปอด', '2', '2', 'Y');
INSERT INTO `stock_tb_kind_type` VALUES ('5', 'Set LP', '2', '2', 'Y');
INSERT INTO `stock_tb_kind_type` VALUES ('6', 'Set PV', '2', '2', 'Y');
INSERT INTO `stock_tb_kind_type` VALUES ('7', 'Set PV OSCC', '2', '2', 'Y');
INSERT INTO `stock_tb_kind_type` VALUES ('8', 'Set curettage', '2', '2', 'Y');
INSERT INTO `stock_tb_kind_type` VALUES ('9', 'Set ใส่ห่วง', '2', '2', 'Y');
INSERT INTO `stock_tb_kind_type` VALUES ('10', 'Set คลอด', '2', '2', 'Y');
INSERT INTO `stock_tb_kind_type` VALUES ('11', 'Set suture', '2', '2', 'Y');
INSERT INTO `stock_tb_kind_type` VALUES ('12', 'Set ขันอาบน้ำ', '2', '2', 'Y');
INSERT INTO `stock_tb_kind_type` VALUES ('13', 'Set scrub', '2', '2', 'Y');
INSERT INTO `stock_tb_kind_type` VALUES ('14', 'Set umbilical', '2', '2', 'Y');
INSERT INTO `stock_tb_kind_type` VALUES ('15', 'กาละมังอาบน้ำ', '2', '2', 'Y');
INSERT INTO `stock_tb_kind_type` VALUES ('16', 'Tray PV', '2', '2', 'Y');
INSERT INTO `stock_tb_kind_type` VALUES ('17', 'Tray ถุงมือ', '2', '2', 'Y');
INSERT INTO `stock_tb_kind_type` VALUES ('18', 'Tray ฉีดยา', '2', '2', 'Y');
INSERT INTO `stock_tb_kind_type` VALUES ('19', 'Set dressing', '2', '2', 'Y');
INSERT INTO `stock_tb_kind_type` VALUES ('20', 'Set สวนปัสสาวะ', '2', '2', 'Y');
INSERT INTO `stock_tb_kind_type` VALUES ('21', 'Set TR', '2', '2', 'Y');
INSERT INTO `stock_tb_kind_type` VALUES ('22', 'Set Excission', '2', '2', 'Y');
INSERT INTO `stock_tb_kind_type` VALUES ('23', 'Set Serub ใหญ่', '2', '2', 'Y');
INSERT INTO `stock_tb_kind_type` VALUES ('24', 'Set Serub เล็ก', '2', '2', 'Y');
INSERT INTO `stock_tb_kind_type` VALUES ('25', 'Set เสื้อกาวน์ใน', '2', '2', 'Y');
INSERT INTO `stock_tb_kind_type` VALUES ('26', 'Set เสื้อกาวน์นอก', '2', '2', 'Y');
INSERT INTO `stock_tb_kind_type` VALUES ('27', 'Set small sheet', '2', '2', 'Y');
INSERT INTO `stock_tb_kind_type` VALUES ('28', 'Set large sheet', '2', '2', 'Y');
INSERT INTO `stock_tb_kind_type` VALUES ('29', 'ถุงมือ เบอร์ 7', '2', '13', 'N');
INSERT INTO `stock_tb_kind_type` VALUES ('30', 'ถุงมือเบอร์ 6 ครึ่ง', '2', '13', 'N');
INSERT INTO `stock_tb_kind_type` VALUES ('32', 'ก๊อส 5 แผ่น', '2', '9', 'Y');
INSERT INTO `stock_tb_kind_type` VALUES ('33', 'ไม้พันสำลี เบอร์ S', '2', '9', 'Y');
INSERT INTO `stock_tb_kind_type` VALUES ('34', 'ไม้พันสำลี เบอร์ M', '2', '9', 'Y');
INSERT INTO `stock_tb_kind_type` VALUES ('35', 'ไม้พันสำลี เบอร์ L', '2', '9', 'Y');
INSERT INTO `stock_tb_kind_type` VALUES ('36', 'สำลี flush', '2', '9', 'Y');
INSERT INTO `stock_tb_kind_type` VALUES ('37', 'ขวด ICD', '2', '9', 'Y');
INSERT INTO `stock_tb_kind_type` VALUES ('38', 'ขวด sterile', '2', '9', 'Y');
INSERT INTO `stock_tb_kind_type` VALUES ('39', 'Artery เล็กตรง', '1', '12', 'Y');
INSERT INTO `stock_tb_kind_type` VALUES ('40', 'Artery เล็กโค้ง', '1', '12', 'Y');
INSERT INTO `stock_tb_kind_type` VALUES ('41', 'Artery กลางตรง', '1', '12', 'Y');
INSERT INTO `stock_tb_kind_type` VALUES ('42', 'Artery กลางโค้ง', '1', '12', 'Y');
INSERT INTO `stock_tb_kind_type` VALUES ('43', 'Artery ใหญ่ตรง', '1', '12', 'Y');
INSERT INTO `stock_tb_kind_type` VALUES ('44', 'Artery ใหญ่โค้ง', '1', '12', 'Y');
INSERT INTO `stock_tb_kind_type` VALUES ('45', 'Baum ตรง', '1', '12', 'Y');
INSERT INTO `stock_tb_kind_type` VALUES ('46', 'Baum โค้ง', '1', '12', 'Y');
INSERT INTO `stock_tb_kind_type` VALUES ('47', 'Mayo', '1', '12', 'Y');
INSERT INTO `stock_tb_kind_type` VALUES ('48', 'Holder', '1', '12', 'Y');
INSERT INTO `stock_tb_kind_type` VALUES ('49', 'กรรไกรตัดไหม', '1', '12', 'Y');
INSERT INTO `stock_tb_kind_type` VALUES ('50', 'กรรไกรตัดลวด', '1', '12', 'Y');
INSERT INTO `stock_tb_kind_type` VALUES ('51', 'กรรไกรตัด cord', '1', '12', 'Y');
INSERT INTO `stock_tb_kind_type` VALUES ('52', 'Blade No.3', '1', '12', 'Y');
INSERT INTO `stock_tb_kind_type` VALUES ('53', 'Blade No.4', '1', '12', 'Y');
INSERT INTO `stock_tb_kind_type` VALUES ('54', 'Curette แผล', '1', '12', 'Y');
INSERT INTO `stock_tb_kind_type` VALUES ('55', 'Curette ตา', '1', '12', 'Y');
INSERT INTO `stock_tb_kind_type` VALUES ('56', 'Allis', '1', '12', 'Y');
INSERT INTO `stock_tb_kind_type` VALUES ('57', 'spong', '1', '12', 'Y');
INSERT INTO `stock_tb_kind_type` VALUES ('58', 'Proctroscope', '1', '12', 'Y');
INSERT INTO `stock_tb_kind_type` VALUES ('59', 'Transfer forceps', '1', '12', 'Y');
INSERT INTO `stock_tb_kind_type` VALUES ('60', 'Long forceps', '1', '12', 'Y');
INSERT INTO `stock_tb_kind_type` VALUES ('61', 'Adson มีเขี้ยว', '1', '12', 'Y');
INSERT INTO `stock_tb_kind_type` VALUES ('62', 'Adson ไม่มีเขี้ยว', '1', '12', 'Y');
INSERT INTO `stock_tb_kind_type` VALUES ('63', 'Speculum', '1', '12', 'Y');
INSERT INTO `stock_tb_kind_type` VALUES ('64', 'Speculum (S)', '1', '12', 'Y');
INSERT INTO `stock_tb_kind_type` VALUES ('65', 'ชามรูปไต', '1', '12', 'Y');
INSERT INTO `stock_tb_kind_type` VALUES ('66', 'Jug flush', '1', '12', 'Y');
INSERT INTO `stock_tb_kind_type` VALUES ('67', 'Syringe Irrigate', '1', '12', 'Y');
INSERT INTO `stock_tb_kind_type` VALUES ('68', 'Syringe 50 CC.', '1', '12', 'Y');
INSERT INTO `stock_tb_kind_type` VALUES ('69', 'ไม้กดลิ้น', '1', '12', 'Y');
INSERT INTO `stock_tb_kind_type` VALUES ('70', 'ไม้ Spatula', '1', '12', 'Y');
INSERT INTO `stock_tb_kind_type` VALUES ('71', 'Suction หู', '1', '12', 'Y');
INSERT INTO `stock_tb_kind_type` VALUES ('72', 'Cocodile', '1', '12', 'Y');
INSERT INTO `stock_tb_kind_type` VALUES ('73', 'Probe', '1', '12', 'Y');
INSERT INTO `stock_tb_kind_type` VALUES ('74', 'เข็มเหล็ก', '1', '12', 'Y');
INSERT INTO `stock_tb_kind_type` VALUES ('75', 'เข็ม cutting', '1', '12', 'Y');
INSERT INTO `stock_tb_kind_type` VALUES ('76', 'เข็ม round', '1', '12', 'Y');
INSERT INTO `stock_tb_kind_type` VALUES ('77', 'Silk 0/2 ', '1', '12', 'Y');
INSERT INTO `stock_tb_kind_type` VALUES ('78', 'Silk 0/3', '1', '12', 'Y');
INSERT INTO `stock_tb_kind_type` VALUES ('81', 'สำลี 10 ก้อน', '1', '10', 'Y');
INSERT INTO `stock_tb_kind_type` VALUES ('80', 'สำลี 20 ก้อน', '1', '10', 'Y');
INSERT INTO `stock_tb_kind_type` VALUES ('83', 'Top Gauze', '1', '10', 'Y');
INSERT INTO `stock_tb_kind_type` VALUES ('84', 'Gauze drain', '1', '10', 'Y');
INSERT INTO `stock_tb_kind_type` VALUES ('31', '', '2', '0', 'Y');
INSERT INTO `stock_tb_kind_type` VALUES ('85', 'Gauze IV', '1', '10', 'Y');
INSERT INTO `stock_tb_kind_type` VALUES ('86', 'ชุดทำแผล', '1', '10', 'Y');
INSERT INTO `stock_tb_kind_type` VALUES ('87', 'Guide wire L', '1', '3', 'Y');
INSERT INTO `stock_tb_kind_type` VALUES ('88', 'Guide wire M', '1', '3', 'Y');
INSERT INTO `stock_tb_kind_type` VALUES ('89', 'Guide wire S', '1', '3', 'Y');
INSERT INTO `stock_tb_kind_type` VALUES ('90', 'ชุด  Ambu - bag ผู้ใหญ่', '3', '1', 'Y');
INSERT INTO `stock_tb_kind_type` VALUES ('91', 'ชุด  Ambu - bag เด็ก', '3', '1', 'Y');
INSERT INTO `stock_tb_kind_type` VALUES ('92', 'Mask Ambu ผู้ใหญ่', '3', '1', 'Y');
INSERT INTO `stock_tb_kind_type` VALUES ('93', 'Mask Ambu เด็ก', '3', '1', 'Y');
INSERT INTO `stock_tb_kind_type` VALUES ('94', 'ชุดพ่นยาผู้ใหญ่', '3', '1', 'Y');
INSERT INTO `stock_tb_kind_type` VALUES ('95', 'ชุดพ่นยาเด็ก', '3', '1', 'Y');
INSERT INTO `stock_tb_kind_type` VALUES ('96', 'สาย Canular', '3', '1', 'Y');
INSERT INTO `stock_tb_kind_type` VALUES ('97', 'ออกซิเจน Mask with bag ผู้ใหญ่', '3', '1', 'Y');
INSERT INTO `stock_tb_kind_type` VALUES ('98', 'ออกซิเจน Mask with bag เด็ก', '3', '1', 'Y');
INSERT INTO `stock_tb_kind_type` VALUES ('99', 'สายต่อออกซิเจน', '3', '1', 'Y');
INSERT INTO `stock_tb_kind_type` VALUES ('100', 'สายต่อ Suction', '3', '1', 'Y');
INSERT INTO `stock_tb_kind_type` VALUES ('101', 'จุก ICD', '3', '1', 'Y');
INSERT INTO `stock_tb_kind_type` VALUES ('102', 'กระเปาะออกซิเจนแบบปีก', '3', '1', 'Y');
INSERT INTO `stock_tb_kind_type` VALUES ('103', 'Air way ผู้ใหญ่', '3', '3', 'Y');
INSERT INTO `stock_tb_kind_type` VALUES ('104', 'Air way เด็ก', '3', '3', 'Y');
INSERT INTO `stock_tb_kind_type` VALUES ('105', 'ข้อต่อ Sution', '3', '3', 'Y');
INSERT INTO `stock_tb_kind_type` VALUES ('106', 'ลูกสูบยางแดง', '3', '3', 'Y');
INSERT INTO `stock_tb_kind_type` VALUES ('107', 'สาย Cath แดง', '3', '3', 'Y');
INSERT INTO `stock_tb_kind_type` VALUES ('108', 'หัวปั๊ม', '3', '3', 'Y');
INSERT INTO `stock_tb_kind_type` VALUES ('109', 'mouth pirce', '3', '3', 'Y');
INSERT INTO `stock_tb_kind_type` VALUES ('110', 'Peak Flow', '3', '3', 'Y');
INSERT INTO `stock_tb_kind_type` VALUES ('111', 'ขวด waterless ใหญ่', '3', '3', 'Y');
INSERT INTO `stock_tb_kind_type` VALUES ('112', 'ขวด waterless เล็ก', '3', '3', 'Y');
INSERT INTO `stock_tb_kind_type` VALUES ('113', 'ชุดสวนปัสสาวะคุณมณีรัตน์', '3', '1', 'Y');
INSERT INTO `stock_tb_kind_type` VALUES ('114', 'ชุดถอน', '4', '1', 'Y');
INSERT INTO `stock_tb_kind_type` VALUES ('115', 'ชุดตรวจ', '4', '1', 'Y');
INSERT INTO `stock_tb_kind_type` VALUES ('116', 'ชุดอุด', '4', '1', 'Y');
INSERT INTO `stock_tb_kind_type` VALUES ('117', 'ชุดผ่าฟันคุด', '4', '1', 'Y');
INSERT INTO `stock_tb_kind_type` VALUES ('118', 'ชุดอุด RCT', '4', '1', 'Y');
INSERT INTO `stock_tb_kind_type` VALUES ('119', 'แยกเหงือก', '4', '3', 'Y');
INSERT INTO `stock_tb_kind_type` VALUES ('120', 'Instrument', '4', '3', 'Y');
INSERT INTO `stock_tb_kind_type` VALUES ('121', 'Dycal', '4', '3', 'Y');
INSERT INTO `stock_tb_kind_type` VALUES ('122', 'Tofflemire', '4', '3', 'Y');
INSERT INTO `stock_tb_kind_type` VALUES ('123', 'Tray พิมพ์ปาก', '4', '3', 'Y');
INSERT INTO `stock_tb_kind_type` VALUES ('124', 'Crown worn', '4', '3', 'Y');
INSERT INTO `stock_tb_kind_type` VALUES ('125', 'Roottip', '4', '3', 'Y');
INSERT INTO `stock_tb_kind_type` VALUES ('126', 'Byonet', '4', '3', 'Y');
INSERT INTO `stock_tb_kind_type` VALUES ('127', 'Suction', '4', '3', 'Y');
INSERT INTO `stock_tb_kind_type` VALUES ('128', 'Spatular', '4', '3', 'Y');
INSERT INTO `stock_tb_kind_type` VALUES ('129', 'Sickle', '4', '3', 'Y');
INSERT INTO `stock_tb_kind_type` VALUES ('130', 'สามขา', '4', '3', 'Y');
INSERT INTO `stock_tb_kind_type` VALUES ('131', 'จับรากฟัน', '4', '3', 'Y');
INSERT INTO `stock_tb_kind_type` VALUES ('132', 'Rounger', '4', '3', 'Y');
INSERT INTO `stock_tb_kind_type` VALUES ('133', 'Speader', '4', '3', 'Y');
INSERT INTO `stock_tb_kind_type` VALUES ('134', 'หัว P10', '4', '3', 'Y');
INSERT INTO `stock_tb_kind_type` VALUES ('135', 'Mouth gag ', '4', '3', 'Y');
INSERT INTO `stock_tb_kind_type` VALUES ('136', 'นิ้วเหล็ก', '4', '3', 'Y');
INSERT INTO `stock_tb_kind_type` VALUES ('137', 'Ivory', '4', '3', 'Y');
INSERT INTO `stock_tb_kind_type` VALUES ('138', 'Ruler', '4', '3', 'Y');
INSERT INTO `stock_tb_kind_type` VALUES ('139', 'curettages', '4', '3', 'Y');
INSERT INTO `stock_tb_kind_type` VALUES ('140', 'Mouth PoP', '4', '3', 'Y');
INSERT INTO `stock_tb_kind_type` VALUES ('141', 'หัวกรอฟัน', '4', '3', 'Y');
INSERT INTO `stock_tb_kind_type` VALUES ('142', 'หัวเบอร์', '4', '3', 'Y');
INSERT INTO `stock_tb_kind_type` VALUES ('143', 'หม้อก๊อส', '4', '4', 'Y');
INSERT INTO `stock_tb_kind_type` VALUES ('144', 'แก้วน้ำ', '4', '11', 'Y');
INSERT INTO `stock_tb_kind_type` VALUES ('145', 'ผ้าปูสีขาว', '5', '7', 'Y');
INSERT INTO `stock_tb_kind_type` VALUES ('146', 'ผ้าปูสีเขียว', '5', '7', 'Y');
INSERT INTO `stock_tb_kind_type` VALUES ('147', 'ผ้าปูสีฟ้า', '5', '7', 'Y');
INSERT INTO `stock_tb_kind_type` VALUES ('148', 'ผ้าปูสีชมพู', '5', '7', 'Y');
INSERT INTO `stock_tb_kind_type` VALUES ('149', 'ผ้าห่ม', '5', '7', 'Y');
INSERT INTO `stock_tb_kind_type` VALUES ('150', 'เสื้อผู้ใหญ่สีขาว', '5', '12', 'Y');
INSERT INTO `stock_tb_kind_type` VALUES ('151', 'เสื้อผู้ใหญ่สีเขียว', '5', '12', 'Y');
INSERT INTO `stock_tb_kind_type` VALUES ('152', 'เสื้อผู้ใหญ่สีฟ้า', '5', '12', 'Y');
INSERT INTO `stock_tb_kind_type` VALUES ('153', 'เสื้อผู้ใหญ่สีชมพู', '5', '12', 'Y');
INSERT INTO `stock_tb_kind_type` VALUES ('154', 'เสื้อเด็กสีขาว', '5', '12', 'Y');
INSERT INTO `stock_tb_kind_type` VALUES ('155', 'เสื้อเด็กสีฟ้า', '5', '12', 'Y');
INSERT INTO `stock_tb_kind_type` VALUES ('180', 'ผ้าสี่เหลี่ยมเจาะกลาง', '1', '10', 'Y');
INSERT INTO `stock_tb_kind_type` VALUES ('157', 'กางเกงผู้ใหญ่สีขาว', '5', '12', 'Y');
INSERT INTO `stock_tb_kind_type` VALUES ('158', 'กางเกงผู้ใหญ่สีฟ้า', '5', '12', 'Y');
INSERT INTO `stock_tb_kind_type` VALUES ('159', 'กางเกงผู้ใหญ่สีชมพู', '5', '12', 'Y');
INSERT INTO `stock_tb_kind_type` VALUES ('160', 'กางเกงเด็กสีฟ้า', '5', '12', 'Y');
INSERT INTO `stock_tb_kind_type` VALUES ('161', 'ผ้าถุงผู้ใหญ่สีขาว', '5', '7', 'Y');
INSERT INTO `stock_tb_kind_type` VALUES ('162', 'ผ้าถุงผู้ใหญ่สีเขียว', '5', '7', 'Y');
INSERT INTO `stock_tb_kind_type` VALUES ('163', 'ผ้าถุงผู้ใหญ่สีฟ้า', '5', '7', 'Y');
INSERT INTO `stock_tb_kind_type` VALUES ('164', 'ผ้าถุงผู้ใหญ่ สีชมพู', '5', '7', 'Y');
INSERT INTO `stock_tb_kind_type` VALUES ('165', 'ปลอกหมอนสีขาว', '5', '7', 'Y');
INSERT INTO `stock_tb_kind_type` VALUES ('166', 'ปลอกหมอนสีเขียว', '5', '7', 'Y');
INSERT INTO `stock_tb_kind_type` VALUES ('167', 'ปลอกหมอนสีฟ้า', '5', '7', 'Y');
INSERT INTO `stock_tb_kind_type` VALUES ('168', 'ปลอกหมอนสีชมพู', '5', '7', 'Y');
INSERT INTO `stock_tb_kind_type` VALUES ('169', 'ผ้ายาง', '5', '7', 'Y');
INSERT INTO `stock_tb_kind_type` VALUES ('170', 'ผ้าขวางเตียง', '5', '7', 'Y');
INSERT INTO `stock_tb_kind_type` VALUES ('171', 'ผ้าเช็ดตัวผืนใหญ่', '5', '7', 'Y');
INSERT INTO `stock_tb_kind_type` VALUES ('172', 'ผ้าเช็ดตัวผืนเล็ก', '5', '7', 'Y');
INSERT INTO `stock_tb_kind_type` VALUES ('173', 'ผ้ากั้นเตียง', '5', '7', 'Y');
INSERT INTO `stock_tb_kind_type` VALUES ('174', 'ผ้าห่อ Set มีหาง', '5', '7', 'Y');
INSERT INTO `stock_tb_kind_type` VALUES ('175', 'ผ้าสี่เหลี่ยมเจาะกลาง', '5', '7', 'Y');
INSERT INTO `stock_tb_kind_type` VALUES ('176', 'ผ้าคลุมโต๊ะ', '5', '7', 'Y');
INSERT INTO `stock_tb_kind_type` VALUES ('177', 'Silver Cath', '1', '3', 'Y');
INSERT INTO `stock_tb_kind_type` VALUES ('178', 'Cord ring', '1', '10', 'Y');
INSERT INTO `stock_tb_kind_type` VALUES ('179', 'Tam pon', '1', '10', 'Y');
INSERT INTO `stock_tb_kind_type` VALUES ('181', 'ผ้า sterile', '1', '10', 'Y');
INSERT INTO `stock_tb_kind_type` VALUES ('182', 'เสื้อกราวน์นอก', '5', '12', 'Y');
INSERT INTO `stock_tb_kind_type` VALUES ('183', 'เสื้อกราวน์ใน', '5', '12', 'Y');
INSERT INTO `stock_tb_kind_type` VALUES ('184', 'ถุงใส่ผ้า', '5', '7', 'Y');
INSERT INTO `stock_tb_kind_type` VALUES ('185', 'ผ้าเช็ดมือ', '5', '7', 'Y');
INSERT INTO `stock_tb_kind_type` VALUES ('186', 'ผ้าดันฝุ่น', '5', '7', 'Y');
INSERT INTO `stock_tb_kind_type` VALUES ('187', 'พรมเช็ดเท้า', '5', '7', 'Y');
INSERT INTO `stock_tb_kind_type` VALUES ('188', 'กระเปาะออกซิเจนแบบหลุมใหญ่', '3', '1', 'Y');
INSERT INTO `stock_tb_kind_type` VALUES ('189', 'กระเปาะออกซิเจนแบบหลุมเล็ก', '3', '1', 'Y');
INSERT INTO `stock_tb_kind_type` VALUES ('190', 'ปรอก Mayo', '5', '7', 'Y');
INSERT INTO `stock_tb_kind_type` VALUES ('191', 'ผ้าห่อ Set ไม่มีหาง', '5', '7', 'Y');
INSERT INTO `stock_tb_kind_type` VALUES ('192', 'Retractor', '1', '13', 'Y');
INSERT INTO `stock_tb_kind_type` VALUES ('193', 'หัวจี้', '1', '3', 'Y');
INSERT INTO `stock_tb_kind_type` VALUES ('194', 'ขวด waterless กลาง', '3', '3', 'Y');
INSERT INTO `stock_tb_kind_type` VALUES ('195', 'หัว vac', '2', '3', 'Y');
INSERT INTO `stock_tb_kind_type` VALUES ('196', 'สายต่อ vac (สายสั้น)', '2', '3', 'Y');
INSERT INTO `stock_tb_kind_type` VALUES ('197', 'สายต่อ vac (สายยาว)', '2', '3', 'Y');
INSERT INTO `stock_tb_kind_type` VALUES ('198', 'Adapter', '2', '3', 'Y');
INSERT INTO `stock_tb_kind_type` VALUES ('199', 'Large Sheet', '5', '7', 'Y');
INSERT INTO `stock_tb_kind_type` VALUES ('200', 'Small Sheet', '5', '7', 'Y');
INSERT INTO `stock_tb_kind_type` VALUES ('201', 'Singer Trip', '3', '11', 'Y');
INSERT INTO `stock_tb_kind_type` VALUES ('204', 'ทดสอบ12345', '2', '2', 'N');

-- ----------------------------
-- Table structure for `stock_tb_unit`
-- ----------------------------
DROP TABLE IF EXISTS `stock_tb_unit`;
CREATE TABLE `stock_tb_unit` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `unitname` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=15 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of stock_tb_unit
-- ----------------------------
INSERT INTO `stock_tb_unit` VALUES ('2', 'Set');
INSERT INTO `stock_tb_unit` VALUES ('1', 'ชุด');
INSERT INTO `stock_tb_unit` VALUES ('3', 'ชิ้น');
INSERT INTO `stock_tb_unit` VALUES ('4', 'หม้อ');
INSERT INTO `stock_tb_unit` VALUES ('5', 'แท่ง');
INSERT INTO `stock_tb_unit` VALUES ('6', 'Tray');
INSERT INTO `stock_tb_unit` VALUES ('7', 'ผืน');
INSERT INTO `stock_tb_unit` VALUES ('8', 'เครื่อง');
INSERT INTO `stock_tb_unit` VALUES ('9', 'ห่อ');
INSERT INTO `stock_tb_unit` VALUES ('10', 'ซอง');
INSERT INTO `stock_tb_unit` VALUES ('11', 'อัน');
INSERT INTO `stock_tb_unit` VALUES ('12', 'ตัว');
INSERT INTO `stock_tb_unit` VALUES ('13', 'คู่');

-- ----------------------------
-- Table structure for `tb_department`
-- ----------------------------
DROP TABLE IF EXISTS `tb_department`;
CREATE TABLE `tb_department` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `depcode` varchar(5) CHARACTER SET utf8 NOT NULL,
  `depname` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=15 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of tb_department
-- ----------------------------
INSERT INTO `tb_department` VALUES ('1', 'IT02', 'หน่วยจ่ายกลาง');
INSERT INTO `tb_department` VALUES ('2', 'IT03', 'ห้องคลอด');
INSERT INTO `tb_department` VALUES ('3', 'IT04', 'ตึกผู้ป่วยในหญิง');
INSERT INTO `tb_department` VALUES ('4', 'IT01', 'ตึกผู้ป่วยในชาย');
INSERT INTO `tb_department` VALUES ('5', 'IT05', 'เวชปฎิบัติครอบครัว');
INSERT INTO `tb_department` VALUES ('6', 'IT06', 'ทันตกรรม');
INSERT INTO `tb_department` VALUES ('7', 'IT07', 'OPD');
INSERT INTO `tb_department` VALUES ('8', 'IT08', 'ห้องฉุกเฉิน ER');
INSERT INTO `tb_department` VALUES ('9', 'IT09', 'ห้องผ่าตัด OR');
INSERT INTO `tb_department` VALUES ('10', 'IT10', 'ห้อง LAB');
INSERT INTO `tb_department` VALUES ('11', 'IT11', 'ห้อง NCD');
INSERT INTO `tb_department` VALUES ('12', 'IT12', 'ห้องกายภาพ');
INSERT INTO `tb_department` VALUES ('13', 'IT13', 'ห้อง X-ray');
INSERT INTO `tb_department` VALUES ('14', 'IT14', 'ห้องแพทย์แผนไทย');

-- ----------------------------
-- Table structure for `tb_prefix`
-- ----------------------------
DROP TABLE IF EXISTS `tb_prefix`;
CREATE TABLE `tb_prefix` (
  `id` int(2) NOT NULL AUTO_INCREMENT,
  `prefixnames` text CHARACTER SET utf8 NOT NULL,
  `prefixnamel` text CHARACTER SET utf8 NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of tb_prefix
-- ----------------------------
INSERT INTO `tb_prefix` VALUES ('1', 'นาย', 'นาย');
INSERT INTO `tb_prefix` VALUES ('2', 'น.ส.', 'นางสาว');
INSERT INTO `tb_prefix` VALUES ('3', 'นาง', 'นาง');
INSERT INTO `tb_prefix` VALUES ('4', 'ว่าที่ ร.ต', 'ว่าที่ร้อยตรี');

-- ----------------------------
-- Table structure for `tb_user`
-- ----------------------------
DROP TABLE IF EXISTS `tb_user`;
CREATE TABLE `tb_user` (
  `id` int(20) NOT NULL AUTO_INCREMENT,
  `pname` int(2) NOT NULL,
  `name` text CHARACTER SET utf8 NOT NULL,
  `surname` text CHARACTER SET utf8 NOT NULL,
  `username` varchar(20) CHARACTER SET utf8 NOT NULL,
  `pw` varchar(50) CHARACTER SET utf8 NOT NULL,
  `pwfix` varchar(20) CHARACTER SET utf8 NOT NULL,
  `depcode` varchar(5) CHARACTER SET utf8 NOT NULL,
  `level_user` int(11) NOT NULL,
  `comfirm` varchar(255) CHARACTER SET utf8 NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=34 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of tb_user
-- ----------------------------
INSERT INTO `tb_user` VALUES ('1', '3', 'อุษณีย์', 'ภูคำสอน2', 'ADMIN', '21232f297a57a5a743894a0e4a801fc3', 'admin', 'IT02', '1', 'Y');
INSERT INTO `tb_user` VALUES ('2', '0', 'admin', '', '', 'd41d8cd98f00b204e9800998ecf8427e', '', '', '2', '');
INSERT INTO `tb_user` VALUES ('3', '4', 'su2', 'su 2', 'SU', '81dc9bdb52d04dc20036dbd8313ed055', '1234', 'IT03', '2', 'Y');
INSERT INTO `tb_user` VALUES ('4', '1', 'มา', 'สา', 'MN', '412566367c67448b599d1b7666f8ccfc', 'mn', 'IT02', '1', 'Y');
INSERT INTO `tb_user` VALUES ('5', '1', 'มาลี', 'ลีมา ', 'ER', '818f9c45cfa30eeff277ef38bcbe9910', 'er', 'IT08', '2', 'Y');
INSERT INTO `tb_user` VALUES ('6', '1', 'แอดมิน', 'แอดมิน', 'WORAWIT', '90f2c9c53f66540e67349e0ab83d8cd0', 'p@ssword', 'IT07', '2', 'Y');
INSERT INTO `tb_user` VALUES ('7', '3', 'สิริ', 'สวรรยาพานิช', 'SIRI', '281d64c7d1c18b29465391178b08f7d5', 'siri123', 'IT03', '2', 'Y');
INSERT INTO `tb_user` VALUES ('8', '3', 'นพิศพรรณ', 'ทีบุตร', 'NAPHIT', '81dc9bdb52d04dc20036dbd8313ed055', '1234', 'IT08', '2', 'Y');
INSERT INTO `tb_user` VALUES ('9', '3', 'สุริยา', 'สวัสดิ์ภูมิ', 'NCD', '81dc9bdb52d04dc20036dbd8313ed055', '1234', 'IT11', '2', 'Y');
INSERT INTO `tb_user` VALUES ('10', '2', 'สายสมบัติ', 'เหล่ามูล   ', 'WARD1', 'a0872cc5b5ca4cc25076f3d868e1bdf8', '1308', 'IT01', '2', 'Y');
INSERT INTO `tb_user` VALUES ('11', '2', 'พรรณทิพา', 'หาคำจารย์', 'PANTIPA', 'ec60121762ee70de9e269b1d7ce0861c', '789205132', 'IT04', '2', 'Y');
INSERT INTO `tb_user` VALUES ('12', '1', 'สุปรีดา', 'ปุ่งฆ้อง', 'SUPRIDA', '81dc9bdb52d04dc20036dbd8313ed055', '1234', 'IT06', '2', 'Y');
INSERT INTO `tb_user` VALUES ('13', '1', 'วิสันต์', 'ไชยมาตย์', 'XRAY1', '1f7d6567f0408026520e57e59bfd8710', 'xray2', 'IT13', '2', 'Y');
INSERT INTO `tb_user` VALUES ('14', '3', 'พยอม', 'คำเสนา', 'ANC', 'cb216c111e6b453ba800c2f9422676c4', 'anc0930', 'IT05', '2', 'Y');
INSERT INTO `tb_user` VALUES ('15', '2', 'สุธัญญา', 'สีละวัน', 'SUTHANYA', '25f09e44e51b17fb527fba402bfba5ab', '7975', 'IT14', '2', 'Y');
INSERT INTO `tb_user` VALUES ('16', '2', 'พรพรรณ  ', 'ขันโยธา', 'OR', '84b5827e099a03db934c60c9ca0921cc', 'or122', 'IT09', '2', 'Y');
INSERT INTO `tb_user` VALUES ('17', '2', 'สุรีวัลย์', 'ชัยลิ้นฟ้า', 'LAB1', '6dfd1e5032aed1664b3b3d0ed9fb8bc9', 'labkchosp', 'IT10', '2', 'Y');
INSERT INTO `tb_user` VALUES ('18', '2', 'จิราภรณ์', 'คำตา', 'PT', '7356042981b2309aa7422fac57da9779', 'ptkch', 'IT12', '2', 'Y');
INSERT INTO `tb_user` VALUES ('19', '3', 'วิชุรา', 'งามสมัย', 'VI', '4006450945a27222b58773406101d88c', 'vi1234', 'IT03', '2', 'Y');
INSERT INTO `tb_user` VALUES ('20', '3', 'ลำจวน', 'จิณาบุญ ', 'JUAN', 'c7f626ad40317f4dc7b295c6f04c850d', 'juan1234', 'IT03', '2', 'Y');
INSERT INTO `tb_user` VALUES ('21', '2', 'วรรณรัฐ', 'โคตรโสภา', 'PRIM', '7cb36e23529e4de4c41460940cc85e6e', '6321', 'IT06', '2', 'Y');
INSERT INTO `tb_user` VALUES ('22', '2', 'วิไลภรณ์', 'วิระกา', 'BUMBIM0661', 'a9699f79c9fa998546818d396cb7646e', '0661', 'IT07', '2', 'Y');
INSERT INTO `tb_user` VALUES ('23', '2', 'อรอุมา', 'พรแสนสี', 'UMA', '2255fa23e30e288dc3e5eceb1256dbc8', 'uma1234', 'IT03', '2', 'Y');
INSERT INTO `tb_user` VALUES ('24', '3', 'สังวาลย์', 'จันทร์โฮง', 'MICKY', '696b35cc35e710279b9c2dedc08e22d7', '2502', 'IT01', '2', 'Y');
INSERT INTO `tb_user` VALUES ('25', '2', 'นัทธมล', 'เหล่ามูล', 'NATTAMON', 'e0f7a4d0ef9b84b83b693bbf3feb8e6e', '2233', 'IT04', '2', 'Y');
INSERT INTO `tb_user` VALUES ('26', '3', 'ภาวดี', 'ภูสีน้อย', 'DEEDEE', '653ac11ca60b3e021a8c609c7198acfc', '2234', 'IT04', '2', 'Y');
INSERT INTO `tb_user` VALUES ('27', '2', 'อรทัย', 'รวมรั้ว', 'LR4', '92cc227532d17e56e07902b254dfad10', '92', 'IT03', '2', 'Y');
INSERT INTO `tb_user` VALUES ('28', '2', 'ดารุณี', 'ทบวงศรี', 'AAA', '47bce5c74f589f4867dbd57e9ca9f808', 'aaa', 'IT03', '2', 'Y');
INSERT INTO `tb_user` VALUES ('30', '2', 'สันธนา', 'ไชยหม้อ', 'WARD11', '10b17efa497e09c60a8c7e3df79793ae', 'santhana', 'IT01', '2', 'Y');
INSERT INTO `tb_user` VALUES ('31', '0', 'สันธนา', 'ไชยหม้อ', 'SANTHANA', '10b17efa497e09c60a8c7e3df79793ae', 'santhana', 'IT01', '2', 'Y');
INSERT INTO `tb_user` VALUES ('32', '3', 'kason', 'sukvat', 'TIM', '706f7184b33ee846ad2127e481e4cf67', 'tim1234', 'IT03', '2', 'Y');
INSERT INTO `tb_user` VALUES ('33', '2', 'วรวิทย์', 'มีศุภะ', 'it', '81dc9bdb52d04dc20036dbd8313ed055', '1234', 'IT12', '2', 'Y');

-- ----------------------------
-- Table structure for `tb_user_level`
-- ----------------------------
DROP TABLE IF EXISTS `tb_user_level`;
CREATE TABLE `tb_user_level` (
  `statususer` int(11) NOT NULL AUTO_INCREMENT,
  `statusname` varchar(20) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`statususer`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tb_user_level
-- ----------------------------
INSERT INTO `tb_user_level` VALUES ('1', 'ผู้ดูแลระบบ');
INSERT INTO `tb_user_level` VALUES ('2', 'ผู้ใช้งานทั่วไป');
INSERT INTO `tb_user_level` VALUES ('3', 'ช่างซ่อมฯ');
