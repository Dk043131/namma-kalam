# Namma Kalam — AI Civic Reporting & Geospatial Platform 🏙️🗺️

[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-Backend-000000?logo=express&logoColor=white)](https://expressjs.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-PostGIS-4169E1?logo=postgresql&logoColor=white)](https://postgis.net/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

> **Namma Kalam** is an AI-powered municipal civic reporting and geospatial resolution platform built with **Node.js**, **Express**, and **PostGIS**. Enables citizens to pin and document civic grievances (potholes, garbage hazards, water pipeline bursts) with automated geospatial ward indexing, severity classification, and municipal tracking.

---

## 🌟 Key Highlights

- **PostGIS Geospatial Engine**: Radius queries (`ST_DWithin`), boundary polygons (`ST_Contains`), and spatial indexing using GiST.
- **Smart Civic Triage**: Automated priority and severity categorization based on report density and crowd upvotes.
- **Ward-Level Allocation**: Automated assignment to local municipal administrative zones and ward engineers.
- **RESTful GeoJSON APIs**: Standardized spatial payload exchanges for GIS mapping overlays.

---

## 🏗️ System Architecture

```mermaid
flowchart TD
    Citizen[Citizen Mobile & Web Portal] -->|Pins Issue with GPS Coordinates| API[Node.js Express Spatial API]
    API --> PostGIS[(PostgreSQL + PostGIS Geospatial DB)]
    PostGIS --> SpatialQuery[GiST Spatial Radius Indexing]
    SpatialQuery --> WardEngine[Automated Ward Assignment]
    WardEngine --> OfficerDashboard[Municipal Engineer Resolution Dashboard]
```

---

## 🛠️ Quick Start

```bash
git clone https://github.com/Dk043131/namma-kalam.git
cd namma-kalam
npm install
npm start
```
API running on `http://localhost:5000`.

---

## 📄 License
This project is open-source under the [MIT License](LICENSE).
