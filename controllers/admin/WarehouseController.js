import { Warehouse } from "../../models/admin/WarehouseModel"

export const createWarehouse = async (req, res) => {
    const {name, address, codeBranch} = req.body;
    try {
        await Warehouse().create({
            name: name,
            address: address,
            codeBranch: codeBranch
        });
        res.status(201).json({msg: "create warehouse successfully!"});
    } catch (error) {
        res.status(400).json({msg: error.message})
    }
}