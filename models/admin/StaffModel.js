import { Sequelize } from "sequelize";
import {connect} from "../../config/Database";
import { Branch } from "./BranchModel";
import dotenv from 'dotenv';
dotenv.config();

const {DataTypes} = Sequelize;

export const Staff = (port = process.env.PORT_DEFAULT) => {
    let Staff = connect(port).define('Staff', {
        codeStaff: {
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
        address: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            }
        },
        salary: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        codeBranch: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        }
    }, {
        freezeTableName: true,
        hasTrigger: true
    });
    Branch().hasMany(Staff);
    Staff.belongsTo(Branch(), {foreignKey: 'codeBranch'});

    return Staff;
}

// (async() => {
//     await Staff().sync();
// })();



