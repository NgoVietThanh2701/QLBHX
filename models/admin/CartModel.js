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
        classify: {
            type: DataTypes.STRING,
            defaultValue: ""
        },
        status: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        }
    }, {
        freezeTableName: true,
        hasTrigger: true
    });

    Cart.belongsTo(Product(port), {foreignKey: 'productID'});
    Cart.belongsTo(Customer(port), {foreignKey: 'customerID'});

    return Cart;
}

// (async() => {
//     await Cart().sync();
// })();



