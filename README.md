# Cafe Oli - Online Cafe Shop

A beautiful full-stack cafe ordering website with a stunning beige and brown gradient theme, featuring smooth animations and a modern UI.

## Features

- **Beautiful UI Design**: Beige and brown color scheme with smooth gradients and animations
- **Online Ordering**: Browse menu items and add them to cart
- **User Management**: Automatic user creation based on email
- **Order Tracking**: View all orders with detailed bill information
- **Shopping Cart**: Dynamic cart with quantity adjustments
- **Responsive Design**: Works perfectly on desktop and mobile devices
- **MongoDB Integration**: All orders and user data saved in database

## Tech Stack

### Frontend
- React.js
- React Router DOM
- Bootstrap & React-Bootstrap
- React Icons
- Axios
- Custom CSS with animations

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- CORS
- Dotenv

## Project Structure

```
cafe_oli/
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navigation.js
│   │   │   ├── Home.js
│   │   │   ├── Menu.js
│   │   │   ├── Cart.js
│   │   │   ├── Checkout.js
│   │   │   └── Orders.js
│   │   ├── styles/
│   │   │   └── App.css
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
│
└── backend/
    ├── models/
    │   ├── User.js
    │   └── Order.js
    ├── routes/
    │   └── orders.js
    ├── server.js
    ├── .env
    └── package.json
```

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- npm or yarn

### 1. Clone the Repository

```bash
cd cafe_oli
```

### 2. Setup Backend

```bash
cd backend
npm install
```

### 3. Configure Environment Variables

The `.env` file is already created with default values:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/cafe_oli
```

**Note**: If you're using MongoDB Atlas, replace the `MONGODB_URI` with your connection string:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/cafe_oli?retryWrites=true&w=majority
```

### 4. Setup Frontend

```bash
cd ../frontend
npm install
```

## Running the Application

### Start MongoDB (if using local installation)

```bash
# On Linux/Mac
sudo systemctl start mongod

# Or using mongod directly
mongod
```

### Start Backend Server

```bash
cd backend
npm start
# or for development with auto-reload
npm run dev
```

The backend server will run on `http://localhost:5000`

### Start Frontend

Open a new terminal:

```bash
cd frontend
npm start
```

The frontend will run on `http://localhost:3000`

## Usage

1. **Browse Menu**: Navigate to the Menu page to see all available items
2. **Add to Cart**: Click "Add to Cart" on any item
3. **View Cart**: Click the cart icon in the navigation bar
4. **Checkout**: Click "Proceed to Checkout" and fill in your details
5. **Place Order**: Submit the form to place your order
6. **View Orders**: Go to "My Orders" page and search by email to see your orders

## API Endpoints

### Orders

- `POST /api/orders` - Create a new order
- `GET /api/orders` - Get all orders
- `GET /api/orders/user/:email` - Get orders by user email
- `GET /api/orders/:id` - Get single order by ID
- `PATCH /api/orders/:id/status` - Update order status

### Request Body for Creating Order

```json
{
  "userName": "John Doe",
  "userEmail": "john@example.com",
  "userPhone": "+1234567890",
  "deliveryAddress": "123 Main St, City, State",
  "notes": "Optional special instructions",
  "items": [
    {
      "name": "Cappuccino",
      "price": 4.50,
      "quantity": 2,
      "image": "image_url"
    }
  ]
}
```

## Features Breakdown

### Animated Background
- Smooth gradient animation that shifts between beige and brown tones
- Creates a warm, inviting atmosphere

### Menu Filtering
- Filter items by category (All, Coffee, Pastries, Desserts, etc.)
- Smooth transitions between filter states

### Shopping Cart
- Slide-in sidebar cart
- Add/remove items
- Adjust quantities
- Real-time total calculation
- Persistent cart using localStorage

### Order Management
- Automatic user creation/retrieval
- Complete order history
- Detailed bill breakdown
- Order status tracking
- Search orders by email

### Responsive Design
- Mobile-friendly navigation
- Adaptive grid layouts
- Touch-friendly buttons
- Full-width cart on mobile

## Customization

### Changing Colors

Edit `/frontend/src/styles/App.css` and modify the CSS variables:

```css
:root {
  --primary-brown: #8B4513;
  --light-brown: #A0826D;
  --beige: #F5E6D3;
  --cream: #FFF8DC;
  --dark-brown: #654321;
  --coffee: #6F4E37;
  --latte: #C9A87E;
}
```

### Adding Menu Items

Edit `/frontend/src/components/Menu.js` and add items to the `menuItems` array:

```javascript
{
  id: 13,
  name: 'Your Item',
  price: 5.00,
  description: 'Item description',
  image: 'image_url',
  category: 'Category'
}
```

### Modifying Tax Rate

In multiple files, the tax rate is set to 8%. To change it:

1. Backend: `/backend/routes/orders.js` - Line with `tax = subtotal * 0.08`
2. Frontend Cart: `/frontend/src/components/Cart.js` - Tax calculation sections
3. Frontend Checkout: `/frontend/src/components/Checkout.js` - Tax display sections

## Troubleshooting

### MongoDB Connection Issues

If you see "MongoDB Connection Error":
1. Make sure MongoDB is running
2. Check your connection string in `.env`
3. Verify network access if using MongoDB Atlas

### CORS Issues

If you encounter CORS errors:
1. Verify the backend is running on port 5000
2. Check that CORS is enabled in `server.js`
3. Ensure frontend is making requests to `http://localhost:5000`

### Port Already in Use

If port 5000 or 3000 is already in use:
- Change backend port in `.env` file
- Update frontend API calls to use new port
- Or kill the process using the port

## Future Enhancements

- User authentication and login
- Payment gateway integration
- Real-time order status updates
- Admin panel for managing orders
- Order rating and reviews
- Email notifications
- Push notifications for order updates

## License

This project is open source and available for personal and educational use.

## Support

For issues or questions, please open an issue on the repository.

---

Built with ❤️ using React, Node.js, and MongoDB
