let first = () => {
  return true;
};
let second = () => {
  return true;
};

let check = first() && second();

// console.log(check);

const obj = {
  productname: "shirt test 5 REPLACED",
  quantity: 10,
  totalprice: 18,
  paid: true,
  refund: false,
  itemid: 5,
};

console.log(Object.entries(obj).flat().toString());
