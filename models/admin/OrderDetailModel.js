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

    }, {
        freezeTableName: true,
    });
    return OrderDetail;
}

Product().hasMany(OrderDetail());
OrderDetail().belongsTo(Product(), {foreignKey: 'productID'});

Order().hasMany(OrderDetail());
OrderDetail().belongsTo(Order(), {foreignKey: 'orderID'});

// (async() => {
//     await OrderDetail().sync();
// })();



