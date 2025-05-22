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

## How It Works

### Architecture Overview
The application follows a client-server architecture:
- **Frontend**: A Next.js application serving as the user interface, handling client-side rendering and server-side rendering where appropriate
- **Backend**: A FastAPI server providing RESTful API endpoints that handle data processing, business logic, and database operations
- **State Management**: Client-side state is managed using Zustand, providing a lightweight yet powerful solution for cross-component state
- **Data Flow**: The frontend communicates with the backend via HTTP requests, and receives JSON responses that are displayed to the user

### Key Components
1. **Product Catalog System**: Manages product listings, categories, and inventory
2. **User Authentication**: Handles user registration, login, and session management using JWT tokens
3. **Search Engine**: Provides text-based and image-based search capabilities
4. **Shopping Cart**: Maintains user cart state and synchronizes with the backend
5. **Checkout Process**: Manages the order creation, payment processing, and confirmation flow
6. **AI Features**: Integrates machine learning models for visual search and virtual try-on capabilities

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

## Tech Stack

### Frontend
- **Next.js 15**: React framework for the web application
- **React 19**: UI library
- **Tailwind CSS**: Utility-first CSS framework
- **Radix UI**: Accessible component library
- **Zustand**: State management
- **React Hook Form**: Form management

### Backend
- **FastAPI**: Modern, fast web framework for building APIs
- **SQLAlchemy**: SQL toolkit and ORM
- **SQLite**: Database for development
- **Pydantic**: Data validation and settings management

### Installation

#### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Run the database seeding script (optional):
   ```bash
   python seed.py
   ```

4. Start the backend server:
   ```bash
   python -m uvicorn main:app --reload --host 0.0.0.0 --port 8000
   ```
   The API will be available at http://localhost:8000

#### Frontend Setup
1. Install dependencies from the root directory:
   ```bash
   npm install --legacy-peer-deps
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```
