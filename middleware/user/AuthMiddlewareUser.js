import { Customer } from "../../models/admin/CustomerModel";

export const verifyUser = async (req, res, next) => {
    if(!req.session.codeUser) return res.status(400).json({msg: "Please login to continue"});
    const user = await Customer().findOne({where: {codeCustomer: req.session.codeUser}});
    if(!user) return res.status(401).json({msg: "User not found!"});
    req.userID = user.id;
    next();
}