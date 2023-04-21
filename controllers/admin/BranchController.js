import { Branch } from "../../models/admin/BranchModel";

export const createBranch = async (req, res) => {
    try {
        // const {codeBranch, name, address} = req.body;
    } catch (error) {
        res.status(400).json({msg: error.message})
    }
}