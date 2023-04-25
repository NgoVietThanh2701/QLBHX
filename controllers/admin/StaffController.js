import { Branch } from "../../models/admin/BranchModel";
import { Staff } from "../../models/admin/StaffModel"

export const createStaff = async (req, res) => {
    const {name, address ,salary, codeBranch} = req.body;
    try {
        await Staff(req.port_cn).create({
            name: name,
            address: address,
            salary: salary,
            codeBranch: codeBranch
        });
        res.status(201).json({msg: "create staff successfully!"});
    } catch (error) {
        res.status(400).json({msg: error.message})
    }
}

export const getStaff = async(req, res) => {
    try {
        const staffs = await Staff(req.port_cn).findAll({
            attributes: ['id', 'codeStaff', 'name', 'address', 'salary', 'codeBranch', 'createdAt'],
        });
        res.status(201).json(staffs);
    }catch(error) {
        res.status(500).json({msg: error.message});
    }
}

export const updatedStaff = async (req, res) => {
    const {name, address ,salary, codeBranch} = req.body;
    try {
        const staff = await Staff(req.port_cn).findOne({where: {codeStaff: req.params.codeStaff}});
        if(!staff) return res.status(400).json({msg: "staff not found"});
        await Staff(req.port_cn).update({name: name, address: address, salary: salary, codeBranch: codeBranch}, {
            where: {id: staff.id }
        });
        res.status(201).json({msg: "update staff successfully!"});
    } catch(error) {
        res.status(500).json({msg: error.message});
    }
}

export const deleteStaff = async (req, res) => {
    try {
        const staff = await Staff(req.port_cn).findOne({where: {codeStaff: req.params.codeStaff}});
        if(!staff) return res.status(400).json({msg: "staff not found"});
        await Staff(req.port_cn).destroy({where: {id: staff.id}});
        res.status(200).json({msg: "delete staff successfully"});
    }catch(error){
        res.status(500).json({msg: error.message});
    }
}