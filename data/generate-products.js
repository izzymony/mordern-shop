// Run this with: node data/generate-products.js

const fs = require('fs');

const categories = ['Accessories', 'Bags', 'Tech', 'Fashion', 'Footwear', 'Jewelry', 'Sports', 'Home'];

const adjectives = [
  'Premium', 'Luxury', 'Modern', 'Classic', 'Vintage', 'Elegant', 'Stylish', 'Minimalist',
  'Designer', 'Professional', 'Casual', 'Sport', 'Outdoor', 'Urban', 'Smart', 'Eco-Friendly',
  'Handcrafted', 'Limited Edition', 'Exclusive', 'Trendy', 'Timeless', 'Contemporary'
];

const productTypes = {
  Accessories: ['Watch', 'Belt', 'Wallet', 'Sunglasses', 'Scarf', 'Hat', 'Gloves', 'Tie', 'Cufflinks', 'Keychain'],
  Bags: ['Backpack', 'Tote Bag', 'Crossbody Bag', 'Messenger Bag', 'Clutch', 'Duffel Bag', 'Satchel', 'Shoulder Bag', 'Handbag', 'Travel Bag'],
  Tech: ['Earbuds', 'Headphones', 'Smart Watch', 'Fitness Band', 'Speaker', 'Power Bank', 'Phone Case', 'Laptop Stand', 'Wireless Charger', 'Tablet Cover'],
  Fashion: ['T-Shirt', 'Sweater', 'Jacket', 'Jeans', 'Dress', 'Blazer', 'Coat', 'Hoodie', 'Cardigan', 'Polo Shirt'],
  Footwear: ['Sneakers', 'Boots', 'Loafers', 'Sandals', 'Heels', 'Oxfords', 'Slippers', 'Running Shoes', 'Dress Shoes', 'Flats'],
  Jewelry: ['Necklace', 'Bracelet', 'Earrings', 'Ring', 'Pendant', 'Anklet', 'Brooch', 'Chain', 'Charm', 'Bangle'],
  Sports: ['Yoga Mat', 'Dumbbell Set', 'Water Bottle', 'Gym Bag', 'Resistance Bands', 'Jump Rope', 'Tennis Racket', 'Soccer Ball', 'Basketball', 'Running Belt'],
  Home: ['Cushion', 'Throw Blanket', 'Vase', 'Wall Art', 'Candle', 'Plant Pot', 'Mirror', 'Clock', 'Lamp', 'Photo Frame']
};

const materials = ['Leather', 'Cotton', 'Silk', 'Wool', 'Denim', 'Canvas', 'Stainless Steel', 'Titanium', 'Gold-Plated', 'Sterling Silver'];
const badges = ['Bestseller', 'New', 'Popular', 'Sale', 'Premium', 'Limited', null, null, null];

const descriptions = [
  'Crafted with attention to detail and premium materials',
  'Perfect blend of style and functionality',
  'Timeless design that never goes out of fashion',
  'Elevate your everyday style with this piece',
  'High-quality construction for lasting durability',
  'Versatile design suitable for any occasion',
  'Meticulously designed for the modern individual',
  'Experience luxury in every detail',
  'Innovative features meet classic aesthetics',
  'Handpicked for discerning customers'
];

