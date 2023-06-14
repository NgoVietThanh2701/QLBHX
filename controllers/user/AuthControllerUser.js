import argon2 from "argon2";
import { Customer } from "../../models/admin/CustomerModel";

export const login = async (req, res) => {
    const user = await Customer().findOne({where: {email: req.body.email}});
    if(!user) return res.status(400).json({msg: "User not found"});
    const match = await argon2.verify(user.password, req.body.password);
    if(!match) return res.status(400).json({msg: "password not match"});
    const name = user.name;
    req.session.codeUser = user.codeCustomer;
    res.status(200).json({name});
}

export const getMe = async (req, res) => {
    if(!req.session.codeUser) return res.status(400).json({msg: "please login"});
    const user = await Customer().findOne({
        attributes: ["codeCustomer", "name", "email", "phone", "address", "createdAt"],
        where: {
            codeCustomer: req.session.codeUser
        }
    });
    if(!user) return res.status(401).json({msg: "user not found"});
    res.status(200).json(user)
}

export const logout = async (req, res) => {
    req.session.destroy((err) => {
        if(err) return res.status(400).json({msg: "can't logout"});
        res.status(200).json({msg: "logout successfully!"});
    })
}