const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// Mock Spatial In-Memory Cache with GeoJSON support
let issues = [
  {
    id: "rep-101",
    category: "Pothole",
    title: "Deep crater near Anna Nagar West Bus Terminus",
    severity: "HIGH",
    status: "IN_PROGRESS",
    latitude: 13.0850,
    longitude: 80.2100,
    address: "2nd Avenue, Anna Nagar, Chennai",
    ward: "Ward 104",
    upvotes: 38
  },
  {
    id: "rep-102",
    category: "Garbage Dump",
    title: "Overflowing municipal bin near market complex",
    severity: "CRITICAL",
    status: "REPORTED",
    latitude: 13.0825,
    longitude: 80.2750,
    address: "George Town, Chennai",
    ward: "Ward 58",
    upvotes: 64
  },
  {
    id: "rep-103",
    category: "Streetlight",
    title: "Consecutive 4 streetlights dark along service road",
    severity: "MEDIUM",
    status: "RESOLVED",
    latitude: 12.9815,
    longitude: 80.2180,
    address: "Velachery Main Road, Chennai",
    ward: "Ward 178",
    upvotes: 12
  }
];

// Calculate Haversine distance in km
function haversine(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth's radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

// 1. Get issues within radius (Geospatial query)
app.get('/api/issues/nearby', (req, res) => {
  const lat = parseFloat(req.query.lat) || 13.0827;
  const lng = parseFloat(req.query.lng) || 80.2707;
  const radiusKm = parseFloat(req.query.radiusKm) || 10;

  const nearby = issues.filter(item => haversine(lat, lng, item.latitude, item.longitude) <= radiusKm);
  res.json({
    center: { lat, lng },
    radiusKm,
    count: nearby.length,
    features: nearby
  });
});

// 2. Report new civic issue
app.post('/api/issues', (req, res) => {
  const { category, title, description, latitude, longitude, address } = req.body;
  if (!category || !latitude || !longitude) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const newIssue = {
    id: `rep-${Date.now()}`,
    category,
    title: title || `${category} reported at location`,
    description: description || "",
    severity: category === 'Garbage Dump' ? 'CRITICAL' : 'MEDIUM',
    status: 'REPORTED',
    latitude: parseFloat(latitude),
    longitude: parseFloat(longitude),
    address: address || "Pinned on map",
    ward: `Ward ${Math.floor(Math.random() * 150) + 1}`,
    upvotes: 1
  };

  issues.unshift(newIssue);
  res.status(201).json(newIssue);
});

// 3. Upvote issue
app.post('/api/issues/:id/upvote', (req, res) => {
  const issue = issues.find(i => i.id === req.params.id);
  if (!issue) return res.status(404).json({ error: "Not found" });
  issue.upvotes += 1;
  res.json({ success: true, upvotes: issue.upvotes });
});

app.listen(PORT, () => {
  console.log(`Namma Kalam Civic API listening on port ${PORT}`);
});
