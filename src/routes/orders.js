const router = require('express').Router();
const { createOrder, getOrderById, updateOrderStatus } = require('../services/orderService');
const { validateCreateOrder } = require('../middleware/validate');

router.post('/', validateCreateOrder, async (req, res, next) => {
  try {
    const order = await createOrder(req.body);
    res.status(201).json(order);
  } catch (err) { next(err); }
});

router.get('/:id', async (req, res, next) => {
  try {
    const order = await getOrderById(req.params.id);
    res.status(200).json(order);
  } catch (err) { next(err); }
});

router.patch('/:id/status', async (req, res, next) => {
  try {
    const { status } = req.body;
    if (!status) return res.status(400).json({ error: 'status is required', code: 'MISSING_FIELD' });
    const order = await updateOrderStatus(req.params.id, status);
    res.status(200).json(order);
  } catch (err) { next(err); }
});

module.exports = router;
