import { DataTypes } from "sequelize";
import {connect} from "../../config/Database";
import dotenv from 'dotenv';
import { Customer } from "./CustomerModel";
import { Branch } from "./BranchModel";
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
        codeBranch: {
            type: DataTypes.STRING,
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
Branch().hasMany(Order());
Order().belongsTo(Branch(), {foreignKey: 'codeBranch'});

// (async() => {
//     await Order().sync();
// })();



