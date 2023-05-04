import { DataTypes } from "sequelize";
import db from "../db";

// Define schema
const MapFootprintModel = db.define(
  "map_footprints",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true, //整数自增
      primaryKey: true, //主键
    },
    lon: {
      type: DataTypes.STRING,
    },
    lat: {
      type: DataTypes.STRING,
    },
    title: {
      type: DataTypes.STRING,
    },
    files: {
      type: DataTypes.STRING,
    },
    cover: {
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
    // Freeze Table Name 禁用修改表名; 默认情况下，sequelize将自动将所有传递的模型名称（define的第一个参数）转换为复数
    freezeTableName: true,
  },
);

// Export model Product
export default MapFootprintModel;
