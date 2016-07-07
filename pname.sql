/*
Navicat MySQL Data Transfer

Source Server         : Local
Source Server Version : 50525
Source Host           : 127.0.0.1:3306
Source Database       : risk

Target Server Type    : MYSQL
Target Server Version : 50525
File Encoding         : 65001

Date: 2016-07-07 18:14:17
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `pname`
-- ----------------------------
DROP TABLE IF EXISTS `pname`;
CREATE TABLE `pname` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of pname
-- ----------------------------
INSERT INTO `pname` VALUES ('1', 'นาย');
INSERT INTO `pname` VALUES ('2', 'นางสาว');
INSERT INTO `pname` VALUES ('3', 'นาง');
