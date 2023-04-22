import { Customer } from "../../models/admin/CustomerModel";
import argon2 from 'argon2';

export const createCustomer = async (req, res) => {
    const {name, email, password, confPassword, phone, address, codeBranch} = req.body;
    if (password !== confPassword)
        return res.status(400).json({ msg: "password not matched" });
    const customers = await Customer().findAll();
    let ischeckEmail;
    for (const customer of customers) {
        if(customer.email === email) {
            ischeckEmail = true;
        }
    }
    if(ischeckEmail)  return res.status(404).json({ msg: "email exists, please retype email" });
    const hashPassword = await argon2.hash(password);
    try {
        await Customer().create({
            name: name,
            email: email,
            password: hashPassword,
            phone: phone,
            address: address,
            codeBranch: codeBranch
        });
        res.status(201).json({msg: "create Customer successfully!"});
    } catch (error) {
        res.status(400).json({msg: error.message})
    }
}