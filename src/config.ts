export default {
  port: process.env.NODE_ENV === "production" ? 1026 : 1066, //监听端口号
  db_host: process.env.NODE_ENV === "production" ? "18.166.17.194" : "127.0.0.1", //数据库地址
  db_name: process.env.NODE_ENV === "production" ? "cz_db" : "test_cz_db", //数据库名称
  db_account: process.env.NODE_ENV === "production" ? "cz_db" : "root", //数据库账户
  db_password: process.env.NODE_ENV === "production" ? "123456" : "123456", //数据库密码
};
