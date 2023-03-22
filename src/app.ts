import express from "express";
import path from "path";
import cors from "cors";
import routes from "./routes/index";
import db from "./db";
import UserModel from "./models/users";
import MapFootprintModel from "./models/mapFootprints";
import MemorialDayModel from "./models/memorialDays";

const app = express();
const port = 9999;

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
  .then(async () => {
    console.log("Connection has been established successfully.");
    // 用户表一对多关联操作
    UserModel.hasMany(MemorialDayModel);
    MemorialDayModel.belongsTo(UserModel);
    UserModel.hasMany(MapFootprintModel);
    MapFootprintModel.belongsTo(UserModel);
    await db.sync({
      // force: true
    });
    console.log("force: true 强制同步");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

const http = require("http");
const https = require("https");
const fs = require("fs");
const options = {
  key: fs.readFileSync(path.join(__dirname, "../9534144_www.cz6hy9.top.key")),
  cert: fs.readFileSync(path.join(__dirname, "../9534144_www.cz6hy9.top.pem")),
};
// 创建服务
const httpsServer = https.createServer(options, app);
const httpServer = http.createServer(app);

httpsServer.listen(9999, () => {
  console.log("Example app listening on port 9999!");
});

httpServer.listen(9998, () => {
  console.log("Example app listening on port 9998!");
});

// app.listen(port, () => {
//   console.log(`Timezones by location application is running on port ${port}.`);
// });
