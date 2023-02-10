import express, { Request, Response, NextFunction } from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import moment from "moment";
import { CODE_SUCCESS } from "../../utils/constant";

const router = express.Router();

// 上传文件存放根目录
const uploadDir = path.join(__dirname, `../../public/upload`);
// 获取当前年份存放路径
const year = moment().format("YYYY");
const dir = `${uploadDir}/${year}`;

const storage = multer.diskStorage({
  // 文件保存目录
  destination: function (req, file, cb) {
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

router.post(
  "/upload",
  upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    res.json({
      code: CODE_SUCCESS,
      msg: "success",
      data: `/upload/${year}/${req.file.filename}`,
    });
    // req.file 是 `file` 文件的信息
    // req.body 将具有文本域数据，如果存在的话
  }
);

export default router;
