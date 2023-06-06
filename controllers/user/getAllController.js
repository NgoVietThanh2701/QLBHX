import { Category } from "../../models/admin/CategoryModel";
import { Product } from "../../models/admin/ProductModel";
import dotenv from 'dotenv';
import { Type } from "../../models/admin/TypeModel";
import { Warehouse } from "../../models/admin/WarehouseModel";
import { PhotoProduct } from "../../models/admin/PhotoProductModel";
dotenv.config();

export const getCategory = async (req, res) => {
    try {
        const categories = await Category().findAll({
            attributes: ['id', 'codeCategory', 'name', 'url', 'createdAt']
        });
        res.status(200).json(categories);
    } catch(error) {
        res.status(500).json({msg: error.message});
    } 
}

export const getType = async (req, res) => {
    try {
        const types = await Type().findAll({
            attributes: ['id', 'codeType', 'name', 'createdAt'],
            include: {model: Category()}
        });
        res.status(200).json(types);
    } catch(error) {
        res.status(500).json({msg: error.message});
    } 
}

export const getProductByCate = async (req, res) => {
    const category = await Category().findOne({where: {codeCategory: req.params.codeCategory}});
    if(!category) return res.status(400).json({msg: "Category not found!"});
    try {
        const products = await Product(req.params.port).findAll({
            attributes: ['id', 'codeProduct', 'name', 'description', 'price', 'properties', 'discount', 'stock', 'sold'],            
            include: [
                {
                    model: Type(),
                    attributes: ['id', 'codeType', 'name', 'categoryID']
                },
                {
                    model: Warehouse(),
                    attributes: ['id', 'codeWH', 'name', 'address', 'codeBranch']
                },
                {
                    model: PhotoProduct(),
                    attributes: ['id', 'productID', 'fileName', 'url']
                } 
            ], 
        });
        let productByCate = []
        products.forEach(product => {
            if(product.Type.categoryID === category.id) {
                productByCate.push(product);
            }
        })
        res.status(200).json(productByCate);
    } catch(error) {
        return res.status(500).json({msg: error.message});
    }
}

export const getProduct = async (req, res) => {
    try {
        const products = await Product(req.params.port).findAll({
            attributes: ['id', 'codeProduct', 'name', 'description', 'price', 'properties', 'discount', 'stock', 'sold'],            include: [
                {
                    model: Type(),
                    attributes: ['id', 'codeType', 'name', 'categoryID']
                },
                {
                    model: Warehouse(),
                    attributes: ['id', 'codeWH', 'name', 'address', 'codeBranch']
                },
                {
                    model: PhotoProduct(),
                    attributes: ['id', 'productID', 'fileName', 'url']
                } 
            ]
        });
        res.status(200).json(products);
    } catch(error) {
        return res.status(500).json({msg: error.message});
    }
}


export const getProductByID = async (req, res) => {
    const productID = await Product().findOne({where: {codeProduct: req.params.codeProduct}});
    if(!productID) return res.status(400).json({msg: "product not found"});
    try {
        const product = await Product().findOne({
            attributes: ['id', 'codeProduct', 'name', 'description', 'price', 'properties', 'discount', 'stock', 'sold'],            
            include: [
                {
                    model: Type(),
                    attributes: ['id', 'codeType', 'name', 'categoryID']
                },
                {
                    model: Warehouse(),
                    attributes: ['id', 'codeWH', 'name', 'address', 'codeBranch']
                },
                {
                    model: PhotoProduct(),
                    attributes: ['id', 'productID', 'fileName', 'url']
                } 
            ], 
            where: {id: productID.id}
        });
        res.status(200).json(product);
    } catch(error) {
        return res.status(500).json({msg: error.message});
    }
}