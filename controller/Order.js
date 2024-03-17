const { Order } = require("../model/Order");

exports.fetchOrdersByUser = async (req, res) => {
  // const { user } = req.query;
  try {
    const orders = await Order.find({})
    res.status(200).json(orders);
  } catch (error) {
    res.status(400).json({ error: "Bad Request Buddy" });
  };
};

exports.createOrder = async (req, res) => {
  // this cart we have to get from the API body
  const order = new Order(req.body);
  try {
    const doc = await order.save();
    res.status(201).json(doc);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.updateOrder = async (req, res) => {
  const { id } = req.params;

  try {
    const order = await Order.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(order);
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.deleteOrder = async (req, res) => {
  // this cart we have to get from the API body
  const { id } = req.params;
  try {
    const order = await Order.findByIdAndDelete(id);
    res.status(200).json(order);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.fetchAllOrders = async (req, res) => {
  // here we need all the query string

  //sort = {_sort:"price",_order:"desc"}
  //pagination = {_page:1,_limit=10}


  let query = Order.find({deleted: {$ne: true}});
  let totalOrdersQuery = Order.find({deleted: {$ne: true}});



  if (req.query._sort && req.query._order) {
    query = query.sort({ [req.query._sort]: req.query._order });
  }
  
  const totalDocs = await totalOrdersQuery.count().exec();
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
