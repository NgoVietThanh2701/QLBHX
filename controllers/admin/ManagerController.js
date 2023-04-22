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
        await Manager().create({
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