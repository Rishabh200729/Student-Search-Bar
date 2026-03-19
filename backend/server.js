const express = require("express");
const cors = require("cors");

// Use Routes from Routes Directory
const studentRouter = require("./routes/studentRoutes");
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());


app.use("/api/students", studentRouter);

// Export the Express API for Vercel serverless functions
module.exports = app;

// Only start the server locally if not in a Vercel environment
if (process.env.NODE_ENV !== "production") {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}