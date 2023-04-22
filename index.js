import express from "express";
import cors from "cors";
import session  from "express-session";
import SequelizeStore from "connect-session-sequelize";
import FileUpload from "express-fileupload";
//-------------------router
import branchRoute from "./routes/admin/BranchRoute";
import categoryRoute from "./routes/admin/CategoryRoute";
import managerRoute from "./routes/admin/ManagerRoute";
import productRoute from "./routes/admin/ProductRoute";
import staffRoute from "./routes/admin/StaffRoute";
import typeRoute from "./routes/admin/TypeRoute";
import warehouseRoute from "./routes/admin/WarehouseRoute";
import customerRoute from "./routes/admin/CustomerRoute";
import orderRoute from "./routes/admin/OrderRoute";
import orderDetailRoute from "./routes/admin/OrderDetailRoute";
import cartRoute from "./routes/admin/CartRoute";
import dotenv from "dotenv";

dotenv.config();
const app = express();

app.use(session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: 'auto'
    }
}));

app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}));
app.use(express.json());
app.use(FileUpload()); //upload file
app.use(express.static("public"));// show image url

app.use('/admin', branchRoute);
app.use('/admin', warehouseRoute);
app.use('/admin', staffRoute);
app.use('/admin', categoryRoute);
app.use('/admin', managerRoute);
app.use('/admin', typeRoute);
app.use('/admin', productRoute);
app.use('/admin', customerRoute);
app.use('/admin', orderRoute);
app.use('/admin', orderDetailRoute);
app.use('/admin', cartRoute);


app.listen(process.env.APP_PORT, () => {
    console.log('Server up and running...http://localhost:'+process.env.APP_PORT);
});