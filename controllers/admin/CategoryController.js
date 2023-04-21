import { Category } from "../../models/admin/CategoryModel";

export const createCategory = async (req, res) => {
    try {
       
    } catch (error) {
        res.status(400).json({msg: error.message})
    }
}