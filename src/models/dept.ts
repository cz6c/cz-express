import { DataTypes } from "sequelize";
import db from "../db";

// Define schema
const deptModel = db.define(
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
    isDel: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
      comment: "是否删除",
    },
  },
  {},
);

// deptModel
//   .sync({
//     force: true,
//   })
//   .then(() => {
//     console.log("deptModel强制同步-先删表再重新建表");
//   })
//   .catch(err => {
//     console.error("同步失败", err);
//   });

// Export model Product
export default deptModel;
