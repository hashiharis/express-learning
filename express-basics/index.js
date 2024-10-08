// Importing express library
const express = require("express");

// Creating an instance named app of the express method
const app = express();

// Assigining a port number
const PORT = 8000;
// 3000,8000,3001,8080->commonly used port no's
// let products=[
//     {
//         title:"product1",
//         category:"furniture"
//     },
//     {
//         title:"product2",
//         category:"electronics"
//     },
//     {
//         title:"product3",
//         category:"fashion"
//     }
// ]
app.get("/", (req, res) => {
  res.send("I am here");
});

app.post("/products", (req, res) => {
  res.json({
    productsData: products,
  });
});

app.patch("/", (req, res) => {
  res.send("this method is used for edit operation");
});

app.put("/", (req, res) => {
  res.send("this method is also used for edit operation");
});

app.delete("/", (req, res) => {
  res.send("this method is used for delete operation");
});

let products = [
  {
    id: 1,
    title: "Product1",
    price: 100,
    category: "furniture",
  },
  {
    id: 2,
    title: "Product2",
    price: 200,
    category: "electronics",
  },
  {
    id: 3,
    title: "Product3",
    price: 300,
    category: "beauty",
  },
  {
    id: 4,
    title: "Product4",
    price: 400,
    category: "clothing",
  },
  {
    id: 5,
    title: "Product5",
    price: 500,
    category: "furniture",
  },
  {
    id: 6,
    title: "Product6",
    price: 600,
    category: "electronics",
  },
  {
    id: 7,
    title: "Product7",
    price: 700,
    category: "beauty",
  },
];

// Query Params=>for filtering data based on conditions in the request.
app.get("/products", (req, res) => {
  console.log("req=>", req.query);
  const { category, price, lowerPrice, higherPrice } = req.query;
  let filteredProducts = products;

  if (category) {
    filteredProducts = filteredProducts.filter(
      (product) => product.category === category
    );
  }
  if (price) {
    filteredProducts = filteredProducts.filter(
      (product) => product.price == price
    );
  }
  if (lowerPrice) {
    filteredProducts = filteredProducts.filter(
      (product) => product.price >= lowerPrice
    );
  }
  if (higherPrice) {
    filteredProducts = filteredProducts.filter(
      (product) => product.price <= higherPrice
    );
  }
  if (lowerPrice && higherPrice) {
    filteredProducts = filteredProducts.filter(
      (product) => product.price >= lowerPrice && product.price <= higherPrice
    );
  }
  if (filteredProducts.length==0) {
    return res
      .status(404)
      .json({ message: "Products Data not found", productDeatils: [] });
  }
  res.json({ productDetails: filteredProducts });
});

app.get("/products/:id", (req, res) => {
  const { id } = req.params;
  console.log("params=>", req.params);
  const product = products.find((p) => p.id == id);
  return res.json({ product });
});
// Starting the server
app.listen(PORT, () => {
  console.log("Server started at port no", PORT);
});
