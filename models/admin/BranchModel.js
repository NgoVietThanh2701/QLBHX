import { Sequelize } from "sequelize";
import {connect} from "../../config/Database";
import dotenv from 'dotenv';
import { Manager } from "./ManagerModel";
dotenv.config();

const {DataTypes} = Sequelize;

export const Branch = (port = process.env.PORT_DEFAULT) => {
    let Branch = connect(port).define('Branch', {
        codeBranch: {
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        name: {
            type: DataTypes.STRING(50),
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        address: {
            type: DataTypes.STRING(100),
            validate: {
                notEmpty: true
            }
        }
    }, {
        freezeTableName: true,
        hasTrigger: true
    });

    //Branch.hasMany(Manager(port));
    return Branch;
}


// (async() => {
//     await Branch().sync();
// })();



