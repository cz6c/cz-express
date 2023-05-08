import { Request, Response, NextFunction } from "express";
import { getToken, encode, resultSuccess, resultPageSuccess } from "../utils/result";
import userModel from "../models/user";
import { Op } from "sequelize";
import { validationResult } from "express-validator";

export default class userController {
  public static async info(req: Request, res: Response, next: NextFunction) {
    const token = getToken(req);
    const jwtPayload = encode(token);
    try {
      const item = await userModel.findAll({
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
    } catch (err: any) {
      console.log(err);
      next(new Error(err));
    }
  }

  public static async list(req: Request, res: Response, next: NextFunction) {
    // 查询参数处理
    let params: any = { isDel: 1 };
    const username = req.query.username;
    if (username) {
      params.username = {
        [Op.like]: `%${username}%`,
      };
    }
    try {
      const total = await userModel.count({ where: params });
      const list = await userModel.findAll({
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
    } catch (err: any) {
      console.log(err);
      next(new Error(err));
    }
  }

  public static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        next(new Error(errors.array()[0]?.msg));
        return;
      }
      await userModel.create(req.body);
      res.json(resultSuccess(null));
    } catch (err: any) {
      console.log(err);
      next(new Error(err));
    }
  }

  public static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        next(new Error(errors.array()[0]?.msg));
        return;
      }
      const token = getToken(req);
      const jwtPayload = encode(token);
      await userModel.update(req.body, {
        where: {
          id: jwtPayload.id,
        },
        fields: ["deptId", "roleId", "username", "password", "avatar"],
      });
      res.json(resultSuccess(null));
    } catch (err: any) {
      console.log(err);
      next(new Error(err));
    }
  }

  public static async status(req: Request, res: Response, next: NextFunction) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        next(new Error(errors.array()[0]?.msg));
        return;
      }
      await userModel.update(req.body, {
        where: {
          id: req.body.id,
        },
        fields: ["status"],
      });
      res.json(resultSuccess(null));
    } catch (err: any) {
      console.log(err);
      next(new Error(err));
    }
  }

  public static async destroy(req: Request, res: Response, next: NextFunction) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        next(new Error(errors.array()[0]?.msg));
        return;
      }
      await userModel.update(
        { isDel: 0 },
        {
          where: {
            id: req.body.id,
          },
          fields: ["isDel"],
        },
      );
      res.json(resultSuccess(null));
    } catch (err: any) {
      console.log(err);
      next(new Error(err));
    }
  }
}
