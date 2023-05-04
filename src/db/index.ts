import { Sequelize } from "sequelize";
import config from "../config";

const db = new Sequelize(config.db_name, config.db_account, config.db_password, {
  host: config.db_host, //数据库地址,默认本机
  port: 3306, //端口，默认3306
  dialect: "mysql", //数据库类型
  pool: {
    //连接池设置
    max: 5, //最大连接数
    min: 0, //最小连接数
    idle: 10000,
  },
});

export default db;
