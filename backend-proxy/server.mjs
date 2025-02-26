import express from "express";
import cors from "cors";

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Mock API response
const companies = [
  {
    name: "Tech Corp",
    companyLogoURL: "https://via.placeholder.com/150",
    companyLogo: "",
    briefDescription: "Leading tech company",
    created_at: "2023-10-01",
    services: "Software Development, IT Solutions",
  },
  {
    name: "Health Solutions",
    companyLogoURL: "https://via.placeholder.com/150",
    companyLogo: "",
    briefDescription: "Healthcare innovations",
    created_at: "2023-09-15",
    services: "Medical Equipment, Healthcare",
  },
];

// API Endpoint
app.get("/api/companies", (req, res) => {
  res.json(companies);
});

// Default route
app.get("/", (req, res) => {
  res.send("Server is running! Use /api/companies to get data.");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
