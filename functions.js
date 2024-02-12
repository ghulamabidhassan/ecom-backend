import mysql from "mysql2";
import jwt from "jsonwebtoken";
import { nanoid } from "nanoid";
import { json } from "express";

// create connection to mysql database
const pool = mysql
  .createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "testdatabase",
    waitForConnections: true,
    connectionLimit: 10,
  })
  .promise();

// check username if exist in database
const checkUser = async (username) => {
  const [result] = await pool.query(`select * from user where username = ?`, [
    username,
  ]);
  if (result.length != 0) {
    return true;
  } else {
    return false;
  }
};

//check password if exist in database
const checkPassword = async (password) => {
  const [result] = await pool.query(`select * from user where password = ?`, [
    password,
  ]);
  if (result.length != 0) {
    return true;
  } else {
    return false;
  }
};

const checkDesignation = async (username) => {
  const [result] = await pool.query(
    `select designation from user where username = ?`,
    [username]
  );

  if (result[0]?.designation) {
    return result[0]?.designation;
  } else {
    return false;
  }
};

// check username & password from database which returns true or false
// combine username & password to isLogin variable
//if isLogin is true return jwt token
//if isLogin is false return error msg for credentials
const logIn = async (req, res) => {
  let { username, password } = req.body;
  let userCheck = await checkUser(username);
  let userPassword = await checkPassword(password);
  let userDesignation = await checkDesignation(username);
  let isLogin = userCheck && userPassword;
  if (isLogin) {
    let token = jwt.sign(
      { username, designation: userDesignation },
      "123456789",
      {
        expiresIn: "24h",
      }
    );
    res.json({
      status: 200,
      username,
      designation: userDesignation,
      token,
      isLogin,
    });
  } else {
    res.json({ status: 401, isLogin, message: "check the credentials" });
  }
};

// get data from body
// create a unique id
// check username is already exist in database, return errror
// if nor create a new row with new user details
// send it to front end along with the token
const signUp = async (req, res) => {
  let { username, password } = req.body;
  let uid = nanoid(7);
  let userCheck = await checkUser(username);

  if (userCheck) {
    res.json({ msg: "username is already available" });
  } else {
    await pool.query(
      `insert into user (username, password, designation, assigntable, uid) values (?,?,?,?,?)`,
      [username, password, "user", "", uid]
    );
    let token = jwt.sign({ username }, "123456789", { expiresIn: "24h" });
    let [login] = await pool.query(`select * from user where uid = ?`, [uid]);
    res.json({ isLogin: true, token, ...login });
  }
};

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.json({ status: 200, message: "no token available" });
    return;
  }
  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, "123456789");
    const { username } = decoded;
    req.body = { username, isLogin: true };
    next();
  } catch (error) {
    res.json({ msg: "incorrect token", isLogin: false });
  }
};

const productMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.json({ status: 200, message: "no token available" });
    return;
  }
  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, "123456789");
    next();
  } catch (error) {
    res.json({ msg: "incorrect token", isLogin: false });
  }
};

const getProducts = async (req, res) => {
  const [data] = await pool.query(`select * from product`);
  res.json(data[0]);
};

const getProduct = async (shortID) => {
  const [data] = await pool.query(`select * from product where shortID = ?`, [
    shortID,
  ]);

  return data[0];
};

const insertProduct = async (req, res) => {
  let shortId = nanoid(8);
  const { productname, quantity, totalprice, paid, refund } = req.body;
  await pool.query(
    `insert into product (productname, shortID, quantity, totalprice, paid, refund) 
  values (?,?,?,?,?,?)`,
    [productname, shortId, quantity, totalprice, paid, refund]
  );
  let product = await getProduct(shortId);
  res.json({ ...product, shortId });
};

const dashboard = async (req, res) => {
  res.send(req.body);
};

//usertype and productId is required to edit the data table
const editProduct = async (req, res) => {
  const { user, product } = req.body;
  if (user === "admin" || user === "supervisor") {
    const { productname, shortID, quantity, totalprice, paid, refund } =
      product;
    await pool.query(
      `update product set productname = ?, quantity = ?, totalprice = ?, paid = ?, refund = ? where shortID = ?`,
      [productname, quantity, totalprice, paid, refund, shortID]
    );
    const [data] = await pool.query(`select * from product where shortID = ?`, [
      shortID,
    ]);
    res.json(data);
  } else {
    res.json({ msg: "no access to edit product" });
  }
};

//usertype orderID and itemId is required to edit the order
const editOrder = async (req, res) => {
  const { user, orderId, product, "item-id": itemId } = req.body;
  if (user === "admin" || user === "supervisor") {
    const newProduct = Object.entries(product).flat();
    const [data] = await pool.query(
      `update orders
    set items = JSON_REPLACE(items, '$[?]', JSON_OBJECT(?)) where orderId = ?`,
      [itemId - 1, newProduct, orderId]
    );
    res.json(data);
  } else {
    res.json({ msg: "no access to edit order" });
  }
};

const testConnection = async (req, res) => {
  const items = Object.entries(req.body).flat();
  console.log(items);
  // console.log(items);
  const shortID = nanoid(8);
  // const [data] = await pool.query(
  //   `insert into orders (orderId, items) values (?,?)`,
  //   [shortID, items]
  // );
  const [data] = await pool.query(
    `select items from orders where orderId = 'L_cGcW_8'`
  );

  // const [data] = await pool.query(
  //   `update orders
  // set items = JSON_REPLACE(items, '$[?]', JSON_OBJECT(?)) where orderId = ?`,
  //   [3 - 1, items, "L_cGcW_8"]
  // );
  res.json(data);
};

export {
  logIn,
  signUp,
  authMiddleware,
  testConnection,
  dashboard,
  insertProduct,
  getProducts,
  productMiddleware,
  editProduct,
  editOrder,
};
