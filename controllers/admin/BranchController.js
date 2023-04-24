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
        const branchs = await Branch().findAll({
            attributes: ['codeBranch', 'name', 'address', 'createdAt']
        });
        res.status(201).json(branchs);
    } catch(error) {
        res.status(500).json({msg: error.message});
    }
}

export const updatedBranch = async (req, res) => {
    const {name, address} = req.body;
    try {
        const branch = await Branch().findOne({where: {codeBranch: req.params.codeBranch}});
        if(!branch) return res.status(400).json({msg: "branhch not found"});
        await Branch().update({name: name,address: address}, {
            where: {codeBranch: branch.codeBranch }
        });
        res.status(201).json({msg: "update successfully!"});
    } catch(error) {
        res.stautus(500).json({msg: error.message});
    }
}

export const deleteBranch = async (req, res) => {
    try {
        const branch = await Branch().findOne({where: {codeBranch: req.params.codeBranch}});
        if(!branch) return res.status(400).json({msg: "branch not found"});
        await Branch().destroy({where: {codeBranch: branch.codeBranch}});
        res.status(200).json({msg: "delete successfully"});
    }catch(error){
        res.status(500).json({msg: error.message});
    }
}