# Fab & Fierce Fashion Store

A modern e-commerce platform for Filipino fashion with advanced shopping features. 


## Features

### Shopping Experience
- **Product Browsing**: Browse products by categories (Dresses, Shoes, Bags, Accessories)
- **Search Functionality**: Powerful search with instant results
- **Product Details**: Comprehensive product information, sizing, and images
- **New Arrivals**: Showcase of latest products
- **Flash Sales**: Limited-time offers and exclusive deals

### Smart Shopping Features
- **Visual Search**: Search products using images
- **Virtual Try-On**: Virtually try on clothing items
- **Size Recommendations**: Get personalized size recommendations
- **Smart Filtering**: Advanced filtering options

### User Management
- **User Accounts**: Registration and login
- **User Profiles**: Manage personal information
- **Order History**: View past orders and their status
- **Wishlist**: Save products for later

### Shopping Cart & Checkout
- **Shopping Cart**: Add, update, remove items
- **Checkout Process**: Streamlined checkout experience
- **Payment Methods**: Multiple payment options
- **Order Confirmation**: Email confirmations and order tracking

### Key Components
1. **Product Catalog System**: Manages product listings, categories, and inventory
2. **User Authentication**: Handles user registration, login, and session management using JWT tokens
3. **Search Engine**: Provides text-based and image-based search capabilities
4. **Shopping Cart**: Maintains user cart state and synchronizes with the backend
5. **Checkout Process**: Manages the order creation, payment processing, and confirmation flow

### Data Workflow
1. Product data is initially stored in the database and served through API endpoints
2. Users browse products, which are fetched from the backend and cached on the client
3. User actions (adding to cart, wishlist) are stored in local state and synchronized with the backend
4. Order processing involves validation, payment processing, and database updates

## Use Cases

### For Shoppers
- **Casual Browsing**: Discover new products and trends in Filipino fashion
- **Specific Item Search**: Find particular products quickly using text or image search
- **Virtual Try-On**: See how clothing items look without physically trying them on
- **Size Guidance**: Get accurate size recommendations based on measurements
- **Smart Shopping**: Use advanced filtering to find products that match specific criteria
- **Gift Shopping**: Create wishlists and find special offers for gift-giving occasions
