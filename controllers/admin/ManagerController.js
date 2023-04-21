import { Manager } from "../../models/admin/ManagerModel"

export const createManager = async (req, res) => {
    try {
       
    } catch (error) {
        res.status(400).json({msg: error.message})
    }
}