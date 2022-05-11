const util = require("util");

const UserModel = require("./models/User.model");
const ProductModel = require("./models/Product.model");
const OrderModel = require("./models/Order.model");

module.exports = async () => {
  try {
    await UserModel.deleteMany();
    await ProductModel.deleteMany();
    await OrderModel.deleteMany();

    // 1. Criar um novo usuário
    const user = await UserModel.create({
      name: "José da Silva",
      email: "jose@silva.com",
      password: "senha@123",
    });

    console.log("Usuário criado => ", user);

    // 2. Criar produtos
    const products = await ProductModel.insertMany([
      {
        name: "Iphone 13",
        description: "Nosso sistema de câmera dupla mais avançado até hoje.",
        inStock: 10,
        price: 15000,
        pictureUrl:
          "https://www.apple.com/v/iphone-13/f/images/overview/hero/hero_1_static__feiuc1zaeiaa_large.jpg",
      },
      {
        name: "Macbook Air",
        description:
          "O chip M1 da Apple revolucionou nosso notebook mais fino e leve. A CPU e a GPU estão mais rápidas, até 3,5 vezes e até cinco vezes, respectivamente. Nosso Neural Engine avançado deixa o aprendizado de máquina até nove vezes mais veloz. A bateria oferece mais tempo de duração. E trocamos a ventoinha pelo silêncio. Nunca tanto desempenho esteve reunido em um MacBook Air.",
        inStock: 3,
        price: 25000,
        pictureUrl:
          "https://www.apple.com/v/macbook-air/n/images/overview/hero_endframe__ea0qze85eyi6_large.jpg",
      },
    ]);

    console.log("Produtos criados => ", products);

    // 3. Criando um pedido

    const order = await OrderModel.create({
      userId: user._id, // Passando o _id do usuário criado anteriormente
      products: [{ productId: products[1]._id, quantity: 1 }], // Passando o _id do segundo produto criado pelo insertMany()
    });

    console.log("Pedido criado => ", order);

    // 4. Populando automaticamente referências

    const myOrders = await OrderModel.findOne({ _id: order._id }).populate(
      "products.productId"
    );

    console.log("Pedido populado => ", util.inspect(myOrders, { depth: null }));
  } catch (err) {
    console.error("seed error => ", err);
  }
};
