import OrdersModel from '../models/Orders.js';

export const fetch = async (_, res) => {
  try {
    const orders = await OrdersModel.find({});

    if (!orders) {
      return res.status(404).json({
        message: 'Продукты отсутствуют',
      })
    }

    res.json(orders);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: 'Нет доступа',
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
    } = req.body;

    orders.title = title;
    orders.description = description;
    orders.date = date;

    const ordersData = await orders.save();

    res.json(ordersData);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: 'Не удалось создать персональную информацию'
    })
  }
}

export const deleteOrder = async (req, res) => {
  try {
    const orderId = req.params.id;
    await OrdersModel.findByIdAndDelete(orderId);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: 'Нет доступа',
    });
  }
}
