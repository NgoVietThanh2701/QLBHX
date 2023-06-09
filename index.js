import express from "express";
import cors from "cors";
import session  from "express-session";
import SequelizeStore from "connect-session-sequelize";
import dotenv from "dotenv";
import { connect } from "./config/Database";
//------------------- router admin
import branchRoute from "./routes/admin/BranchRoute";
import categoryRoute from "./routes/admin/CategoryRoute";
import managerRoute from "./routes/admin/ManagerRoute";
import productRoute from "./routes/admin/ProductRoute";
import staffRoute from "./routes/admin/StaffRoute";
import typeRoute from "./routes/admin/TypeRoute";
import warehouseRoute from "./routes/admin/WarehouseRoute";
import customerRoute from "./routes/admin/CustomerRoute";
import orderRoute from "./routes/admin/OrderRoute";
import authRoute from "./routes/admin/AuthRoute";
// ------------------- router user
import getRoute from './routes/user/getRouter';
import cartRoute from "./routes/user/CartRoute";

//root:3434 dn:3435 hcm:3436: hn:3437

dotenv.config();
const app = express();

// config keep session white login
const sessionStore = SequelizeStore(session.Store);
const store = new sessionStore({
    db: connect(process.env.PORT_DEFAULT)
});

app.use(session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: true,
    store: store, // store
    cookie: {
        secure: 'auto'
    }
}));

app.use(cors({
    credentials: true,
    origin: ['http://localhost:3000', 'http://localhost:3001']
}));
app.use(express.json());
app.use(express.static("public"));// show image url

// ------------------------- admin router
app.use('/admin', branchRoute);
app.use('/admin', warehouseRoute);
app.use('/admin', staffRoute);
app.use('/admin', categoryRoute);
app.use('/admin', managerRoute);
app.use('/admin', typeRoute);
app.use('/admin', productRoute);
app.use('/admin', customerRoute);
app.use('/admin', orderRoute);
app.use('/admin', authRoute);
// ------------------------- user router
app.use(getRoute);
app.use(cartRoute);

// create sessions to database
// store.sync(); 

app.listen(process.env.APP_PORT, () => {
    console.log('Server up and running...http://localhost:'+process.env.APP_PORT);
});