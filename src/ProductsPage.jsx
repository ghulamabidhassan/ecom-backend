import { useState } from "react";
import { nanoid } from "nanoid";
import sampleImg from "../public/productsample.png";

const ProductsPage = () => {
  const [add, setAdd] = useState(false);
  const [data, setData] = useState([
    {
      productName: "shirt 1",
      productId: "shirt-1",
      price: 5.0,
      quantity: 5,
    },
    {
      productName: "shirt 2",
      productId: "shirt-2",
      price: 10.0,
      quantity: 3,
    },
    {
      productName: "shirt 3",
      productId: "shirt-3",
      price: 15.0,
      quantity: 10,
    },
  ]);
  const [order, setOrder] = useState({
    productName: "",
    quantity: "",
    totalPrice: "",
    paid: "",
    refund: 0,
    orderId: "",
  });
  const [newProduct, setNewProduct] = useState({
    productName: "",
    productId: "",
    price: 0,
    quantity: 0,
  });

  const placeOrder = (e) => {
    const parent = e.currentTarget.parentElement;
    const totalQty = parent.querySelector("select").value;
    const productId = e.currentTarget.parentElement.dataset.id;
    const qunatity = totalQty;
    const price = parent.querySelector(".price").textContent.slice(1);
    const newOrder = {
      productId,
      qunatity,
      totalPrice: price * totalQty,
      paid: price * totalQty,
      refund: 0,
      orderId: nanoid(5),
    };
    setOrder(newOrder);
  };

  const addNewProduct = (e) => {
    let name = e.currentTarget.dataset.id;
    let value = e.currentTarget.value;
    let productId = nanoid(5);
    setNewProduct({ ...newProduct, [name]: value, productId });
  };

  const addProduct = () => {
    setData([...data, newProduct]);
    setAdd(!add);
    setNewProduct({});
  };

  return (
    <div className="orders">
      <div
        style={{
          margin: "1em",
          padding: "1em",
          border: "1px solid black",
          width: "fit-content",
        }}
      >
        {!add && (
          <button
            onClick={() => {
              setAdd(!add);
            }}
          >
            Add New Product
          </button>
        )}
        {add && (
          <div>
            <div>
              <label htmlFor="">Product Name</label>
              <input
                onChange={addNewProduct}
                data-id="productName"
                type="text"
              />
            </div>
            <div>
              <label htmlFor="">Quantity</label>
              <input
                onChange={addNewProduct}
                data-id="quantity"
                type="number"
              />
            </div>
            <div>
              <label htmlFor="">Product Price</label>
              <input onChange={addNewProduct} data-id="price" type="number" />
            </div>
            <button onClick={addProduct}>Add Product</button>
          </div>
        )}
      </div>
      <div className="products">
        {data.map((item, idx) => {
          const { productId, productName, price } = item;
          return (
            <div key={idx} data-id={productId} className="product">
              <h2 className="title">{productName}</h2>
              <img className="product-image" src={sampleImg} alt="" />
              <h4 className="price">$ {price}</h4>
              <select name="" id="">
                <option selected value="1">
                  1
                </option>
                <option value="2">2</option>
                <option value="3">3</option>
              </select>
              <button onClick={placeOrder}>Place Order</button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductsPage;
