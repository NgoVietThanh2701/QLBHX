import { Order } from "../models/admin/OrderModel";
import { Customer } from "../models/admin/CustomerModel";
import { Cart } from "../models/admin/CartModel";
import { Product } from "../models/admin/ProductModel";
import {OrderDetail} from "../models/admin/OrderDetailModel";
import { Op } from 'sequelize';
import { Branch } from "../models/admin/BranchModel";
import { Warehouse } from "../models/admin/WarehouseModel";
import { Type } from "../models/admin/TypeModel";
import { PhotoProduct } from "../models/admin/PhotoProductModel";

export const createOrder = async (req, res) => {
    if(!req.userID) return res.status(400).json({msg: "please login!"});
    const { method, costShip, note } = req.body;
    try {
        const carts = await Cart().findAll({
            where: {
                [Op.and]: [{ customerID: req.userID}, {status: true} ]
            },
            include: {
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
                    }
                ]
            }
        
        });
        if(carts.length === 0) return res.status(400).json({msg: "no item in cart"});
        let total = 0;
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
            customerID: req.userID,
            codeBranch: carts[0].Product.Warehouse.Branch.codeBranch,
            method: method,
            // status: status,
            totalMoney: total,
            costShip: costShip,
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
                total_price: product.price*cart.quantity,
                classify: cart.classify
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

export const getOrders = async (req, res) => {
    try {
        const orders = await Order(req.port_cn).findAll({
            attributes: ['id', 'method', 'status', 'totalMoney', 'note', 'costShip', 'createdAt'],
            include: [
                {
                    model: Branch(),
                    attributes: ["codeBranch", "name", "address"]
                },
                {
                    model: Customer(),
                    attributes: ["codeCustomer", "name", "email"]
                }
            ]
        });
        res.status(200).json(orders);
    } catch(error) {
        res.status(500).json({msg: error.message});
    } 
}

export const getOrderDetail = async (req, res) => {
    try {
        const order_detail = await OrderDetail(req.port_cn).findAll({
            attributes: ['id', 'quantity', 'total_price', "classify", 'createdAt'],
            where: {orderID: req.params.id},
            include: [
                {
                    model: Order()
                },
                {
                    model: Product(),
                    include: {
                        model: PhotoProduct()
                    }
                }
            ]
        });
        res.status(200).json(order_detail);
    } catch(error) {
        res.status(500).json({msg: error.message});
    }
}