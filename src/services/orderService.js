const pool = require('../db/mysqlDb');

class OrderNotFoundError extends Error {
  constructor(id) {
    super(`Order ${id} not found`);
    this.code = 'ORDER_NOT_FOUND';
  }
}

const createOrder = async (body) => {
  const { customerId, items } = body;
  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const [result] = await pool.execute(
    'INSERT INTO orders (customer_id, items, total) VALUES (?, ?, ?)',
    [customerId, JSON.stringify(items), total]
  );
  return getOrderById(result.insertId);
};

const getOrderById = async (id) => {
  const [rows] = await pool.execute(
    'SELECT * FROM orders WHERE id = ?',
    [id]
  );
  if (rows.length === 0) throw new OrderNotFoundError(id);
  const order = rows[0];
  order.items = typeof order.items === 'string' ? JSON.parse(order.items) : order.items;
  return order;
};

module.exports = { createOrder, getOrderById, OrderNotFoundError };
