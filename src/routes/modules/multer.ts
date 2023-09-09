import express, { Request, Response, NextFunction } from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import { resultSuccess } from "../../utils/result";

const router = express.Router();

// 上传文件存放根目录
const uploadDir = path.join(__dirname, `../public/upload`);
let fileDir = "";

const storage = multer.diskStorage({
  // 文件保存目录
  destination: function (req, file, cb) {
    console.log(req.body);
    // 根据接口参数决定存储目录  append额外的参数必须在append文件之前，不然读不到
    switch (req.body.fileType) {
      case "1":
        fileDir = "avatar";
        break;
      case "2":
        fileDir = "homeImg";
        break;
      default:
        fileDir = "default";
        break;
    }
    console.log(fileDir);
    const dir = `${uploadDir}/${fileDir}`;
    // 检查当前路径文件夹是否存在如果不存在则新建文件夹
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
    cb(null, dir);
  },
  // 自定义文件名 随机生成的文件名是没有扩展名的
  filename: function (req, file, cb) {
    const extname = path.extname(file.originalname);
    cb(null, `${Date.now()}${extname}`);
  },
});

const upload = multer({ storage: storage });

router.post("/upload", upload.single("file"), (req: Request, res: Response, next: NextFunction) => {
  console.log(req.body);
  res.json(resultSuccess(`/upload/${fileDir}/${req.file.filename}`));
  // req.file 是 `file` 文件的信息
});

export default router;
