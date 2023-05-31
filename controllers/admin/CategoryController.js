import { Category } from "../../models/admin/CategoryModel";
import fs from "fs"

export const createCategory = async (req, res) => {
    if (!req.file || req.file.length === 0) {
        return res.status(400).json({msg: "No files uploaded"});
    }
    const filePath = req.file.path;
    const fileName = req.file.filename;
    const url = `${req.protocol}://${req.get("host")}/images/categories/${fileName}`;

    fs.rename(filePath, `./public/images/categories/${fileName}`,async (err) => {
        if(err) return res.status(500).json({msg: err.message});
        try {
            await Category().create({
                name: req.body.name,
                fileName: fileName,
                url: url
            });
            res.status(201).json({msg: "create category successfully!"});
        } catch (error) {
            res.status(400).json({msg: error.message})
        }
    })
}

export const getCategories = async (req, res) => {
    try {
        const categories = await Category().findAll({
            attributes: ['id', 'codeCategory', 'name', 'url', 'createdAt']
        });
        res.status(200).json(categories);
    } catch(error) {
        res.status(500).json({msg: error.message});
    } 
}

export const getCategoryByID = async (req, res) => {
    const categoryCode = await Category().findOne({where: {codeCategory: req.params.codeCategory}});
    if(!categoryCode) return res.status(400).json({msg: "category not found!"});
    try {
        const category = await Category().findOne({
            attributes: ['id', 'codeCategory', 'name', 'fileName', 'url', 'createdAt'],
            where: {
                id: categoryCode.id
            }
        })
        res.status(200).json(category);
    } catch(error) {
        res.status(500).json({msg: error.message});
    }
}

export const updatedCategory = async (req, res) => {
    const category = await Category().findOne({where: {codeCategory: req.params.codeCategory}});
    if(!category) return res.status(400).json({msg: "category not found"});
    try {
        let fileName;
        if (!req.file || req.file.length === 0) { 
            fileName = category.fileName;
        } else {
            fileName = req.file.filename;
            // delete file in categories folder
            const filepath_del = `./public/images/categories/${category.fileName}`;
            fs.unlink(filepath_del, (err) => {
                if(err) return res.status(500).json({msg: err.message});
                fs.rename(req.file.path,  `./public/images/categories/${fileName}`, (err) => {
                    if(err) res.status(500).json({msg: err.message});
                })
            });
        }

        const url = `${req.protocol}://${req.get("host")}/images/categories/${fileName}`;
        const {name} = req.body;
        await Category().update({
            name: name,
            fileName: fileName,
            url: url
        }, {
            where: {id: category.id}
        });
        res.status(200).json({msg: "Updated successfully!"});
    } catch(error) {
        res.status(400).json({msg: error.message});;
    }
}

export const deleteCategory = async (req, res) => {
    try {
        const category = await Category().findOne({where: {codeCategory: req.params.codeCategory}});
        if(!category) return res.status(400).json({msg: "Category not found"});
        const filepath = `./public/images/categories/${category.fileName}`;
        fs.unlink(filepath, async (err) => {
            if(err) res.status(500).json({msg: err.message});
            try {
                await Category().destroy({where: {id: category.id}});
                res.status(200).json({ msg: "Deleted Category Successfully" });
            } catch(error) {
                res.status(400).json({msg: error.message})
            }
        });
    } catch(error) {
        res.status(500).json({msg: error.message})
    }
}