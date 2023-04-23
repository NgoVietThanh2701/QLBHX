import { Order } from "../../models/admin/OrderModel";
import { Customer } from "../../models/admin/CustomerModel";
import { Cart } from "../../models/admin/CartModel";
import { Product } from "../../models/admin/ProductModel";
import {OrderDetail} from "../../models/admin/OrderDetailModel";
import { Op } from 'sequelize';

export const createOrder = async (req, res) => {
    const customer = await Customer().findOne({where: {codeCustomer: req.params.id}});
    if(!customer) return res.status(400).json({msg: "customer not found"});
    const {codeBranch, method, status, note} = req.body;
    try {
        const carts = await Cart().findAll({
            where: {
                [Op.and]: [{ customerID: customer.id}, {status: true} ]
            }
        });
        if(carts.length===0) return res.status(400).json({msg: "no item in cart"});
        let total=0;
        // get total price of cart
        for(const cart of carts) {
            const product = await Product().findOne({
                where: {
                    id: cart.productID
                }
            });
            total += product.price * cart.quantity
        }
        // add order
        const order = await Order().create({
            customerID: customer.id,
            codeBranch: codeBranch,
            method: method,
            status: status,
            total: total,
            note: note,
        });
        // add product to order detail
        for(const cart of carts) {
            const product = await Product().findOne({
                where: { id: cart.productID } 
            });
            await OrderDetail().create({
                orderID: order.id,
                productID: product.id,
                quantity: cart.quantity,
                total_price: product.price*cart.quantity
            }).then(
                // remove item in cart
                await Cart().destroy({
                    where: {
                        id: cart.id
                    }
                })
            );
        }
        res.status(201).json({msg: "create order successfully!"});
    } catch(error) {
        res.status(500).json({msg: error.message});
    }
}