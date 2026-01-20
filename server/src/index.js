import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { ObjectId } from 'mongodb';
import { getDb } from './db.js';

const app = express();

app.use(express.json({ limit: '2mb' }));
app.use(
  cors({
    origin: true, // allow all localhost origins during development
    credentials: true
  })
);

app.get('/health', async (_req, res) => {
  try {
    const db = await getDb();
    await db.command({ ping: 1 });
    res.json({ ok: true });
  } catch (e) {
    res.status(500).json({ ok: false, error: e?.message || 'healthcheck failed' });
  }
});

// PRODUCTS
app.get('/api/products', async (_req, res) => {
  const db = await getDb();
  const products = await db.collection('products').find({}).sort({ createdAt: -1 }).toArray();
  res.json(products);
});

app.post('/api/products', async (req, res) => {
  const db = await getDb();
  const product = req.body || {};

  if (!product.name || product.price == null || !product.category || !product.farmerEmail) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const doc = {
    name: product.name,
    price: Number(product.price),
    category: product.category,
    quantity: Number(product.quantity ?? 0),
    farmerName: product.farmerName || product.farmerEmail,
    farmerEmail: product.farmerEmail,
    imageUrl: product.imageUrl || '',
    createdAt: new Date()
  };

  const result = await db.collection('products').insertOne(doc);
  const saved = await db.collection('products').findOne({ _id: result.insertedId });
  res.status(201).json(saved);
});

app.put('/api/products/:id', async (req, res) => {
  const db = await getDb();
  const { id } = req.params;
  const patch = req.body || {};

  if (!ObjectId.isValid(id)) return res.status(400).json({ error: 'Invalid id' });

  const update = {
    ...(patch.name != null ? { name: patch.name } : {}),
    ...(patch.price != null ? { price: Number(patch.price) } : {}),
    ...(patch.category != null ? { category: patch.category } : {}),
    ...(patch.quantity != null ? { quantity: Number(patch.quantity) } : {}),
    ...(patch.imageUrl != null ? { imageUrl: patch.imageUrl } : {}),
    updatedAt: new Date()
  };

  await db.collection('products').updateOne({ _id: new ObjectId(id) }, { $set: update });
  const saved = await db.collection('products').findOne({ _id: new ObjectId(id) });
  res.json(saved);
});

app.delete('/api/products/:id', async (req, res) => {
  const db = await getDb();
  const { id } = req.params;
  if (!ObjectId.isValid(id)) return res.status(400).json({ error: 'Invalid id' });

  await db.collection('products').deleteOne({ _id: new ObjectId(id) });
  res.json({ ok: true });
});

// ORDERS
app.get('/api/orders', async (req, res) => {
  const db = await getDb();
  const { farmerEmail, consumerEmail } = req.query;

  const query = {};
  if (consumerEmail) query.consumerEmail = consumerEmail;
  if (farmerEmail) query['items.farmerEmail'] = farmerEmail;

  const orders = await db.collection('orders').find(query).sort({ createdAt: -1 }).toArray();
  res.json(orders);
});

app.post('/api/orders', async (req, res) => {
  const db = await getDb();
  const order = req.body || {};

  if (!order.consumerEmail || !Array.isArray(order.items) || order.items.length === 0) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const doc = {
    consumerEmail: order.consumerEmail,
    consumerName: order.consumerName || order.consumerEmail,
    items: order.items.map((i) => ({
      productId: i.productId,
      name: i.name,
      price: Number(i.price),
      quantity: Number(i.quantity),
      farmerName: i.farmerName,
      farmerEmail: i.farmerEmail,
      category: i.category,
      imageUrl: i.imageUrl || ''
    })),
    subtotal: Number(order.subtotal ?? 0),
    status: 'pending',
    createdAt: new Date()
  };

  const result = await db.collection('orders').insertOne(doc);
  const saved = await db.collection('orders').findOne({ _id: result.insertedId });
  res.status(201).json(saved);
});

const port = Number(process.env.PORT || 5000);
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`API listening on http://localhost:${port}`);
});

