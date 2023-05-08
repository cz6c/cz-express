import { DataTypes } from "sequelize";
import db from "../db";

// Define schema
const menuModel = db.define(
  "menu",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true, //整数自增
      primaryKey: true, //主键
    },
    pid: {
      type: DataTypes.INTEGER,
      comment: "路由pid",
    },
    path: {
      type: DataTypes.STRING,
      comment: "路由路径",
    },
    name: {
      type: DataTypes.STRING,
      comment: "路由名称",
    },
    component: {
      type: DataTypes.STRING,
      comment: "路由组件",
    },
    redirect: {
      type: DataTypes.STRING,
      comment: "路由重定向路径",
    },
    title: {
      type: DataTypes.STRING,
      comment: "meat.title--菜单标题",
    },
    icon: {
      type: DataTypes.STRING,
      comment: "meat.icon--菜单图标",
    },
    hideMenu: {
      type: DataTypes.STRING,
      comment: "meat.hideMenu--是否显示菜单",
    },
    activeMenu: {
      type: DataTypes.STRING,
      comment: "meat.activeMenu--活跃菜单",
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
export default menuModel;
