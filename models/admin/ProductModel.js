import { Sequelize } from "sequelize";
import {connect} from "../../config/Database";
import { Warehouse } from "./WarehouseModel";
import { Type } from "./TypeModel";
import dotenv from 'dotenv';
dotenv.config();

const {DataTypes} = Sequelize;

export const Product = (port = process.env.PORT_DEFAULT) => {
    let Product = connect(port).define('Product', {
        codeProduct: {
            type: DataTypes.STRING,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        name: {
            type: DataTypes.STRING(70),
            allowNull: false,
            validate: {
               notEmpty: true,
            }
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            }
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
               notEmpty: true,
            }
        },
        properties: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
               notEmpty: true,
            }
        },
        discount: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        stock: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
               notEmpty: true,
            }
        },
        sold: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        warehouseID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        typeID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: true,
            }
        },
    }, {
        freezeTableName: true,
        hasTrigger: true
    });

    Product.belongsTo(Warehouse(port), {foreignKey: 'warehouseID'});
    Product.belongsTo(Type(port), {foreignKey: 'typeID'});
    return Product;
}

Warehouse().hasMany(Product());
Type().hasMany(Product());

// (async() => {
//     await Product().sync();
// })();



