import { DataTypes } from "sequelize";
import db from "../../db";

// Define schema
const MenuModel = db.define(
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
      allowNull: false,
      validate: {
        notEmpty: true,
      },
      defaultValue: "",
      comment: "路由路径",
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
      defaultValue: "",
      comment: "路由名称",
    },
    component: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
      defaultValue: "Layout",
      comment: "路由组件",
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
      defaultValue: "",
      comment: "meat.title--菜单标题",
    },
    icon: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
      defaultValue: "",
      comment: "meat.icon--菜单图标",
    },
    hideMenu: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
      defaultValue: 0,
      comment: "meat.hideMenu--是否隐藏菜单",
    },
    activeMenu: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
      defaultValue: "",
      comment: "meat.activeMenu--活跃菜单",
    },
    status: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
      comment: "开启状态  1开启 0关闭",
    },
  },
  {
    timestamps: false,
  },
);

// Export model Product
export default MenuModel;
