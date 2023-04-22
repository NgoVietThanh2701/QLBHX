import { Category } from "../../models/admin/CategoryModel";

export const createCategory = async (req, res) => {
    try {
        await Category().create({
            name: req.body.name,
        });
        res.status(201).json({msg: "create category successfully!"});
    } catch (error) {
        res.status(400).json({msg: error.message})
    }
}