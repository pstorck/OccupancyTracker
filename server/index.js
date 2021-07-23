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
<<<<<<< HEAD
app.get('/api/events/building_id', connection.getEventsForBuilding); 
app.put('/api/buildings/:id', connection.updateBuildingOccupancy); 
=======
app.get('/api/events/:building_id', connection.getEventsForBuilding); 
app.put('/api/buildings/:id/:amount', connection.updateBuildingOccupancy); 
>>>>>>> master

app.get("/api", (req, res) => {
    res.json({ message: "Hello from server!" });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});