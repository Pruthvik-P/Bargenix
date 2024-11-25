Coupon API
This project is a RESTful API built with TypeScript, Express, Prisma, and PostgreSQL. It allows users to generate time-bound discount coupons, validate them, and log actions in a mock database.

Features
Generate unique discount coupons for specific products.
Validate coupons for specific products and users.
Log API requests for audit and debugging.
Requirements
Node.js (v16 or later)
PostgreSQL (v12 or later)
npm or yarn
Installation
Clone the repository:

bash
Copy code
git clone https://github.com/<your-username>/coupon-api.git
cd coupon-api
Install dependencies:

bash
Copy code
npm install
Set up environment variables: Create a .env file in the root directory and add the following:

env
Copy code
DATABASE_URL=postgresql://<username>:<password>@<host>:<port>/<database>
PORT=3000
Set up the database: Run the following commands to initialize Prisma and migrate the database:

bash
Copy code
npx prisma generate
npx prisma migrate dev --name init
Start the server:

bash
Copy code
npm run dev
API Endpoints
1. Generate a Coupon
Endpoint: POST /api/coupons/generate
Request Body:
json
Copy code
{
  "productId": "12345"
}
Response:
json
Copy code
{
  "message": "Coupon generated successfully.",
  "coupon": {
    "id": "1",
    "productId": "12345",
    "discountCode": "DISCOUNT-ABCDE123",
    "expiresAt": "2024-11-24T14:00:00Z"
  }
}
2. Validate a Coupon
Endpoint: POST /api/coupons/validate
Request Body:
json
Copy code
{
  "productId": "12345",
  "discountCode": "DISCOUNT-ABCDE123"
}
Response:
json
Copy code
{
  "message": "Coupon is valid."
}
3. Fetch Logs
Endpoint: GET /api/logs
Response:
json
Copy code
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
Development Scripts
Run the development server:

bash
Copy code
npm run dev
Build the project for production:

bash
Copy code
npm run build
Run the production server:

bash
Copy code
npm start
Run database migrations:

bash
Copy code
npx prisma migrate dev
Open the Prisma Studio (database GUI):

bash
Copy code
npx prisma studio
Testing the API
Use tools like Postman, cURL, or the provided Postman collection in the project. Refer to the Postman Collection for detailed requests.
