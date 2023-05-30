import { Sequelize } from "sequelize";
import {connect} from "../../config/Database";
import dotenv from 'dotenv';
dotenv.config();

const {DataTypes} = Sequelize;

export const Category = (port = process.env.PORT_DEFAULT) => {
    let Category = connect(port).define('Category', {
        codeCategory: {
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
    return Category;
}

// (async() => {
//     await Category().sync();
// })();



