import { ConstantEnum } from "./constant";
import jsonwebtoken from "jsonwebtoken";
import { Request } from "express";

interface RequestInfo<T> {
  data: T;
  code: Number;
  message: string;
}

/**
 * @description: 处理成功
 * @return {*}
 */
export function resultSuccess<T>(
  data: T,
  {
    code = ConstantEnum.CODE_SUCCESS as number,
    message = "Request Success",
  } = {}
): RequestInfo<T> {
  return {
    data,
    code,
    message,
  };
}

/**
 * @description: 处理失败
 * @return {*}
 */
export function resultError(
  data = null,
  { code = ConstantEnum.CODE_ERROR as Number, message = "Request Error" } = {}
): RequestInfo<unknown> {
  return {
    data,
    code,
    message,
  };
}

/**
 * @description: 处理列表分页
 * @param {number} page
 * @param {number} limit
 * @param {T} list
 * @return {*}
 */
export function resultPageSuccess<T>(
  {
    list,
    page,
    limit,
    total,
  }: { list: T[]; page: number; limit: number; total: number },
  {
    code = ConstantEnum.CODE_SUCCESS as number,
    message = "Request Success",
  } = {}
): RequestInfo<unknown> {
  const offset = (page - 1) * Number(limit);
  const pageData =
    offset + Number(limit) >= list.length
      ? list.slice(offset, list.length)
      : list.slice(offset, offset + Number(limit));
  return {
    ...resultSuccess(
      {
        list: pageData,
        page,
        limit,
        total,
      },
      { code, message }
    ),
  };
}

/**
 * @description: 获取token
 * @param {Request} req
 * @return {*}
 */
export function getToken(req: Request): string | undefined {
  if (req.headers[ConstantEnum.JWT_TOKEN_KEY]) {
    return req.headers[ConstantEnum.JWT_TOKEN_KEY] as string;
  } else if (req.query && req.query.token) {
    return req.query.token as string;
  } else {
    return undefined;
  }
}

/**
 * @description:  解析token
 * @param {string | undefined} token
 * @return {*}
 */
export function encode(token: string | undefined): jsonwebtoken.JwtPayload {
  return jsonwebtoken.verify(
    token as string,
    ConstantEnum.JWT_PRIVATE_KEY
  ) as jsonwebtoken.JwtPayload;
}
