/*
Navicat MySQL Data Transfer

Source Server         : Local
Source Server Version : 50525
Source Host           : 127.0.0.1:3306
Source Database       : risk

Target Server Type    : MYSQL
Target Server Version : 50525
File Encoding         : 65001

Date: 2016-06-17 09:20:31
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `risk_user`
-- ----------------------------
DROP TABLE IF EXISTS `risk_user`;
CREATE TABLE `risk_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `level_user_id` int(11) NOT NULL,
  `pname` varchar(255) NOT NULL,
  `fname` varchar(255) NOT NULL,
  `lname` varchar(255) NOT NULL,
  `depcode` varchar(3) NOT NULL,
  `sub_depcode` varchar(3) NOT NULL,
  `comfirm` varchar(5) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of risk_user
-- ----------------------------
INSERT INTO `risk_user` VALUES ('5', 'user_a', 'e10adc3949ba59abbe56e057f20f883e', '1', '2', 'user_a', 'user_a', '009', '', 'Y');
INSERT INTO `risk_user` VALUES ('6', 'superadmin', 'e10adc3949ba59abbe56e057f20f883e', '3', '1', 'วรวิทย์', 'มีศุภะ', '015', '', 'Y');
INSERT INTO `risk_user` VALUES ('4', 'admin', '21232f297a57a5a743894a0e4a801fc3', '2', '3', 'admin', 'admin', '016', '', 'Y');
INSERT INTO `risk_user` VALUES ('3', 'user_c', 'e10adc3949ba59abbe56e057f20f883e', '1', '2', 'user_c', 'user_c', '017', '', 'Y');
INSERT INTO `risk_user` VALUES ('7', 'user_b', 'e10adc3949ba59abbe56e057f20f883e', '1', '2', 'user_b', 'user_b', '013', '', 'Y');
INSERT INTO `risk_user` VALUES ('8', 'user_se', '827ccb0eea8a706c4c34a16891f84e7b', '4', '2', 'senior', 'senior', '009', '', 'Y');
INSERT INTO `risk_user` VALUES ('9', 'user_se_b', 'e10adc3949ba59abbe56e057f20f883e', '4', '2', 'user_se_b', 'user_se_b', '013', '', 'Y');
INSERT INTO `risk_user` VALUES ('10', 'zzzzzzzzzzzz', '6563713a3a77b3f91345eac32e9b2f78', '1', '2', 'cccc', 'fscdca', '017', '', 'Y');
INSERT INTO `risk_user` VALUES ('11', 'it', 'e10adc3949ba59abbe56e057f20f883e', '4', '2', 'วรวิทย์', 'มีสุภะ', '018', '016', 'Y');
INSERT INTO `risk_user` VALUES ('12', 'opd', 'b9498a1fc311c88af062701a837859a5', '4', '1', 'opd', 'opd', '001', '', 'Y');
