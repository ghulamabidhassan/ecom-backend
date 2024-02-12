const Orders = () => {
  return (
    <div className="product-data">
      <table border="1" style={{ padding: "1em", margin: "1em" }}>
        <tr>
          <th>Product Name</th>
          <th>Product ID</th>
          <th>Order ID</th>
          <th>Price</th>
          <th>Edit</th>
        </tr>
        <tr>
          <td>Shirt </td>
          <td>358544</td>
          <td>358544</td>
          <td>$10.00</td>
          <td>
            <img className="edit-svg" src="../public/edit.svg" alt="" />
          </td>
        </tr>
        <tr>
          <td>Shirt</td>
          <td>358544</td>
          <td>358544</td>
          <td>$10.00</td>
          <td>
            <img className="edit-svg" src="../public/edit.svg" alt="" />
          </td>
        </tr>
        <tr>
          <td>Shirt</td>
          <td>358544</td>
          <td>358544</td>
          <td>$10.00</td>
          <td>
            <img className="edit-svg" src="../public/edit.svg" alt="" />
          </td>
        </tr>
      </table>
    </div>
  );
};

export default Orders;
