import { DataTypes } from "sequelize";
import db from "../db";

// Define schema
const UserModel = db.define(
  "user",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true, //整数自增
      primaryKey: true, //主键
    },
    roleIds: {
      type: DataTypes.STRING,
      comment: "角色ids",
    },
    deptId: {
      type: DataTypes.STRING,
      comment: "部门id",
    },
    username: {
      type: DataTypes.STRING(20),
      comment: "账号",
    },
    password: {
      type: DataTypes.STRING(20),
      comment: "密码",
    },
    avatar: {
      type: DataTypes.STRING,
      comment: "头像",
    },
    status: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
      comment: "开启状态",
    },
  },
  {},
);

// Export model Product
export default UserModel;
