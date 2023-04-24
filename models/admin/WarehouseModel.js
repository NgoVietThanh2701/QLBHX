import { Sequelize } from "sequelize";
import {connect} from "../../config/Database";
import { Branch } from "./BranchModel";
import dotenv from 'dotenv';
dotenv.config();

const {DataTypes} = Sequelize;

export const Warehouse = (port = process.env.PORT_DEFAULT) => {
    let Warehouse = connect(port).define('Warehouse', {
        codeWH: {
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

    Branch().hasMany(Warehouse);
    Warehouse.belongsTo(Branch(), {foreignKey: 'codeBranch'});

    return Warehouse;
}


// (async() => {
//     await Warehouse().sync();
// })();



