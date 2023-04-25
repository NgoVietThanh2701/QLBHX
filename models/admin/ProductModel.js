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
        image: {
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
        discount: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        stock: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
               notEmpty: true,
            }
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

    return Product;
}


Warehouse().hasMany(Product());
Product().belongsTo(Warehouse(), {foreignKey: 'warehouseID'});

Type().hasMany(Product());
Product().belongsTo(Type(), {foreignKey: 'typeID'});

// (async() => {
//     await Product().sync();
// })();



