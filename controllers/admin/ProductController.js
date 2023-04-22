import { Product } from "../../models/admin/ProductModel";
import path from "path";
import fs from "fs"

export const createProduct = async (req, res) => {
    if(req.files === null) return res.status(400).json({msg: "No file uploaded"});
    const file = req.files.file;
    const fileSize = file.data.length;
    const ext = path.extname(file.name);

    let date_ob = new Date();
    const fileName = file.md5 + date_ob.getHours() + date_ob.getMinutes() + date_ob.getSeconds() + ext;
    const url = `${req.protocol}://${req.get("host")}/images/products/${fileName}`;
    const allowedType = ['.png', '.jpg', '.jpeg'];
    if (!allowedType.includes(ext.toLowerCase())) return res.status(422).json({ msg: "Invalid Images" });
    if (fileSize > 5000000) return res.status(422).json({ msg: "Image must be less than 5 MB" });

    const { name, description, price, discount, stock, warehouseID, typeID } = req.body;

    file.mv(`./public/images/products/${fileName}`, async(err) => {
        if(err) return res.status(500).json({msg: err.message});
        try {
            await Product().create({
                name: name,
                image: fileName,
                url: url,
                description: description,
                price: price,
                discount: discount,
                stock: stock,
                warehouseID: warehouseID,
                typeID: typeID,
            });
            res.status(201).json({msg: "create product successfully"});
        } catch(error) {
            res.status(400).json({ msg: "catch: "+error.message });
        }
    })

}