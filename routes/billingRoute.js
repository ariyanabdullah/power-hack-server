const express = require("express");
const {
  getBilling,
  addBilling,
  updateBill,
  deleteBill,
} = require("../controller/billingController");
const { checkUser } = require("../middleware/middleWare");
const router = express.Router();

router.route("/billing-list").get(getBilling);
router.route("/add-billing").post(checkUser, addBilling);
router.route("/update-billing/:id").put(checkUser, updateBill);
router.route("/delete-billing/:id").delete(checkUser, deleteBill);

module.exports = router;
