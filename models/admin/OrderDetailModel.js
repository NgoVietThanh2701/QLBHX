import { DataTypes } from "sequelize";
import {connect} from "../../config/Database";
import dotenv from 'dotenv';
import { Order } from "./OrderModel";
import { Product } from "./ProductModel";
dotenv.config();

export const OrderDetail = (port = process.env.PORT_DEFAULT) => {
    let OrderDetail = connect(port).define('OrderDetail', {
        orderID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
               notEmpty: true,
            }
         },
        productID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
               notEmpty: true,
            }
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
               notEmpty: true,
            }
        },
        total_price: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
               notEmpty: true,
            }
        },
        classify: {
            type: DataTypes.STRING,
            defaultValue: ""
        },
    }, {
        freezeTableName: true,
        hasTrigger: true
    });

    OrderDetail.belongsTo(Product(port), {foreignKey: 'productID'});
    OrderDetail.belongsTo(Order(port), {foreignKey: 'orderID'});
    return OrderDetail;
}

// (async() => {
//     await OrderDetail().sync();
// })();



