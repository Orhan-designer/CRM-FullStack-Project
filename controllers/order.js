const Order = require("../models/Order");
const errorHandler = require("../utils/errorHandler");

//(get) localhost:3500/api/order?offset=2&limit=5
module.exports.getAll = async (req, res) => {
  const query = {
    user: req.user.id,
  }; /* тут мы будем спрашивать, все те заказы, которые нам нужны, которые
  относятся только к тому юзеру, который спрашивает текущий роут */

  //Дата старта
  if (req.query.start) {
    query.date = {
      //Больше или равно(greater or equal)
      $gte: req.query.start,
    };
  }

  //Дата конца
  if (req.query.end) {
    if (!query.date) {
      query.date = {};
    }
    //Меньше или равно(less then equal)
    query.date["$lte"] = req.query.end;
  }

  if (req.query.order) {
    query.order = +req.query.order; //приводим к числу через оператор +
  } //хотим получить какой определённый номер заказа

  try {
    const orders = await Order.find(query)
      .sort({ date: -1 })
      .skip(+req.query.offset) //приводим к числу через оператор +
      .limit(+req.query.limit); /* в объекте query хранятся данные после
      знака вопроса(?) ?offset=2&limit=5 который мы будем доставать*/
    res.status(200).json(orders);
  } catch (error) {
    errorHandler(res, error);
  }
}; /* здесь нам нужно получить список всех заказов, для того чтобы, в последствии
отобразить на странице истории*/

module.exports.create = async (req, res) => {
  try {
    const lastOrder = await Order.findOne({ user: req.user.id }).sort({
      date: -1 /* таким образом мы будем знать, что первый заказ нам попадётся
      с самой новой датой, и соответственно нам это будет означать, что мы получили последний заказ*/,
    }); //достаём все заказы, которые создал пользователь

    const maxOrder = lastOrder
      ? lastOrder.order
      : 0; /* если у нас не будет никаких заказов 
    в таблице, и мы добавляем первый заказ, переменная maxOrder будет принимать в себе значение 0 
    и далее, когда мы будем создавать его, она будет принимать значение 1, то есть maxOrder + 1*/

    const order = await new Order({
      list: req.body.list,
      user: req.user.id,
      order: maxOrder + 1,
    }).save();
    res.status(201).json(order); //отправляем обратно клиентской стороне order
  } catch (error) {
    errorHandler(res, error);
  }
};
