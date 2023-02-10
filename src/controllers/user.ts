import { Request, Response, NextFunction } from "express";
import { CODE_SUCCESS } from "../utils/constant";
import { decode } from "../utils/auth_jwt";
import UserModel from "../models/users";
import { Op } from "sequelize";

export default class userController {
  public static async info(req: Request, res: Response, next: NextFunction) {
    const jwtPayload: any = decode(req);
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
        res.json({
          code: CODE_SUCCESS,
          msg: "success",
          data: item[0],
        });
      }
    } catch (err) {
      console.log(err);
      next(new Error(err));
    }
  }

  public static async list(req: Request, res: Response, next: NextFunction) {
    // 分页参数处理
    const limit = Number(req.query.limit);
    const page = Number(req.query.page);
    let pageInfo = {};
    if (limit && page) {
      pageInfo = {
        limit,
        offset: (page - 1) * limit,
      };
    }
    // 查询参数处理
    let params: any = { status: 1 };
    const username = req.query.username;
    if (username) {
      params.username = {
        [Op.like]: `%${username}%`,
      };
    }
    try {
      const count = await UserModel.count({ where: params });
      const list = await UserModel.findAll({
        attributes: { exclude: ["password"] }, //过滤掉password字段
        where: params,
        ...pageInfo,
      });
      res.json({
        code: CODE_SUCCESS,
        msg: "success",
        data: {
          list,
          limit,
          page,
          count,
        },
      });
    } catch (err) {
      console.log(err);
      next(new Error(err));
    }
  }

  public static async create(req: Request, res: Response, next: NextFunction) {
    try {
      await UserModel.create(req.body);
      res.json({
        code: CODE_SUCCESS,
        msg: "success",
      });
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
      res.json({
        code: CODE_SUCCESS,
        msg: "success",
      });
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
      res.json({
        code: CODE_SUCCESS,
        msg: "success",
      });
    } catch (err) {
      console.log(err);
      next(new Error(err));
    }
  }
}
