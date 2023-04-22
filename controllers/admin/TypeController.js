import { Category } from "../../models/admin/CategoryModel";
import { Type } from "../../models/admin/TypeModel"

export const createType = async (req, res) => {
    try {
        await Type().create({
            name: req.body.name,
            categoryID: req.body.categoryID
        });
        res.status(201).json({msg: "create Type successfully!"});
    } catch (error) {
        res.status(400).json({msg: error.message})
    }
}