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

export const getCategories = async (req, res) => {
    try {
        const categories = await Category().findAll({
            attributes: ['id', 'codeCategory', 'name']
        });
        res.status(200).json(categories);
    } catch(error) {
        res.status(500).json({msg: error.message});
    } 
}

export const updatedCategory = async (req, res) => {
    try {
        const category = await Category().findOne({where: {codeCategory: req.params.codeCategory}});
        if(!category) return res.status(400).json({msg: "category not found"});
        await Category().update({
            name: req.body.name
        }, {
            where: {id: category.id}
        });
        res.status(200).json({msg: "update successfully!"});
    } catch(error) {
        res.status(400).json({msg: error.message});;
    }
}

export const deleteCategory = async (req, res) => {
    try {
        const category = await Category().findOne({where: {codeCategory: req.params.codeCategory}});
        if(!category) return res.status(400).json({msg: "category not found"});
        await Category().destroy({where: {id: category.id}});
        res.status(200).json({msg: "delete successfully!"});
    } catch(error) {
        res.status(500).json({msg: error.message})
    }
}