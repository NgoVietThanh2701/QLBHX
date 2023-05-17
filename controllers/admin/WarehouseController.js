import { Branch } from "../../models/admin/BranchModel";
import { Warehouse } from "../../models/admin/WarehouseModel"

export const createWarehouse = async (req, res) => {
    const {name, address, codeBranch} = req.body;
    try {
        await Warehouse(req.port_cn).create({
            name: name,
            address: address,
            codeBranch: codeBranch
        });
        res.status(201).json({msg: "create warehouse successfully!"});
    } catch (error) {
        res.status(400).json({msg: error.message})
    }
}

export const getWarehouse = async(req, res) => {
    try {
        const warehouses = await Warehouse(req.port_cn).findAll({
            attributes: ['id', 'codeWH', 'name', 'address', 'codeBranch', 'createdAt'],
            include: {
                model: Branch()
            }
        });
        res.status(201).json(warehouses);
    }catch(error) {
        res.status(500).json({msg: error.message});
    }
}

export const updatedWarehouse = async (req, res) => {
    const {name, address, codeBranch} = req.body;
    try {
        const warehouse = await Warehouse(req.port_cn).findOne({where: {codeWH: req.params.codeWarehouse}});
        if(!warehouse) return res.status(400).json({msg: "warehouse not found"});
        await Warehouse(req.port_cn).update({name: name, address: address, codeBranch: codeBranch}, {
            where: {id: warehouse.id }
        });
        res.status(201).json({msg: "update warehouse successfully!"});
    } catch(error) {
        res.status(500).json({msg: error.message});
    }
}

export const deleteWarehouse = async (req, res) => {
    try {
        const warehouse = await Warehouse(req.port_cn).findOne({where: {codeWH: req.params.codeWarehouse}});
        if(!warehouse) return res.status(400).json({msg: "warehouse not found"});
        await Warehouse(req.port_cn).destroy({where: {id: warehouse.id}});
        res.status(200).json({msg: "delete warehouse successfully"});
    }catch(error){
        res.status(500).json({msg: error.message});
    }
}