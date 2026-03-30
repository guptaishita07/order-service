const validateCreateOrder = (req, res, next) => {
  const { customerId, items } = req.body;
  if (!customerId) return res.status(400).json({ error: 'customerId is required', code: 'MISSING_FIELD' });
  if (!Array.isArray(items) || items.length === 0) return res.status(400).json({ error: 'items must be a non-empty array', code: 'MISSING_FIELD' });
  for (const item of items) {
    if (!item.productId || !item.price || !item.quantity)
      return res.status(400).json({ error: 'Each item needs productId, price, quantity', code: 'INVALID_ITEM' });
  }
  next();
};

module.exports = { validateCreateOrder };