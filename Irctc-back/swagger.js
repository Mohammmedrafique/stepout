const swaggerAutogen = require("swagger-autogen")();
const doc = {
  info: {
    title: "My API",
    description: "Description",
  },
  host: "localhost:8080/api",
};

const outputFile = "./swagger-output.json";
const routes = [
  "./routes/admin.js",
  "./routes/auth.js",
  "./routes/bookings.js",
  "./routes/trains.js",
];

swaggerAutogen(outputFile, routes, doc);
