const { Product } = require("../model/Product");

exports.createProduct = async (req, res) => {
  // this product we have to get from API body
  const product = new Product(req.body);
  try {
    const response = await product.save();
    console.log(response);
    res.status(201).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.fetchAllProducts = async (req, res) => {
  // here we need all the query string

  //filter = {"category": ["smartphone","laptops"]}
  //sort = {_sort:"price",_order:"desc"}
  //pagination = {_page:1,_limit=10}

  // TODO : we have to try with multiple category and brands and change in front-end
  // TODO: Server will filter deleted products in case of non-admin

  let condition = {}
  if(!req.query.admin){
    condition.deleted = {$ne:true}
  }
  
  let query = Product.find(condition);
  let totalProductsQuery = Product.find(condition);
  if (req.query.category) {
    query = query.find({ category: req.query.category });
    totalProductsQuery = totalProductsQuery.find({
      category: req.query.category,
    });
  }
  if (req.query.brand) {
    query = query.find({ brand: req.query.brand });
    totalProductsQuery = totalProductsQuery.find({ brand: req.query.brand });
  }
  //TODO: How to get sort on discounted Price not on Actual price
  if (req.query._sort && req.query._order) {
    query = query.sort({ [req.query._sort]: req.query._order });
  }
  
  const totalDocs = await totalProductsQuery.count().exec();
  console.log({ totalDocs });

  if (req.query._page && req.query._limit) {
    const pageSize = req.query._limit;
    const page = req.query._page;
    query = query.skip(pageSize * (page - 1)).limit(pageSize);
  }

  try {
    const docs = await query.exec();
    res.set("X-TOTAL-COUNT", totalDocs);
    console.log(docs);
    res.status(200).json(docs);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Bad Request" });
  }
};

exports.fetchProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    console.log(product);
    res.status(200).json(product);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Bad Request" });
  }
};

exports.updateProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    console.log(product);
    res.status(200).json(product);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Bad Request" });
  }
};
