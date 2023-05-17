import {Manager} from "../../models/admin/ManagerModel";
import argon2 from 'argon2';
import dotenv from 'dotenv';
import { Branch } from "../../models/admin/BranchModel";
dotenv.config();

export const login = async (req, res) => {
    if(req.body.email=='admin@gmail.com') {
        req.body.port_cn = process.env.PORT_DEFAULT
    }
    const manager = await Manager(req.body.port_cn).findOne({
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
    req.session.codeManager = manager.codeManager;
    req.session.port_cn = req.body.port_cn;
    res.status(200).json({ name, email, role });
}

export const me = async (req, res) => {
    if(!req.session.codeManager || !req.session.port_cn) {
        return res.status(401).json({msg: "please, login with account"});
    }
    const manager = await Manager(req.session.port_cn).findOne({
        attributes: ['name', 'email', 'role', 'codeBranch'],
        include: {
            model: Branch()
        },
        where: {
            codeManager: req.session.codeManager
        }
    });
    if(!manager) return res.status(404).json({msg: "manager not found"});
    res.status(201).json(manager);
}

export const logOut = (req, res) => {
    req.session.destroy((err) => {
        if(err) return res.status(400).json({msg: "can't logout"});
        res.status(200).json({msg: "logout successfully!"});
    })
}