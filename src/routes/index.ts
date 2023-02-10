import express from "express";
import { CODE_ERROR, CODE_TOKEN_EXPIRED, PRIVATE_KEY } from "../utils/constant";
import { expressjwt } from "express-jwt";
import authRouter from "./modules/auth";
import userRouter from "./modules/user";
import multerRouter from "./modules/multer";
import memorialDayRouter from "./modules/memorialDay";
import mapFootprintRouter from "./modules/mapFootprint";

const router = express.Router();

// 注入jwt认证模块
router.use(
  expressjwt({
    // 设置密钥
    secret: PRIVATE_KEY,
    //algorithms 防止潜在的降级攻击所必需的。⚠️ 不要混合使用对称和非对称（即 HS256/RS256）算法：在没有进一步验证的情况下混合算法可能会导致降级漏洞。
    algorithms: ["HS256"],
    // 设置jwt认证白名单，比如/api/login登录接口不需要拦截
  }).unless({
    path: ["/login"],
  })
);
router.use("/", authRouter);
router.use("/", userRouter);
router.use("/", multerRouter);
router.use("/", memorialDayRouter);
router.use("/", mapFootprintRouter);

// 自定义统一异常处理中间件
router.use((err, req, res, next) => {
  console.log("err===", err);
  res.json({
    code: err.name === "UnauthorizedError" ? CODE_TOKEN_EXPIRED : CODE_ERROR,
    msg: err.message,
  });
});

export default router;
