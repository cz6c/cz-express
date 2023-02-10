import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import UserModel from "../models/users";
import { PRIVATE_KEY, JWT_EXPIRED, CODE_SUCCESS } from "../utils/constant";

export default class AuthController {
  /**
   *  jwt.sign({ id: username }, 'my_token',{ expiresIn: '6h' }) }
   *  调用 jsonwebtoken 的 sign() 方法来生成token，接收三个参数，
   *  第一个是载荷，用于编码后存储在 token 中的数据，也是验证 token 后可以拿到的数据；
   *  第二个是密钥，自己定义的，验证的时候也是要相同的密钥才能解码；
   *  第三个是options，可以设置 token 的过期时间。
   */
  public static async login(req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { username, password } = req.body;
    const item: any = await UserModel.findAll({
      where: {
        username: username,
      },
    });
    if (!item[0]) {
      next(new Error("用户不存在"));
    } else if (item[0].password === password) {
      res.json({
        code: CODE_SUCCESS,
        msg: "登录成功",
        data: jwt.sign({ id: item[0].id }, PRIVATE_KEY, {
          expiresIn: JWT_EXPIRED,
        }),
      });
    } else {
      next(new Error("密码错误"));
    }
  }
}
