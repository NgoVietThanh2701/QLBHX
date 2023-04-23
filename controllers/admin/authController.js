import {Manager} from "../../models/admin/ManagerModel";
import argon2 from 'argon2';

export const login = async (req, res) => {
    const manager = await Manager().findOne({
        where: {
            email: req.body.email
        }
    });
    if(!manager) return res.status(404).json({msg: "email not found!"});
    const match = await argon2.verify(manager.password, req.body.password);
    if(!match) return res.status(400).json({msg: "wrong password"});
    const name = manager.name;
    const email = manager.email;
    const role = manager.role;
    req.session.codemanager = manager.codeManager;
    req.session.port_cn = req.body.port_cn;
    res.status(200).json({name, email, role});
}

export const me = async (req, res) => {
    if(!req.session.codemanager) {
        return res.status(401).json({msg: "please, login with account"});
    }
    const manager = await Manager().findOne({
        attributes: ['codeManager', 'name', 'email', 'role', 'codeBranch'],
        where: {
            codeManager: req.session.codemanager
        }
    });
    console.log("---"+req.session.port_cn);
    if(!manager) return res.status(404).json({msg: "manager not found"});
    res.status(201).json(manager);
}

export const logOut = (req, res) => {
    req.session.destroy((err) => {
        if(err) return res.status(400).json({msg: "can't logout"});
        res.status(200).json({msg: "logout successfully!"});
    })
}