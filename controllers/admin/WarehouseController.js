import { Warehouse } from "../../models/admin/WarehouseModel"

export const createWarehouse = async (req, res) => {
    try {
       
    } catch (error) {
        res.status(400).json({msg: error.message})
    }
}