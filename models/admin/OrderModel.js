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
        totalMoney: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
               notEmpty: true,
            }
        },
        costShip: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: true
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
        hasTrigger: true
    });
    Order.belongsTo(Customer(port), {foreignKey: 'customerID'});
    Order.belongsTo(Branch(port), {foreignKey: 'codeBranch'});
    return Order;
}

// (async() => {
//     await Order().sync();
// })();



