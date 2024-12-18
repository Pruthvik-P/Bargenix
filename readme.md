# **Coupon API**

A RESTful API for generating, validating, and logging time-bound discount coupons using TypeScript, Express.js, Prisma, and PostgreSQL.

---

## **Table of Contents**

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Requirements](#requirements)
- [Setup and Installation](#setup-and-installation)
- [Database](#database)
- [API Endpoints](#api-endpoints)
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
   git clone https://github.com/Pruthvik-P/Bargenix-api.git
   cd coupon-api

2. **Install Dependencies**  
   ```bash
   npm install
   ```



3. **Set up the Database**  
   Run the following commands to initialize Prisma and migrate the database schema:
   ```bash
   npx prisma generate
   npx prisma migrate dev --name init
   ```

4. **Run the Development Server**  
   ```bash
   node dist/index.js
   ```
   Access the API at [http://localhost:3000](http://localhost:3000).



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
