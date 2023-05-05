import { DataTypes } from "sequelize";
import db from "../db";

// Define schema
const DeptModel = db.define(
  "dept",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true, //整数自增
      primaryKey: true, //主键
    },
    pid: {
      type: DataTypes.INTEGER,
    },
    deptName: {
      type: DataTypes.STRING,
      comment: "部门名称",
    },
    remark: {
      type: DataTypes.STRING,
      comment: "备注",
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
export default DeptModel;
