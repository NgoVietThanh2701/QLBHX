import { Sequelize } from "sequelize";
import {connect} from "../../config/Database";
import { Branch } from "./BranchModel";
import dotenv from 'dotenv';
dotenv.config();

const {DataTypes} = Sequelize;

export const Customer = (port = process.env.PORT_DEFAULT) => {
    let Customer = connect(port).define('Customer', {
        codeCustomer: {
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
                notEmpty: true,
            }
        },
        phone: {
            type: DataTypes.INTEGER,
            validate : {
                notEmpty: true
            }
        },
        address: {
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
    return Customer;
}

// (async() => {
//     await Customer().sync();
// })();



