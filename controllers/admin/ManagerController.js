import { Branch } from "../../models/admin/BranchModel";
import { Manager } from "../../models/admin/ManagerModel";
import argon2 from "argon2";

export const createManager = async (req, res) => {
    const {name, email, password, confPassword, role, codeBranch} = req.body;
    if (password !== confPassword)
        return res.status(400).json({ msg: "password not matched" });
    const managers = await Manager().findAll();
    let ischeckEmail;
    for (const manager of managers) {
        if(manager.email === email) {
            ischeckEmail = true;
        }
    }
    if(ischeckEmail)  return res.status(404).json({ msg: "email exists, please retype email" });
    const hashPassword = await argon2.hash(password);
    try {
        await Manager(req.port_cn).create({
            name: name,
            email: email,
            password: hashPassword,
            role: role,
            codeBranch: codeBranch
        });
        res.status(201).json({msg: "create manager successfully!"});
    } catch (error) {
        res.status(400).json({msg: error.message})
    }
}

export const getManager = async (req, res) => {
    try {
        const manager = await Manager(req.port_cn).findAll({
            attributes: ['id', 'codeManager', 'name', 'email', 'role', 'codeBranch'],
            include: {
                model: Branch()
            }
        });
        res.status(200).json(manager);
    } catch(error) {
        return res.status(500).json({msg: error.message});
    }
}

// export const updatedManager = async (req, res) => {
//     try {
//         const manager = Manager(req.port_cn).findOne({where: {codeManager: req.params.codeManager}});
//         if(!manager) return res.status(400).json({msg: "manager not found"});
//         const {name, email, password, confPassword, role, codeBranch} = req.body;
//         let hashPassword;
//         if(password === '' || password === null) {
//             hashPassword = manager.password
//         } else {
//             hashPassword = await argon2.hash(password)
//         }
//         if()
//     } catch(error) {
//         res.status(400).json({msg: error.message});
//     }
// }

