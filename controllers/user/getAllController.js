import { Category } from "../../models/admin/CategoryModel";
import { Product } from "../../models/admin/ProductModel";
import dotenv from 'dotenv';
dotenv.config();

export const getCategory = async (req, res) => {
    try {
        const categories = await Category().findAll({
            attributes: ['id', 'codeCategory', 'name', 'createdAt']
        });
        res.status(200).json(categories);
    } catch(error) {
        res.status(500).json({msg: error.message});
    } 
}

export const getProduct = async (req, res) => {
    try {
        const products = await Product(req.params.port).findAll({
            attributes: ['id', 'codeProduct', 'name', 'image', 'url', 'description', 'price', 'discount', 'stock', 'typeID', 'warehouseID'],
        });
        res.status(200).json(products);
    } catch(error) {
        return res.status(500).json({msg: error.message});
    }
}