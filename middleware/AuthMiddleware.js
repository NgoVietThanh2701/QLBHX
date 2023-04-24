import { Manager } from "../models/admin/ManagerModel";
 
export const verifyManager = async (req, res, next) => {
    if(!req.session.codeManager || !req.session.port_cn) {
        console.log(req.session.codeManager+"-"+req.session.port_cn)
        return res.status(400).json({msg: "please login to continune"});
    }
    const manager = await Manager(req.session.port_cn).findOne({
        where: {
            codeManager: req.session.codeManager
        }
    });
    if(!manager) return res.status(401).json({msg: "manager not found"});
    req.port_cn = req.session.port_cn;
    req.managerID = manager.id;
    req.role = manager.role;
    next();     
}