import { Product } from "../../models/admin/ProductModel"

export const createProduct = async (req, res) => {
    try {
       
    } catch (error) {
        res.status(400).json({msg: error.message})
    }
}