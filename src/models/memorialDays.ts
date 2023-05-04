import { DataTypes } from "sequelize";
import db from "../db";

// Define schema
const MemorialDayModel = db.define(
  "memorial_days",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true, //整数自增
      primaryKey: true, //主键
    },
    title: {
      type: DataTypes.STRING,
    },
    eventTime: {
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
export default MemorialDayModel;
