const express = require("express");
const { GetOrdersByUserId } = require("../controllers/OrdersController");
const router = express.Router();

router.get("/user/:userId", GetOrdersByUserId);

module.exports = router;
