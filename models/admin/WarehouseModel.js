import { Sequelize } from "sequelize";
import {connect} from "../../config/Database";
import { Branch } from "./BranchModel";
import dotenv from 'dotenv';
dotenv.config();

const {DataTypes} = Sequelize;

export const Warehouse = (port = process.env.PORT_DEFAULT) => {
    let Warehouse = connect(port).define('Warehouse', {
        codeWH: {
            primaryKey: true,
            type: DataTypes.STRING(30),
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
        address: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            }
        },
        codeBranch: {
            type: DataTypes.STRING(11),
            allowNull: false,
            validate: {
                notEmpty: true
            }
        }
    }, {
        freezeTableName: true,
    });
    return Warehouse;
}

Branch().hasMany(Warehouse());
Warehouse().belongsTo(Branch(), {foreignKey: 'codeBranch'});

(async() => {
    await Warehouse().sync();
})();



