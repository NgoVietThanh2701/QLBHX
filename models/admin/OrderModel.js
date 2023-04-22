import { DataTypes } from "sequelize";
import {connect} from "../../config/Database";
import dotenv from 'dotenv';
import { Customer } from "./CustomerModel";
dotenv.config();

export const Order = (port = process.env.PORT_DEFAULT) => {
    let Order = connect(port).define('Order', {
        customerID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
               notEmpty: true,
            }
         },
        method: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
               notEmpty: true,
            }
        },
        status: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: false,
            validate: {
               notEmpty: true,
            }
        },
        total: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
               notEmpty: true,
            }
        },
        note: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
               notEmpty: true,
            }
        },
    }, {
        freezeTableName: true,
    });
    return Order;
}


Customer().hasMany(Order());
Order().belongsTo(Customer(), {foreignKey: 'customerID'});

// (async() => {
//     await Order().sync();
// })();



