/*
Navicat MySQL Data Transfer

Source Server         : Local
Source Server Version : 50525
Source Host           : 127.0.0.1:3306
Source Database       : risk

Target Server Type    : MYSQL
Target Server Version : 50525
File Encoding         : 65001

Date: 2016-07-07 18:14:46
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `department`
-- ----------------------------
DROP TABLE IF EXISTS `department`;
CREATE TABLE `department` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `depname` varchar(50) NOT NULL,
  `depcode` varchar(3) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=20 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of department
-- ----------------------------
INSERT INTO `department` VALUES ('1', 'OPD', '001');
INSERT INTO `department` VALUES ('2', 'ER', '002');
INSERT INTO `department` VALUES ('3', 'LAB', '003');
INSERT INTO `department` VALUES ('4', 'PHARM', '004');
INSERT INTO `department` VALUES ('5', 'DENT', '005');
INSERT INTO `department` VALUES ('6', 'XRAY', '006');
INSERT INTO `department` VALUES ('7', 'OR', '007');
INSERT INTO `department` VALUES ('8', 'LR', '008');
INSERT INTO `department` VALUES ('9', 'NCD', '009');
INSERT INTO `department` VALUES ('10', 'Wardชาย', '010');
INSERT INTO `department` VALUES ('11', 'Wardหญิง', '011');
INSERT INTO `department` VALUES ('12', 'กลุ่มงานเวชฯ', '012');
INSERT INTO `department` VALUES ('13', 'กายภาพ', '013');
INSERT INTO `department` VALUES ('14', 'ห้องบัตร', '014');
INSERT INTO `department` VALUES ('15', 'จ่ายกลาง', '015');
INSERT INTO `department` VALUES ('16', 'ศูนย์ข้อมูลIT', '016');
INSERT INTO `department` VALUES ('17', 'บริหาร', '017');
INSERT INTO `department` VALUES ('18', 'ศูนย์ประกันสุขภาพ', '018');
INSERT INTO `department` VALUES ('19', 'แพทย์แผนไทย', '019');