function randomFrom(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function randomPrice(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomRating() {
  return (Math.random() * (5 - 4) + 4).toFixed(1);
}

function randomReviews() {
  return Math.floor(Math.random() * 500) + 10;
}

function getImageUrl(productType, category, id) {
  // Map product types to specific fashion/product image URLs
  // Using a combination of product-specific image URLs

  const imageMapping = {
    // Accessories - Watches
    'Watch': [
      'https://images.pexels.com/photos/277390/pexels-photo-277390.jpeg?auto=compress&cs=tinysrgb&w=800&h=800',
      'https://images.pexels.com/photos/125779/pexels-photo-125779.jpeg?auto=compress&cs=tinysrgb&w=800&h=800',
      'https://images.pexels.com/photos/1697214/pexels-photo-1697214.jpeg?auto=compress&cs=tinysrgb&w=800&h=800',
      'https://images.pexels.com/photos/47856/rolex-watch-time-timepiece-47856.jpeg?auto=compress&cs=tinysrgb&w=800&h=800',
      'https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&cs=tinysrgb&w=800&h=800',
    ],
    'Sunglasses': [
      'https://images.pexels.com/photos/701877/pexels-photo-701877.jpeg?auto=compress&cs=tinysrgb&w=800&h=800',
      'https://images.pexels.com/photos/46710/pexels-photo-46710.jpeg?auto=compress&cs=tinysrgb&w=800&h=800',
      'https://images.pexels.com/photos/343720/pexels-photo-343720.jpeg?auto=compress&cs=tinysrgb&w=800&h=800',
      'https://images.pexels.com/photos/1067333/pexels-photo-1067333.jpeg?auto=compress&cs=tinysrgb&w=800&h=800',
    ],
    'Wallet': [
      'https://images.pexels.com/photos/1346768/pexels-photo-1346768.jpeg?auto=compress&cs=tinysrgb&w=800&h=800',
      'https://images.pexels.com/photos/2297862/pexels-photo-2297862.jpeg?auto=compress&cs=tinysrgb&w=800&h=800',
      'https://images.pexels.com/photos/1599792/pexels-photo-1599792.jpeg?auto=compress&cs=tinysrgb&w=800&h=800',
    ],

    // Bags
    'Backpack': [
      'https://images.pexels.com/photos/1545590/pexels-photo-1545590.jpeg?auto=compress&cs=tinysrgb&w=800&h=800',
      'https://images.pexels.com/photos/2905238/pexels-photo-2905238.jpeg?auto=compress&cs=tinysrgb&w=800&h=800',
      'https://images.pexels.com/photos/2422476/pexels-photo-2422476.jpeg?auto=compress&cs=tinysrgb&w=800&h=800',
    ],
    'Handbag': [
      'https://images.pexels.com/photos/2081199/pexels-photo-2081199.jpeg?auto=compress&cs=tinysrgb&w=800&h=800',
      'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=800&h=800',
      'https://images.pexels.com/photos/1038000/pexels-photo-1038000.jpeg?auto=compress&cs=tinysrgb&w=800&h=800',
    ],
    'Tote Bag': [
      'https://images.pexels.com/photos/7679453/pexels-photo-7679453.jpeg?auto=compress&cs=tinysrgb&w=800&h=800',
      'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=800&h=800',
    ],

    // Tech
    'Headphones': [
      'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=800&h=800',
      'https://images.pexels.com/photos/3587478/pexels-photo-3587478.jpeg?auto=compress&cs=tinysrgb&w=800&h=800',
      'https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg?auto=compress&cs=tinysrgb&w=800&h=800',
    ],
    'Earbuds': [
      'https://images.pexels.com/photos/3825517/pexels-photo-3825517.jpeg?auto=compress&cs=tinysrgb&w=800&h=800',
      'https://images.pexels.com/photos/8000621/pexels-photo-8000621.jpeg?auto=compress&cs=tinysrgb&w=800&h=800',
    ],
    'Smart Watch': [
      'https://images.pexels.com/photos/393047/pexels-photo-393047.jpeg?auto=compress&cs=tinysrgb&w=800&h=800',
      'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=800&h=800',
    ],

    // Fashion
    'T-Shirt': [
      'https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&w=800&h=800',
      'https://images.pexels.com/photos/8532616/pexels-photo-8532616.jpeg?auto=compress&cs=tinysrgb&w=800&h=800',
      'https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=800&h=800',
    ],
    'Dress': [
      'https://images.pexels.com/photos/985635/pexels-photo-985635.jpeg?auto=compress&cs=tinysrgb&w=800&h=800',
      'https://images.pexels.com/photos/1126993/pexels-photo-1126993.jpeg?auto=compress&cs=tinysrgb&w=800&h=800',
      'https://images.pexels.com/photos/2773934/pexels-photo-2773934.jpeg?auto=compress&cs=tinysrgb&w=800&h=800',
    ],
    'Jacket': [
      'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=800&h=800',
      'https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg?auto=compress&cs=tinysrgb&w=800&h=800',
    ],

    // Footwear
    'Sneakers': [
      'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=800&h=800',
      'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=800&h=800',
      'https://images.pexels.com/photos/1478442/pexels-photo-1478442.jpeg?auto=compress&cs=tinysrgb&w=800&h=800',
      'https://images.pexels.com/photos/2529147/pexels-photo-2529147.jpeg?auto=compress&cs=tinysrgb&w=800&h=800',
    ],
    'Boots': [
      'https://images.pexels.com/photos/1032110/pexels-photo-1032110.jpeg?auto=compress&cs=tinysrgb&w=800&h=800',
      'https://images.pexels.com/photos/6046229/pexels-photo-6046229.jpeg?auto=compress&cs=tinysrgb&w=800&h=800',
    ],
    'Heels': [
      'https://images.pexels.com/photos/336372/pexels-photo-336372.jpeg?auto=compress&cs=tinysrgb&w=800&h=800',
      'https://images.pexels.com/photos/1446161/pexels-photo-1446161.jpeg?auto=compress&cs=tinysrgb&w=800&h=800',
    ],

    // Jewelry
    'Necklace': [
      'https://images.pexels.com/photos/1191531/pexels-photo-1191531.jpeg?auto=compress&cs=tinysrgb&w=800&h=800',
      'https://images.pexels.com/photos/1454171/pexels-photo-1454171.jpeg?auto=compress&cs=tinysrgb&w=800&h=800',
    ],
    'Bracelet': [
      'https://images.pexels.com/photos/1493036/pexels-photo-1493036.jpeg?auto=compress&cs=tinysrgb&w=800&h=800',
      'https://images.pexels.com/photos/1927259/pexels-photo-1927259.jpeg?auto=compress&cs=tinysrgb&w=800&h=800',
    ],
    'Ring': [
      'https://images.pexels.com/photos/265906/pexels-photo-265906.jpeg?auto=compress&cs=tinysrgb&w=800&h=800',
      'https://images.pexels.com/photos/1721943/pexels-photo-1721943.jpeg?auto=compress&cs=tinysrgb&w=800&h=800',
    ],
  };

  // Get images for this product type, or fallback to category-based picsum
  const images = imageMapping[productType];
  if (images && images.length > 0) {
    return images[id % images.length];
  }

  // Fallback to picsum with seed
  const seed = productType.toLowerCase().replace(/\s+/g, '-');
  return `https://picsum.photos/seed/${seed}-${id}/800/800`;
}

function generateProducts(count) {
  const products = [];

  for (let i = 1; i <= count; i++) {
    const category = randomFrom(categories);
    const productType = randomFrom(productTypes[category]);
    const adjective = randomFrom(adjectives);
    const material = Math.random() > 0.5 ? randomFrom(materials) : '';

    const name = material
      ? `${adjective} ${material} ${productType}`
      : `${adjective} ${productType}`;

    // Generate image URL based on product type, category and ID
    const imageUrl = getImageUrl(productType, category, i);

    const product = {
      id: i,
      name: name,
      price: randomPrice(29, 599),
      category: category,
      image: imageUrl,
      description: randomFrom(descriptions),
      rating: parseFloat(randomRating()),
      reviews: randomReviews(),
      inStock: Math.random() > 0.1, // 90% in stock
      badge: randomFrom(badges)
    };

    products.push(product);
  }

  return products;
}

const products = generateProducts(1000);

fs.writeFileSync(
  'data/products.json',
  JSON.stringify(products, null, 2)
);

console.log('✅ Generated 1000 products in data/products.json');
