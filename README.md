# Agrevio 🌿

  

Agrevio is a full-stack platform for the agriculture ecosystem that enables users and businesses to **buy, sell, and rent agricultural equipment and products**. It combines e-commerce and rental workflows into a single scalable system.


![MVP](https://img.shields.io/badge/MVP-One%20Stop%20Solution-blue)

![Tech Stack](https://img.shields.io/badge/Tech-MERN-blue)

![Version](https://img.shields.io/badge/Version-1.0.0-blue)

![Status](https://img.shields.io/badge/Status-Development-blue)

  

---

  

## Overview

  

Agrevio provides a unified platform where:

  

- Users can purchase agricultural products

- Users and vendors can list equipment for rent or sale

- Companies can manage product listings and inventory

- Users can book equipment for specific time slots

- Secure authentication ensures safe access

- Integrated payments support both orders and rentals

  

---

  

## Tech Stack

  

### Backend

  

- Node.js

- Express.js

- MongoDB (Mongoose)

  

### Frontend

  

- React.js

- Tailwind CSS

  

---

  

## Architecture

  

The backend follows a layered architecture pattern:

  

- **Routes**: Define API endpoints

- **Controllers**: Handle request and response

- **Services**: Business logic

- **Repositories**: Database queries

- **Models**: Schema definitions

- **Middlewares**: Authentication and validation

- **Utils**: Shared utilities (ApiError, ApiResponse, asyncHandler)

  

---

  

## Key Features

### Authentication & Security

- JWT-based authentication (Access + Refresh Tokens)
    
- Cookie-based session handling
    
- Token rotation for enhanced security
    

### Product Management

- Create, update, and manage products
    
- Supports:
    
    - Sale
        
    - Rent
        
    - Hybrid (Sale + Rent)
        
- Pagination, filtering, and search support
    

### Rental Booking System

- Time-based booking model
    
- Conflict detection (prevents overlapping bookings)
    
- Optional delivery handling
    

### Order Management

- Cart-based checkout system
    
- Order history and tracking
    

### Payment Integration

- Stripe-powered payment flow
    
- Unified handling for:
    
    - Product purchases
        
    - Equipment bookings
        

---

## Project Structure

  

```

server/

  src/

    config/

    controllers/

    services/

    repositories/

    models/

    routes/

    middleware/

    utils/

```

  

---

  
  

## Installation & Setup

### 1. Clone the Repository

```
git clone <repo-url>
cd agrevio
```

### 2. Backend Setup

```
cd server
npm install
npm run dev
```

### 3. Frontend Setup

```
cd client
npm install
npm run dev
```


---

  

## API Testing

  

A Postman collection will be provided for testing authentication APIs. Import it into Postman and update the base URL if required.

  

---

  

## Future Improvements

  

- Vendor verification system
    
- Image upload (Cloudinary / S3)
    
- Advanced filtering & recommendations
    
- Notification system (Email/SMS)
    
- Admin dashboard
    
- Review & rating system


## Contributors

- Ravi Dhakad – GitHub: https://github.com/RaviD98  | LinkedIn: https://www.linkedin.com/in/ravidhakad98/
    
- Abhishek SP 
    
- Sumit
    

---

## License

This project is licensed under the MIT License.
