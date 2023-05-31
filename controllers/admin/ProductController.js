import { Product } from "../../models/admin/ProductModel";
import fs from "fs"
import { Warehouse } from "../../models/admin/WarehouseModel";
import { Type } from "../../models/admin/TypeModel";
import { PhotoProduct } from "../../models/admin/PhotoProductModel";

export const createProduct = async (req, res) => {
    const files = req.files;
    if (!files || files.length === 0) {
        return res.status(400).json({msg: "No files uploaded"});
    }
    const {name, description, price, properties, discount, stock, warehouseID, typeID} = req.body;
    try {
        const product = await Product(req.port_cn).create({
            name: name,
            description: description,
            price: price,
            properties: JSON.stringify(properties),
            discount: discount,
            stock: stock,
            warehouseID: warehouseID,
            typeID: typeID,
        });
        for (const file of files) {
            const filePath = file.path;
            const fileName = file.filename;
            const url = `${req.protocol}://${req.get("host")}/images/products/${fileName}`;
            await PhotoProduct(req.port_cn).create({
                productID: product.id,
                fileName: fileName,
                url: url
            });
            // Di chuyển tệp tin vào thư mục public
            fs.renameSync(filePath, `./public/images/products/${fileName}`);
        }
        res.status(201).json({msg: "Create product successfully"});
    } catch (error) {
        res.status(400).json({ msg: "catch: "+error.message });
    }
}

export const getProducts = async (req, res) => {
    try {
        const products = await Product(req.port_cn).findAll({
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
            ]
        });
        res.status(200).json(products);
    } catch(error) {
        return res.status(500).json({msg: error.message});
    }
}

export const getProductByID = async (req, res) => {
    const productbyID = await Product(req.port_cn).findOne({where: {codeProduct: req.params.codeProduct}});
    if(!productbyID) return res.status(400).json({msg: "Product not found!"});
    try {
        const product = await Product(req.port_cn).findOne({
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
            where: {id: productbyID.id}
        });
        res.status(200).json(product);
    } catch(error) {
        return res.status(500).json({msg: error.message});
    }
}

export const updateProduct = async (req, res) => {
    const productByID = await Product(req.port_cn).findOne({where: {codeProduct: req.params.codeProduct}});
    if(!productByID) return res.status(400).json({msg: "product not found!"});
    const photoProduct = await PhotoProduct(req.port_cn).findAll({where: {productID: productByID.id}});
    if(!photoProduct) return res.status(400).json({msg: "photo product not found!"});
    const files = req.files;
    let fileName = [];
    if (!files || files.length === 0) {
        photoProduct.forEach((photo) => {
            fileName.push(photo.fileName);
        });
    } else {
        photoProduct.forEach((photo) => {
            const filepath_del = `./public/images/products/${photo.fileName}`;
            fs.unlink(filepath_del, (err) => {
                if(err) res.status(500).json({msg: err.message});
            });
        });
        for(const file of files) {
            fileName.push(file.filename)
            console.log(file.filename);
            fs.rename(file.path, `./public/images/products/${file.filename}`, (err) => {
                if(err) res.status(500).json({msg: err.message});
            });
        };
    }
    await PhotoProduct(req.port_cn).destroy({where: {productID: productByID.id}});
    const {name, description, price, properties, discount, stock, warehouseID, typeID} = req.body;
    try {
        await Product(req.port_cn).update({
            name: name,
            description: description,
            price: price,
            properties: JSON.stringify(properties),
            discount: discount,
            stock: stock,
            warehouseID: warehouseID,
            typeID: typeID,
            }, {where: {id: productByID.id}}
        );
        for (const fileN of fileName) {
            const url = `${req.protocol}://${req.get("host")}/images/products/${fileN}`;
            await PhotoProduct(req.port_cn).create({
                productID: productByID.id,
                fileName: fileN,
                url: url
            });
        }
        res.status(201).json({msg: "Udated product successfully"});
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}

export const deleteProduct = async (req, res) => {
    const product = await Product(req.port_cn).findOne({where: {codeProduct: req.params.codeProduct}});
    if(!product) return res.status(400).json({msg: "product not found"});
    try {
        const photos = await PhotoProduct(req.port_cn).findAll({where: {productID: product.id}});
        photos.forEach(photo => {
            const filepath = `./public/images/products/${photo.fileName}`;
            fs.unlinkSync(filepath);
        });
        await PhotoProduct(req.port_cn).destroy({where: {productID: product.id}})
        await Product(req.port_cn).destroy({where: {id: product.id}});
        res.status(200).json({msg: "delete product successfully"});
    }catch(error) {
        return res.status(500).json({msg: error.message})
    }
}