import { DataTypes } from "sequelize";
import db from "../../db";

// Define schema
const UserModel = db.define(
  "user",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true, //整数自增
      primaryKey: true, //主键
    },
    roleId: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
      defaultValue: "",
      comment: "角色id",
    },
    username: {
      type: DataTypes.STRING(20),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
      defaultValue: "",
      comment: "账号",
    },
    password: {
      type: DataTypes.STRING(20),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
      defaultValue: "",
      comment: "密码",
    },
    avatar: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
      defaultValue: "",
      comment: "头像",
    },
    status: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
      comment: "开启状态  1开启 0关闭",
    },
    notDel: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
      comment: "是否删除  1未删除 0删除",
    },
  },
  {},
);

// Export model Product
export default UserModel;
