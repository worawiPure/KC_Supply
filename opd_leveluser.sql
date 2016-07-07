/*
Navicat MySQL Data Transfer

Source Server         : Local
Source Server Version : 50525
Source Host           : 127.0.0.1:3306
Source Database       : risk

Target Server Type    : MYSQL
Target Server Version : 50525
File Encoding         : 65001

Date: 2016-07-07 18:35:57
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `risk_leveluser`
-- ----------------------------
DROP TABLE IF EXISTS `risk_leveluser`;
CREATE TABLE `risk_leveluser` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `level_user_id` int(11) NOT NULL,
  `level_username` varchar(255) NOT NULL,
  `th_level` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of risk_leveluser
-- ----------------------------
INSERT INTO `risk_leveluser` VALUES ('1', '1', 'user', 'ผู้ใช้งานทั่วไป');
INSERT INTO `risk_leveluser` VALUES ('2', '2', 'admin', 'ผู้ดูแลระบบ');
INSERT INTO `risk_leveluser` VALUES ('3', '3', 'Superadmin', 'ผู้ดูแลระบบ');
INSERT INTO `risk_leveluser` VALUES ('4', '4', 'user_senior', 'หัวหน้า/กรรมการ');
