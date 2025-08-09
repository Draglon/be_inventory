import ProductsModel from '../models/Products.js';

export const fetch = async (_, res) => {
  try {
    const products = await ProductsModel.find({});

    if (!products) {
      return res.status(404).json({
        message: 'Продукты отсутствуют',
      })
    }

    res.json(products);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: 'Нет доступа',
    });
  }
}

export const create = async (req, res) => {
  try {
    const products = new ProductsModel();
    const {
      title,
      type,
      serialNumber,
      isNew,
      photo,
      specification,
      guarantee,
      date,
      price,
    } = req.body;

    products.title = title;
    products.type = type;
    products.serialNumber = serialNumber;
    products.isNew = isNew;
    products.photo = photo;
    products.specification = specification;
    products.guarantee = guarantee;
    products.date = date;
    products.price = price;

    const productsData = await products.save();

    res.json(productsData);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: 'Не удалось создать персональную информацию'
    })
  }
}

export const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    await ProductsModel.findByIdAndDelete(productId);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: 'Нет доступа',
    });
  }
}
