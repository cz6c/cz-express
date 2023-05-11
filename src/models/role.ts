import { DataTypes } from "sequelize";
import db from "../db";

// Define schema
const roleModel = db.define(
  "role",
  {
    id: {
      type: DataTypes.INTEGER(),
      autoIncrement: true, //整数自增
      primaryKey: true, //主键
    },
    roleName: {
      type: DataTypes.STRING(20),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
      defaultValue: "",
      comment: "角色名称",
    },
    remark: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
      defaultValue: "",
      comment: "备注",
    },
    menuIds: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
      defaultValue: "",
      comment: "菜单id数组",
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

// roleModel
//   .sync({
//     force: true,
//   })
//   .then(() => {
//     console.log("roleModel强制同步-先删表再重新建表");
//   })
//   .catch(err => {
//     console.error("同步失败", err);
//   });

// Export model Product
export default roleModel;
