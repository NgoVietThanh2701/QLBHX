import { Manager } from "../../models/admin/ManagerModel";
import dotenv from 'dotenv';
dotenv.config();
 
export const verifyManager = async (req, res, next) => {
    if(!req.session.codeManager || !req.session.port_cn) {
        return res.status(400).json({msg: "please login to continune"});
    }
    const manager = await Manager(req.session.port_cn).findOne({
        where: {
            codeManager: req.session.codeManager
        }
    });
    if(!manager) return res.status(401).json({msg: "manager not found"});
    req.port_cn = manager.role === 'admin'? process.env.PORT_DEFAULT : req.session.port_cn;
    req.managerID = manager.id;
    req.role = manager.role;
    next();     
}

export const verifyAdmin = async (req, res, next) => {
    const manager =  await Manager().findOne({
        where: {
            codeManager: req.session.codeManager
        }
    });
    if(!manager) return res.status(401).json({msg: "Manager not found"});
    if(manager.role !== "admin") return res.status(404).json({msg: "Please login with admin account!"});
    req.port_cn = process.env.PORT_DEFAULT;
    next();
}