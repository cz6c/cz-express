import express from "express";
import { expressjwt } from "express-jwt";
import { ConstantEnum } from "../utils/constant";
import { getToken, resultError } from "../utils/result";
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
    secret: ConstantEnum.JWT_PRIVATE_KEY as string,
    //algorithms 防止潜在的降级攻击所必需的。⚠️ 不要混合使用对称和非对称（即 HS256/RS256）算法：在没有进一步验证的情况下混合算法可能会导致降级漏洞。
    algorithms: ["HS256"],
    // 自定义获取token方法
    getToken: getToken,
  }).unless({
    // 设置jwt认证白名单，比如/api/login登录接口不需要拦截
    path: ["/admin/login"],
  }),
);
router.use("/admin", authRouter);
router.use("/admin", userRouter);
router.use("/admin", multerRouter);
router.use("/admin", memorialDayRouter);
router.use("/admin", mapFootprintRouter);

// 自定义统一异常处理中间件
router.use((err: { name: string; message: any }, req: any, res: any, next: any) => {
  console.log("err===", err);
  const code: number = err.name === "UnauthorizedError" ? ConstantEnum.CODE_TOKEN_EXPIRED : ConstantEnum.CODE_ERROR;
  res.json(
    resultError(null, {
      code,
      message: err.message,
    }),
  );
});

export default router;
