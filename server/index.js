// server/index.js

const connection = require('./postgres_connection.js'); 

const express = require("express");

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/api/buildings', connection.createBuilding); 
app.post('/api/events', connection.createEvent); 
app.delete('/api/events/:id', connection.deleteEvent); 
app.get('/api/buildings', connection.getBuildings); 
app.get('/api/events/:building_id', connection.getEventsForBuilding); 
app.get('/api/events', connection.getEvents); 
app.put('/api/buildings/:id/:amount', connection.updateBuildingOccupancy); 

app.get("/api", (req, res) => {
    res.json({ message: "Hello from server!" });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});