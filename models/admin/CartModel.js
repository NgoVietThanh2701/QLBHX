import { DataTypes } from "sequelize";
import {connect} from "../../config/Database";
import dotenv from 'dotenv';
import { Customer } from "./CustomerModel";
import { Product } from "./ProductModel";
dotenv.config();

export const Cart = (port = process.env.PORT_DEFAULT) => {
    let Cart = connect(port).define('Cart', {
        customerID: {
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
        status: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            validate: {
               notEmpty: true,
            }
        }
    }, {
        freezeTableName: true,
        hasTrigger: true
    });

    return Cart;
}

Product().hasMany(Cart());
Cart().belongsTo(Product(), {foreignKey: 'productID'});

Customer().hasMany(Cart());
Cart().belongsTo(Customer(), {foreignKey: 'customerID'});

// (async() => {
//     await Cart().sync();
// })();



