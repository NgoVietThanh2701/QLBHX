import { Branch } from "../../models/admin/BranchModel";

export const createBranch = async (req, res) => {
    try {
        const {name, address} = req.body;
        await Branch().create({
            name: name,
            address: address
        });
        res.status(201).json({msg: "create branch successfully!"});
    } catch (error) {
        res.status(400).json({msg: error.message})
    }
}

export const getBranch = async (req, res) => {
    try {

    } catch(error) {
        
    }
}