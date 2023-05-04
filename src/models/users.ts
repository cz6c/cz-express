import { DataTypes } from "sequelize";
import db from "../db";

// Define schema
const UserModel = db.define(
  "users",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true, //整数自增
      primaryKey: true, //主键
    },
    username: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
    avatar: {
      type: DataTypes.STRING,
    },
    birthday: {
      type: DataTypes.STRING,
    },
    homeBg: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
  },
  {
    timestamps: false, // 不要默认时间戳
    // Freeze Table Name
    freezeTableName: true,
  },
);

// Export model Product
export default UserModel;
