import jsonwebtoken from "jsonwebtoken";
import { Request } from "express";
import { PRIVATE_KEY } from "./constant";

// 解析token
export function decode(req: Request) {
  const Authorization = req.get("Authorization");
  const arr = Authorization.split(" ");
  const token = arr[1];
  return jsonwebtoken.verify(token, PRIVATE_KEY);
}
