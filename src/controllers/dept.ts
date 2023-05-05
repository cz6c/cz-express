import { Request, Response, NextFunction } from "express";
import { resultSuccess, resultPageSuccess } from "../utils/result";
import DeptModel from "../models/dept";
import { Op } from "sequelize";

export default class DeptController {
  public static async info(req: Request, res: Response, next: NextFunction) {
    try {
      const item = await DeptModel.findAll({
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
    let params: any = { status: 1 };
    const keyword = req.query.keyword;
    if (keyword) {
      params.deptName = {
        [Op.like]: `%${keyword}%`,
      };
    }
    try {
      const total = await DeptModel.count({ where: params });
      const list = await DeptModel.findAll({
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
      await DeptModel.create(req.body);
      res.json(resultSuccess(null));
    } catch (err: any) {
      console.log(err);
      next(new Error(err));
    }
  }

  public static async update(req: Request, res: Response, next: NextFunction) {
    try {
      await DeptModel.update(req.body, {
        where: {
          id: req.body.id,
        },
      });
      res.json(resultSuccess(null));
    } catch (err: any) {
      console.log(err);
      next(new Error(err));
    }
  }

  public static async destroy(req: Request, res: Response, next: NextFunction) {
    try {
      await DeptModel.update(
        { status: 2 },
        {
          where: {
            id: req.body.id,
          },
        },
      );
      res.json(resultSuccess(null));
    } catch (err: any) {
      console.log(err);
      next(new Error(err));
    }
  }
}
