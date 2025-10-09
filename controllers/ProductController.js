import ProductsModel from '../models/Products.js';

export const fetch = async (_, res) => {
  try {
    const products = await ProductsModel.find({});

    if (!products) {
      return res.status(404).json({
        message: 'There are no products',
      })
    }

    res.json(products);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: 'No access',
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
      message: 'Failed to create personal information'
    })
  }
}

export const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    await ProductsModel.findByIdAndDelete(productId);

    res.status(200).send(`Product with ID ${productId} deleted successfully.`);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: 'No access',
    });
  }
}
