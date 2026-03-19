const express = require("express");
const cors = require("cors");

// Use Routes from Routes Directory
const studentRouter = require("./routes/studentRoutes");
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());


app.use("/api/students", studentRouter);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});