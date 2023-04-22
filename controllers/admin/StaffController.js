import { Staff } from "../../models/admin/StaffModel"

export const createStaff = async (req, res) => {
    const {name, address ,salary, codeBranch} = req.body;
    try {
        await Staff().create({
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