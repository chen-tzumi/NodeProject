# Node.js User and Card Management API

## Project Overview
This Node.js project provides an API for managing users and business cards. The application starts with three initial users
and three initial cards. It includes authentication, authorization, and admin functionalities.
Additionally, the project implements three bonus features: 
an admin can change a business number, a file logger records errors 
and users are blocked for 24hurs after 3 failed login attempts .

## Admin's info can be found in the initial users data


## Attention! Existing Users
Please note that the three existing users are as follows: an Admin user (only), a Business user (only), and a Regular user (who is neither a Business nor an Admin user). Kindly take this into consideration when testing the project, as well as the corresponding middleware configurations.


This page includes a brief description of the available API endpoints for users and cards, along with links to the full documentation.

## Full API Documentation
For a detailed breakdown of the API functionality, including request methods, parameters, and responses, refer to the following documentation:

Users API: https://documenter.getpostman.com/view/40124031/2sAYX6pMbD
Cards API: https://documenter.getpostman.com/view/40124031/2sAYdoDmss
These resources provide everything you need to understand and interact with the API.

## Features
- User authentication and authorization
- CRUD operations for users
- CRUD operations for cards
- Middleware-based authentication and role management




## Installation

### Prerequisites
Ensure you have the following installed:
- Node.js
- npm
- MongoDB

### Steps
1. Clone the repository:
   ```bash
   git clone <https://github.com/chen-tzumi>
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up the environment variables:
   - Create a `.env` file in the root directory.
   - Add the necessary variables (e.g., database URI, JWT secret, etc.).
4. Start the server:
   ```bash
   npm run dev
   ```

## API Endpoints

### User Routes
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET    | `/users/` | Get all users (Admin only) |
| GET    | `/users/:id` | Get user by ID (Authenticated users) |
| POST   | `/users/register` | Register a new user |
| POST   | `/users/login` | Login an existing user |
| DELETE | `/users/:id` | Delete a user (Authenticated users) |
| PUT    | `/users/:id` | Update user details (Authenticated users) |
| PATCH  | `/users/:id` | Change user auth level (Authenticated users) |

### Card Routes
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET    | `/cards/` | Get all cards |
| POST   | `/cards/` | Create a new card (Authenticated business users) |
| GET    | `/cards/my-cards` | Get logged-in user’s cards |
| GET    | `/cards/:id` | Get card by ID |
| PUT    | `/cards/:id` | Update card details (Authenticated users) |
| DELETE | `/cards/:id` | Delete a card (Authenticated users) |
| PATCH  | `/cards/:id` | Like/unlike a card (Authenticated users) |


## for put requests in postman:
When updating a nested object (e.g., name), you must send the entire object, not just the changed field.
(make sure if there are any required faileds)







## Technologies Used
- Node.js
- Express.js
- MongoDB (Mongoose)
- JSON Web Tokens (JWT)
- Lodash (A utility library for simplifying JavaScript array, object, and function operations.)

## License
This project is licensed under the MIT License.

## Contact
For questions or contributions, please contact [Chen-Tzumi on github].
