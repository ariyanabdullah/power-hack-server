const Bill = require("../models/billing");

const addBilling = async (req, res) => {
  try {
    await Bill.create(req.body.userInfo);
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(404).json({ message: "Internal Server Problem" });
  }
};

const getBilling = async (req, res) => {
  const email = req.query.email;
  // new code
  const page = parseInt(req.query.page);
  const size = parseInt(req.query.size);
  // new code
  const phone = req.query.phone;
  const name = req.query.name;

  if (email || phone || name) {
    const cursor = await Bill.find({
      $or: [{ email: email }, { phone: phone }, { FullName: name }],
    })
      .sort({ date: -1 })
      .skip(page * size)
      .limit(size);
    const count = await Bill.estimatedDocumentCount();

    if (cursor) {
      res.status(200).send({ cursor, count });
    } else {
      res.status(404).send({ message: "Data Not Found" });
    }
  } else {
    const cursor = await Bill.find({})
      .sort({ date: -1 })
      .skip(page * size)
      .limit(size);

    const count = await Bill.estimatedDocumentCount();

    if (cursor) {
      res.status(200).send({ cursor, count });
    } else {
      res.status(404).send({ message: "Data Not Found" });
    }
  }
};

const updateBill = async (req, res) => {
  try {
    await Bill.findOneAndUpdate({ _id: req.params.id }, req.body);
    // const result = await Bill.findOne({ _id: req.params.id });
    res.status(200).send({ success: true });
  } catch (error) {
    res.status(404).send({ error });
  }
};

const deleteBill = async (req, res) => {
  const bill = await Bill.findById(req.params.id);

  if (!bill) {
    return res.status(404).send({ message: "Bill Not Found" });
  }

  await bill.remove();
  res.status(200).send({ message: "Deleted SuccessFull" });
};

module.exports = { addBilling, getBilling, updateBill, deleteBill };
