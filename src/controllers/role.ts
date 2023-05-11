import { Request, Response, NextFunction } from "express";
import { resultSuccess, resultPageSuccess } from "../utils/result";
import roleModel from "../models/role";
import { Op } from "sequelize";
import { validationResult } from "express-validator";

export default class roleController {
  public static async info(req: Request, res: Response, next: NextFunction) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        next(new Error(errors.array()[0]?.msg));
        return;
      }
      const item = await roleModel.findAll({
        where: {
          id: req.query.id,
        },
      });
      if (!item[0]) {
        next(new Error("不存在"));
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
    let params: any = { notDel: 1 };
    const roleName = req.query.roleName;
    if (roleName) {
      params.roleName = {
        [Op.like]: `%${roleName}%`,
      };
    }
    try {
      const total = await roleModel.count({ where: params });
      const list = await roleModel.findAll({
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
      await roleModel.create(req.body);
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
      await roleModel.update(req.body, {
        where: {
          id: req.body.id,
        },
        fields: ["roleName", "menuIds", "remark"],
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
      await roleModel.update(req.body, {
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
      await roleModel.update(
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
