import { DataTypes } from "sequelize";
import {connect} from "../../config/Database";
import dotenv from 'dotenv';
import { Product } from "./ProductModel";
dotenv.config();

export const PhotoProduct = (port = process.env.PORT_DEFAULT) => {
    let PhotoProduct = connect(port).define('PhotoProduct', {
        productID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
               notEmpty: true,
            }
        },
        fileName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
               notEmpty: true,
            }
        },
        url: {
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
    return PhotoProduct;
}

// (async() => {
//     await PhotoProduct().sync();
// })();



