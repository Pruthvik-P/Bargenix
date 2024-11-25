# **Coupon API**

A RESTful API for generating, validating, and logging time-bound discount coupons using TypeScript, Express.js, Prisma, and PostgreSQL.

---

## **Table of Contents**

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Requirements](#requirements)
- [Setup and Installation](#setup-and-installation)
- [Environment Variables](#environment-variables)
- [Database](#database)
- [API Endpoints](#api-endpoints)
- [Development Scripts](#development-scripts)
- [Testing the API](#testing-the-api)

---

## **Features**

- Generate unique, time-bound discount coupons for specific products.
- Validate the coupon for specific users and products.
- Maintain an audit trail by logging all API requests.
- Built with TypeScript for type safety and scalability.

---

## **Tech Stack**

- **Language:** TypeScript
- **Framework:** Express.js
- **Database:** PostgreSQL
- **ORM:** Prisma
- **Dev Tools:** Nodemon, ESLint, Prettier

---

## **Requirements**

- [Node.js](https://nodejs.org/) (v16 or later)
- [PostgreSQL](https://www.postgresql.org/) (v12 or later)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

---

## **Setup and Installation**

1. **Clone the Repository**  
   ```bash
   git clone https://github.com/<your-username>/coupon-api.git
   cd coupon-api

2. **Install Dependencies**  
   ```bash
   npm install
   ```

3. **Set up Environment Variables**  
   Refer to the [Environment Variables](#environment-variables) section for details.

4. **Set up the Database**  
   Run the following commands to initialize Prisma and migrate the database schema:
   ```bash
   npx prisma generate
   npx prisma migrate dev --name init
   ```

5. **Run the Development Server**  
   ```bash
   npm run dev
   ```
   Access the API at [http://localhost:3000](http://localhost:3000).

## **Environment Variables**

Create a `.env` file in the root directory with the following keys:
```env
DATABASE_URL=postgresql://<username>:<password>@<host>:<port>/<database>
PORT=3000
```
Replace `<username>`, `<password>`, `<host>`, `<port>`, and `<database>` with your PostgreSQL credentials.

## **Database**

This API uses Prisma ORM to interact with a PostgreSQL database. The Prisma schema is defined in `prisma/schema.prisma`.

To visualize or edit data, use Prisma Studio:
```bash
npx prisma studio
```

## **API Endpoints**

1. **Generate Coupon**  
   **Method:** POST  
   **Endpoint:** `/api/coupons/generate`  
   **Payload:**
   ```json
   {
     "productId": "12345"
   }
   ```
   **Response:**
   ```json
   {
     "message": "Coupon generated successfully.",
     "coupon": {
       "id": "1",
       "productId": "12345",
       "discountCode": "DISCOUNT-ABCDE123",
       "expiresAt": "2024-11-24T14:00:00Z"
     }
   }
   ```

2. **Validate Coupon**  
   **Method:** POST  
   **Endpoint:** `/api/coupons/validate`  
   **Payload:**
   ```json
   {
     "productId": "12345",
     "discountCode": "DISCOUNT-ABCDE123"
   }
   ```
   **Response:**
   ```json
   {
     "message": "Coupon is valid."
   }
   ```

3. **Fetch Logs**  
   **Method:** GET  
   **Endpoint:** `/api/logs`  
   **Response:**
   ```json
   [
     {
       "id": "1",
       "action": "generateCoupon",
       "details": {
         "coupon": {
           "id": "1",
           "productId": "12345",
           "discountCode": "DISCOUNT-ABCDE123",
           "expiresAt": "2024-11-24T14:00:00Z"
         }
       },
       "createdAt": "2024-11-24T13:00:00Z"
     }
   ]
   ```

## **Development Scripts**

Start the development server:
```bash
npm run dev
```

Build the project:
```bash
npm run build
```

Start the production server:
```bash
npm start
```

Run database migrations:
```bash
npx prisma migrate dev
```

Open Prisma Studio (GUI for database):
```bash
npx prisma studio
```

## **Testing the API**

You can test the API using tools like Postman or cURL. A Postman collection is included in this repository as `postman-collection.json`.

### Example cURL Commands

**Generate Coupon:**
```bash
curl -X POST http://localhost:3000/api/coupons/generate \
-H "Content-Type: application/json" \
-d '{"productId": "12345"}'
```

**Validate Coupon:**
```bash
curl -X POST http://localhost:3000/api/coupons/validate \
-H "Content-Type: application/json" \
-d '{"productId": "12345", "discountCode": "DISCOUNT-ABCDE123"}'
```

**Fetch Logs:**
```bash
curl -X GET http://localhost:3000/api/logs
```

### Postman Instructions

1. Import the provided `postman-collection.json` into Postman.
2. Update the environment or base URL if necessary (default: `http://localhost:3000`).
3. Test individual endpoints by selecting and sending requests.
