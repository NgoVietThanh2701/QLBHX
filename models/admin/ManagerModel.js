import { Sequelize } from "sequelize";
import {connect} from "../../config/Database";
import { Branch } from "./BranchModel";
import dotenv from 'dotenv';
dotenv.config();

const {DataTypes} = Sequelize;

export const Manager = (port = process.env.PORT_DEFAULT) => {
    let Manager = connect(port).define('Manager', {
        codeManager: {
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
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        role: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
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
    return Manager;
}

Branch().hasMany(Manager());
Manager().belongsTo(Branch(), {foreignKey: 'codeBranch'});

(async() => {
    await Manager().sync();
})();



