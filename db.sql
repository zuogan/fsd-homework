use fsd;

DROP TABLE IF EXISTS `t_company`;
CREATE TABLE `t_company` (
  `id` bigint(20) NOT NULL auto_increment,
  `company_name` varchar(256) NOT NULL,
  `turnover` float DEFAULT NULL,
  `ceo` varchar(256) DEFAULT NULL,
  `board_directors` varchar(256) DEFAULT NULL,
  `sector_id` bigint(20),
  `brief_write_up` varchar(256) DEFAULT NULL,
  `pic_url` varchar(256) DEFAULT NULL
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `t_sector`;
CREATE TABLE `t_sector` (
  `id` bigint(20) NOT NULL auto_increment,
  `sector_name` varchar(256) NOT NULL,
  `brief` varchar(256)
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `t_stock_exchange`;
CREATE TABLE `t_stock_exchange` (
  `id` bigint(20) NOT NULL auto_increment,
  `stock_exchange` varchar(256) NOT NULL,
  `brief` varchar(256),
  `contact_address` varchar(256),
  `remarks` varchar(256)
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `t_company_and_stockexchange`;
CREATE TABLE `t_company_and_stockexchange` (
  `id` bigint(20) NOT NULL auto_increment,
  `company_id` bigint(20) NOT NULL,
  `stock_exchange_id` bigint(20) NOT NULL,
  `company_code` varchar(256) NOT NULL
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `t_stock_price`;
CREATE TABLE `t_stock_price` (
  `id` bigint(20) NOT NULL auto_increment,
  `company_code` varchar(256) NOT NULL,
  `stock_exchange` bigint(20) NOT NULL,
  `current_price` decimal(10,2) NOT NULL DEFAULT 0,
  `price_date` DATE,
  `price_time` TIME
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `t_ipo_detail`;
CREATE TABLE `t_ipo_detail` (
  `id` bigint(20) NOT NULL auto_increment,
  `company_name` varchar(256) NOT NULL,
  `stock_exchange_id` bigint(20) NOT NULL,
  `price_per_share` decimal(10,2) NOT NULL DEFAULT 0,
  `total_shares` bigint(20) NOT NULL DEFAULT 0,
  `open_datetime` DATETIME,
  `remarks` varchar(256)
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `t_user`;
CREATE TABLE `t_user` (
  `id` bigint(20) NOT NULL auto_increment,
  `username` varchar(256) NOT NULL,
  `password` varchar(256) NOT NULL,
  `user_type` varchar(256) NOT NULL,
  `email` varchar(256) NOT NULL,
  `mobile_number` varchar(128) NOT NULL,
  `confirmed` tinyint(1) DEFAULT 0
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
