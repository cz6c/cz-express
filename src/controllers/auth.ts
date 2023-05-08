import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import userModel from "../models/user";
import menuModel from "../models/menu";
import { ConstantEnum } from "../utils/constant";
import { resultSuccess } from "../utils/result";
import { arr2Tree } from "../utils/tree";

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
      next(new Error(errors.array()[0]?.msg));
    }
    const { username, password } = req.body;
    const item: any = await userModel.findAll({
      where: {
        username: username,
      },
    });
    if (!item[0]) {
      next(new Error("用户不存在"));
    } else if (item[0].password === password) {
      res.json(
        resultSuccess(
          jwt.sign({ id: item[0].id }, ConstantEnum.JWT_PRIVATE_KEY, {
            expiresIn: ConstantEnum.JWT_EXPIRED,
          }),
          {},
        ),
      );
    } else {
      next(new Error("密码错误"));
    }
  }

  /**
   * @description: 获取菜单路由
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   * @return {*}
   */
  public static async getMenuList(req: Request, res: Response, next: NextFunction): Promise<any> {
    // 查询参数处理
    let params: any = { status: 1 };
    try {
      const total = await menuModel.count({ where: params });
      let list = await menuModel.findAll({
        where: params,
      });
      list = arr2Tree(JSON.parse(JSON.stringify(list)));
      res.json(resultSuccess({ list, total }));
    } catch (err: any) {
      console.log(err);
      next(new Error(err));
    }
  }
}
