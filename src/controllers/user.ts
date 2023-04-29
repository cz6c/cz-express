import { Request, Response, NextFunction } from "express";
import {
  getToken,
  encode,
  resultSuccess,
  resultPageSuccess,
} from "../utils/result";
import UserModel from "../models/users";
import { Op } from "sequelize";

export default class userController {
  public static async info(req: Request, res: Response, next: NextFunction) {
    const token = getToken(req);
    const jwtPayload = encode(token);
    try {
      const item = await UserModel.findAll({
        attributes: { exclude: ["password"] }, //过滤掉password字段
        where: {
          id: jwtPayload.id,
        },
      });
      if (!item[0]) {
        next(new Error("用户不存在"));
      } else {
        res.json(resultSuccess(item[0]));
      }
    } catch (err) {
      console.log(err);
      next(new Error(err));
    }
  }

  public static async list(req: Request, res: Response, next: NextFunction) {
    // 查询参数处理
    let params: any = { status: 1 };
    const username = req.query.username;
    if (username) {
      params.username = {
        [Op.like]: `%${username}%`,
      };
    }
    try {
      const total = await UserModel.count({ where: params });
      const list = await UserModel.findAll({
        attributes: { exclude: ["password"] }, //过滤掉password字段
        where: params,
      });
      // 分页参数处理
      const limit = Number(req.query.limit);
      const page = Number(req.query.page);
      if (limit && page) {
        res.json(resultPageSuccess({ list, page, limit, total }));
      } else {
        res.json(resultSuccess({ list, total }));
      }
    } catch (err) {
      console.log(err);
      next(new Error(err));
    }
  }

  public static async create(req: Request, res: Response, next: NextFunction) {
    try {
      await UserModel.create(req.body);
      res.json(resultSuccess(null));
    } catch (err) {
      console.log(err);
      next(new Error(err));
    }
  }

  public static async update(req: Request, res: Response, next: NextFunction) {
    try {
      await UserModel.update(req.body, {
        where: {
          id: req.body.id,
        },
      });
      res.json(resultSuccess(null));
    } catch (err) {
      console.log(err);
      next(new Error(err));
    }
  }

  public static async destroy(req: Request, res: Response, next: NextFunction) {
    try {
      await UserModel.update(
        { status: 2 },
        {
          where: {
            id: req.body.id,
          },
        }
      );
      res.json(resultSuccess(null));
    } catch (err) {
      console.log(err);
      next(new Error(err));
    }
  }
}
