var fs = require('fs');
var pg = require('pg');

/* 
 * You can also use the connectionString option for convenience but
 * if you do that you MUST remove `sslmode=require` from the URI else
 * it will replace the `ssl` block below and the Project CA will not
 * be trusted.
 */
var config = {
    database: "OT_GENERAL",
    host: "occupancy-tracker-nelnet-2843.aivencloud.com",
    password: "zz4tij9pgitkzmxa",
    port: 13702,
    ssl: { ca: fs.readFileSync('aiven_cert.cer') },
    user: "avnadmin",
};

var client = new pg.Client(config);

client.connect(function (err) {
    if (err)
        throw err;
});

const createBuilding = (request, response) => {
    const { address, phonenumber,  hours, maxoccupancy, curroccupancy, name } = request.body

    client.query('INSERT INTO buildings (address, phonenumber,  hours, maxoccupancy, curroccupancy, name) VALUES ($1, $2, $3, $4, $5, $6)', [address, phonenumber,  hours, maxoccupancy, curroccupancy, name], (error, result) => {
        if (error) {
            throw error
        }
    })
}

const createEvent = (request, response) => {
    const { time, date, building_id } = request.body

    client.query('INSERT INTO buildings (time, date, building_id) VALUES ($1, $2, $3)', [time, date, building_id], (error, result) => {
        if (error) {
            throw error
        }
    })
}

const deleteEvent = (request, response) => {
    const id = parseInt(request.params.id)

    client.query('DELETE FROM events WHERE id = $1', [id], (error, result) => {
        if (error) {
            throw error
        }
    })
}

const getEventsForBuilding = (request, response) => {
    const building_id = parseInt(request.params.building_id)

    client.query('SELECT * FROM events WHERE building_id = $1', [building_id], (error, result) => {
        if (error) {
            throw error
        }
        response.status(200).json(result.rows)
    })
}

const getBuildings = (request, response) => {
    client.query('SELECT * FROM buildings', (error, result) => {
        if (error) {
            throw error
        }
        response.status(200).json(result.rows)
    })
}

const updateBuildingOccupancy = (request, response) => {
    const building_id = parseInt(request.params.id)
    const amount = parseInt(request.params.amount)
    console.log("AMOUNT IS " + amount); 

    client.query('UPDATE buildings SET curroccupancy = curroccupancy + $1 WHERE id = $2', [amount, building_id], (error, result) => {
        if (error) {
            throw error
        }
        response.status(200).json(result.rows)
    })
}

module.exports = {createBuilding, createEvent, getEventsForBuilding, getBuildings, deleteEvent, updateBuildingOccupancy}