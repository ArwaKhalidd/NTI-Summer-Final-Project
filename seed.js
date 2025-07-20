const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
require('dotenv').config();

// Models
const User = require('./models/User');
const Product = require('./models/Product');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ecommerce');
    console.log('MongoDB connected');
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1);
  }
};

const seedData = async () => {
  try {
    // Clear existing data
    await User.deleteMany({});
    await Product.deleteMany({});

    // Create admin user
    const adminPassword = await bcrypt.hash('password', 10);
    const admin = new User({
      name: 'Admin User',
      email: 'admin@example.com',
      password: adminPassword,
      role: 'admin'
    });
    await admin.save();

    // Create regular user
    const userPassword = await bcrypt.hash('password', 10);
    const user = new User({
      name: 'John Doe',
      email: 'user@example.com',
      password: userPassword,
      role: 'user'
    });
    await user.save();

    // Sample products
    const products = [
{
  name: 'Hydrating Face Serum',
  description: 'Vitamin C serum for radiant, glowing skin',
  price: 29.99,
  category: 'skincare',
  quantity: 18,
  image: 'https://images.unsplash.com/photo-1600718373606-bd5df89fd58a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60'
},
{
  name: 'Gentle Foaming Cleanser',
  description: 'Daily cleanser for all skin types, sulfate-free',
  price: 19.50,
  category: 'skincare',
  quantity: 25,
  image: 'https://images.unsplash.com/photo-1600185365850-002aa6d6cf1a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60'
},
{
  name: 'SPF 50 Sunscreen Lotion',
  description: 'Non-greasy sun protection for face and body',
  price: 22.99,
  category: 'skincare',
  quantity: 30,
  image: 'https://images.unsplash.com/photo-1613058083904-0f47f81a65f0?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60'
},
{
  name: 'Night Repair Cream',
  description: 'Anti-aging cream with retinol and peptides',
  price: 49.99,
  category: 'skincare',
  quantity: 10,
  image: 'https://images.unsplash.com/photo-1588776814546-daa9d1d6a9c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60'
},
{
  name: 'Cooling Eye Gel',
  description: 'Soothes puffy eyes and reduces dark circles',
  price: 15.75,
  category: 'skincare',
  quantity: 20,
  image: 'https://images.unsplash.com/photo-1605733515556-7c1d7cdcfb95?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60'
},

     {
  name: 'Keratin Shampoo',
  description: 'Sulfate-free shampoo for strong, shiny hair',
  price: 21.00,
  category: 'haircare',
  quantity: 25,
  image: 'https://images.unsplash.com/photo-1600180758890-6bd7c37b9e07?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60'
},
{
  name: 'Hair Repair Mask',
  description: 'Deep conditioning mask for damaged hair',
  price: 27.50,
  category: 'haircare',
  quantity: 15,
  image: 'https://images.unsplash.com/photo-1596964571832-703e1999c6fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60'
},
{
  name: 'Dry Shampoo Spray',
  description: 'Instant refresh without water',
  price: 14.99,
  category: 'haircare',
  quantity: 35,
  image: 'https://images.unsplash.com/photo-1612817150916-fcbaaf1d9627?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60'
},
{
  name: 'Argan Oil Serum',
  description: 'Frizz control and shine enhancer for all hair types',
  price: 23.80,
  category: 'haircare',
  quantity: 28,
  image: 'https://images.unsplash.com/photo-1596391915812-d1dfce0f9f27?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60'
},
{
  name: 'Heat Protectant Spray',
  description: 'Guards hair from heat styling up to 450°F',
  price: 17.25,
  category: 'haircare',
  quantity: 22,
  image: 'https://images.unsplash.com/photo-1600189478366-bb64f638aff4?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60'
}

    ];

    // Insert products
    await Product.insertMany(products);

    console.log('✅ Database seeded successfully!');
    console.log(`Created ${products.length} products`);
    console.log('Users created:');
    console.log('- Admin: admin@example.com / password');
    console.log('- User: user@example.com / password');
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

// Run seeding
const runSeed = async () => {
  await connectDB();
  await seedData();
};

runSeed();
