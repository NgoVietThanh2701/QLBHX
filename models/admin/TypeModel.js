import { Sequelize } from "sequelize";
import {connect} from "../../config/Database";
import { Category } from "./CategoryModel";
import dotenv from 'dotenv';
dotenv.config();

const {DataTypes} = Sequelize;

export const Type = (port = process.env.PORT_DEFAULT) => {
    let Type = connect(port).define('Type', {
        codeType: {
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
        categoryID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        }
    }, {
        freezeTableName: true,
    });
    return Type;
}

Category().hasMany(Type());
Type().belongsTo(Category(), {foreignKey: 'CategoryID'});

// (async() => {
//     await Type().sync();
// })();



