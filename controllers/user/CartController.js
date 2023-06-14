import { Cart } from "../../models/admin/CartModel";
import { Op } from 'sequelize';
import { Product } from "../../models/admin/ProductModel";
import { Customer } from "../../models/admin/CustomerModel";
import { Warehouse } from "../../models/admin/WarehouseModel";
import { Type } from "../../models/admin/TypeModel";
import { Branch } from "../../models/admin/BranchModel";
import { PhotoProduct } from "../../models/admin/PhotoProductModel";

export const createCart = async (req, res) => {
    const { codeProduct, quantity, classify, status} = req.body;
    const product = await Product().findOne({ where: { codeProduct: codeProduct } });
    if (!product) return res.status(400).json({ msg: "product not found" });
    try {
        const cart = await Cart().findOne({
            where: {
               [Op.and]: [{ productID: product.id }, { customerID: req.userID }]
            }
         });
        if (cart) {
            await Cart().update({
               quantity: parseInt(cart.quantity) + parseInt(quantity)
            }, {
               where: { id: cart.id }
            })
        } else {
            await Cart().create({
                customerID: req.userID,
                productID: product.id,
                quantity: quantity,
                classify: classify,
                status: status
            });
        }
        const carts = await Cart().findAll({
            attributes: ["id", "quantity", "classify", "status"],
            where: {
                customerID: req.userID
            },  
            include: [
                {
                    model: Customer(),
                    attributes: ["codeCustomer", "name", "email"]
                },
                {
                    model: Product(),
                    attributes: ["codeProduct", "name", "description", "price", "discount", "Stock", "sold"],
                    include: [
                        {
                            model: Warehouse(),
                            include: {
                                model: Branch()
                            }
                        },
                        {
                            model: Type()
                        },
                        {
                            model: PhotoProduct(),
                            attributes: ['id', 'productID', 'fileName', 'url']
                        } 
                    ]
                }
            ]
        });
        res.status(200).json(carts);
    } catch (error) {
        res.status(400).json({msg: error.message})
    }
}

export const getCart = async (req, res) => {
    if(!req.userID) return res.status(400).json({msg: "No cart, please login!"});
    try {
        const carts = await Cart(req.params.port).findAll({
            attributes: ["id", "quantity", "classify", "status"],
            where: {
                customerID: req.userID
            },  
            include: [
                {
                    model: Customer(),
                    attributes: ["codeCustomer", "name", "email"]
                },
                {
                    model: Product(),
                    attributes: ["codeProduct", "name", "description", "price", "discount", "Stock", "sold"],
                    include: [
                        {
                            model: Warehouse(),
                            include: {
                                model: Branch()
                            }
                        },
                        {
                            model: Type()
                        },
                        {
                            model: PhotoProduct(),
                            attributes: ['id', 'productID', 'fileName', 'url']
                        } 
                    ]
                }
            ]
        });
        res.status(201).json(carts)
    } catch(error) {
        res.status(500).json({msg: error.message});
    }
}