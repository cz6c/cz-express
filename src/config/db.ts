import { Sequelize } from "sequelize";

const db = new Sequelize("sequelize_db", "root", "123456", {
  host: "127.0.0.1", //数据库地址,默认本机
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
