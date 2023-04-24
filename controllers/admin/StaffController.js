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
            attributes: ['id', 'codeStaff', 'name', 'address', 'salary', 'createdAt']
        });
        res.status(201).json(staffs);
    }catch(error) {
        res.status(500).json({msg: error.message});
    }
}