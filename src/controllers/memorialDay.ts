import { Request, Response, NextFunction } from "express";
import { CODE_SUCCESS } from "../utils/constant";
import MemorialDayModel from "../models/memorialDays";
import { Op } from "sequelize";

export default class MemorialDayController {
  public static async info(req: Request, res: Response, next: NextFunction) {
    try {
      const item = await MemorialDayModel.findAll({
        where: {
          id: req.query.id,
        },
      });
      if (!item[0]) {
        next(new Error("不存在"));
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
    const content = req.query.content;
    if (content) {
      params.content = {
        [Op.like]: `%${content}%`,
      };
    }
    try {
      const count = await MemorialDayModel.count({ where: params });
      const list = await MemorialDayModel.findAll({
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
      await MemorialDayModel.create(req.body);
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
      await MemorialDayModel.update(req.body, {
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
      await MemorialDayModel.update(
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
