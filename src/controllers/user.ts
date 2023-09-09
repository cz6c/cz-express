import { Request, Response, NextFunction } from "express";
import { getToken, encode, resultSuccess } from "../utils/result";
import { UserModel } from "../models";
import { Op } from "sequelize";
import { validationResult } from "express-validator";

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
    } catch (err: any) {
      console.log(err);
      next(new Error(err));
    }
  }

  public static async list(req: Request, res: Response, next: NextFunction) {
    // 查询参数处理
    let params: Record<string, any> = { notDel: 1 };
    const username = req.query.username;
    if (username) {
      params.username = {
        [Op.like]: `%${username}%`,
      };
    }
    try {
      // 分页参数处理
      const limit = Number(req.query.limit);
      const page = Number(req.query.page);
      const isToPages = limit && page;
      let pageParams = {};
      if (isToPages) {
        const offset = (page - 1) * limit;
        pageParams = { offset, limit };
      }
      const { rows: list, count: total } = await UserModel.findAndCountAll({
        where: params,
        attributes: { exclude: ["password"] }, //过滤掉password字段
        ...pageParams,
      });
      res.json(resultSuccess(isToPages ? { list, page, limit, total } : { list, total }));
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
      await UserModel.create(req.body);
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
      await UserModel.update(req.body, {
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
      await UserModel.update(req.body, {
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
      await UserModel.update(
        { notDel: 0 },
        {
          where: {
            id: req.body.id,
          },
          fields: ["notDel"],
        },
      );
      res.json(resultSuccess(null));
    } catch (err: any) {
      console.log(err);
      next(new Error(err));
    }
  }
}
