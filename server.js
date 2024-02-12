import express from "express";
import {
  logIn,
  authMiddleware,
  signUp,
  testConnection,
  insertProduct,
  getProducts,
  productMiddleware,
  editProduct,
  editOrder,
} from "./functions.js";

const app = express();
const router = express.Router();

app.listen(5000, () => {
  console.log("server running");
});

app.use(express.json());
app.use("/", router);

router.post("/login", logIn);
router.post("/signup", signUp);
router
  .route("/product")
  .get(productMiddleware, getProducts)
  .post(productMiddleware, insertProduct);
router.route("/test").get(testConnection).post(testConnection);
router.route("/editproduct").post(editProduct);
router.route("/editorder").post(editOrder);
