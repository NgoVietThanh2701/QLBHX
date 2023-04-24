import { Cart } from "../../models/admin/CartModel";
import { Op } from 'sequelize';
import { Product } from "../../models/admin/ProductModel";
import { Customer } from "../../models/admin/CustomerModel";

export const createCart = async (req, res) => {
    const {customerID, productID, quantity, status} = req.body;
    const product = await Product().findOne({ where: { codeProduct: productID } });
    if (!product) return res.status(400).json({ msg: "product not found" });
    try {
        const cart = await Cart().findOne({
            where: {
               [Op.and]: [{ productID: product.id }, { customerID: customerID }]
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
                customerID: customerID,
                productID: product.id,
                quantity: quantity,
                status: status
            });
        }
        res.status(200).json({msg: "create cart successfully"})
    } catch (error) {
        res.status(400).json({msg: error.message})
    }
}

export const getCart = async (req, res) => {
    const customer = await Customer().findOne({where: {codeCustomer: req.params.id}});
    if(!customer) return res.status(400).json({msg: "customer not found"});
    try {
        const carts = await Cart().findAll({
            attributes: ["id", "customerID", "productID", "quantity", "status"],
            where: {
                customerID: customer.id
            },
            include:[ 
                { model: Customer() },
                { model: Product() },
            ]   
        });
        res.status(201).json(carts)
    } catch(error) {
        res.status(500).json({msg: error.message});
    }
}