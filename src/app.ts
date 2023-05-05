import express from "express";
import path from "path";
import cors from "cors";
import routes from "./routes/index";
import db from "./db";
import config from "./config";

const app = express();

// 配置静态资源
app.use(express.static(path.join(__dirname, "./public")));

// 跨域
app.use(cors());

app.use(express.json()); // 解析json数据格式
app.use(express.urlencoded({ extended: true })); // 解析form表单提交的数据application/x-www-form-urlencoded

// 路由
app.use(routes);

// 数据库连接成功处理
db.authenticate()
  .then(() => {
    // const isForce = false;
    // db.sync({
    //   force: isForce,
    // })
    //   .then(() => {
    //     console.log(isForce ? "强制同步-先删表再重新建表" : "同步-尚未在数据库中的模型");
    //   })
    //   .catch(err => {
    //     console.error("同步失败", err);
    //   });
  })
  .catch(err => {
    console.error("连接失败", err);
  });

app.listen(config.port, () => {
  console.log(`Timezones by location application is running on port ${config.port}.`);
});
