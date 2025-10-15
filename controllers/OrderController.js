import OrdersModel from '../models/Orders.js';

export const fetch = async (_, res) => {
  try {
    const orders = await OrdersModel.find({});

    if (!orders) {
      return res.status(404).json({
        message: 'There are no orders',
      })
    }

    res.json(orders);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: 'No access',
    });
  }
}

export const create = async (req, res) => {
  try {
    const orders = new OrdersModel();
    const {
      title,
      description,
      date,
      products,
    } = req.body;

    orders.title = title;
    orders.description = description;
    orders.date = date;
    orders.products = products;

    const ordersData = await orders.save();

    res.json(ordersData);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: 'Failed to create personal information'
    })
  }
}

export const deleteOrder = async (req, res) => {
  try {
    const orderId = req.params.id;
    await OrdersModel.findByIdAndDelete(orderId);

    res.status(200).send(`Order with ID ${orderId} deleted successfully.`);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: 'No access',
    });
  }
}
