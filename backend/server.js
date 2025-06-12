const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(express.json());
app.use(cors());

// ✅ Serve static files (HTML, CSS, JS) from frontend folder
app.use(express.static(path.join(__dirname, "../frontend")));

// ✅ Root route – serve index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend", "index.html"));
});

// ✅ MongoDB Connection
mongoose.connect("mongodb://127.0.0.1:27017/elevatorDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log("✅ MongoDB connected");
})
.catch((err) => {
  console.error("❌ MongoDB connection error:", err);
});

// ✅ Inquiry Schema & POST API
const inquirySchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String
});

const Inquiry = mongoose.model("Inquiry", inquirySchema);

app.post("/inquiry", async (req, res) => {
  try {
    console.log("📥 Incoming request:", req.body);

    const newInquiry = new Inquiry(req.body);
    await newInquiry.save();

    res.status(201).json({ message: "Inquiry saved!" });
  } catch (error) {
    console.error("❌ Failed to save inquiry:", error);
    res.status(500).json({ error: "Failed to save inquiry" });
  }
});

// ✅ Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
