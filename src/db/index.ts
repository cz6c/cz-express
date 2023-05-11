import { Sequelize } from "sequelize";
import config from "../config";

const db = new Sequelize(config.db_name, config.db_account, config.db_password, {
  host: config.db_host, //数据库地址,默认本机
  port: 3306, //端口，默认3306
  dialect: "mysql", //数据库类型
  timezone: "+08:00",
  pool: {
    //连接池设置
    max: 5, //最大连接数
    min: 0, //最小连接数
    idle: 10000,
  },
  dialectOptions: {
    // 时间格式化，返回字符串
    dateStrings: true,
    typeCast(field: any, next: any) {
      if (field.type === "DATETIME") {
        return field.string();
      }
      return next();
    },
  },
  define: {
    // `timestamps` 字段指定是否将创建 `createdAt` 和 `updatedAt` 字段.
    // 该值默认为 true, 但是当前设定为 false
    // timestamps: false,
    createdAt: "createdTime",
    updatedAt: "updatedTime",
    // 使用自己定义的表名
    freezeTableName: true,
  },
});

export default db;
