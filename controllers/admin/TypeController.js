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

export const getTypes = async (req, res) => {
    try {
        const types = await Type().findAll({
            attributes: ['id', 'codeType', 'name', 'categoryID'],
            include: {
                model: Category()
            }
        });
        res.status(200).json(types);
    } catch(error) {
        res.status(500).json({msg: error.message});
    } 
}

export const updatedType = async (req, res) => {
    try {
        const type = await Type().findOne({where: {codeType: req.params.codeType}});
        if(!type) return res.status(400).json({msg: "type not found"});
        await Type().update({
            name: req.body.name,
            categoryID: req.body.categoryID
        }, {
            where: {id: type.id}
        });
        res.status(200).json({msg: "update successfully!"});
    } catch(error) {
        res.status(400).json({msg: error.message});;
    }
}

export const deleteType = async (req, res) => {
    try {
        const type = await Type().findOne({where: {codeType: req.params.codeType}});
        if(!type) return res.status(400).json({msg: "type not found"});
        await Type().destroy({where: {id: type.id}});
        res.status(200).json({msg: "delete successfully!"});
    } catch(error) {
        res.status(500).json({msg: error.message})
    }
}