// In server.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const CountriesDB = require('./modules/countriesDB');
const app = express();

dotenv.config();
app.use(cors());
app.use(express.json());

const db = new CountriesDB();
const HTTP_PORT = process.env.PORT || 3000;

// Test route
app.get('/', (req, res) => {
  res.json({ message: "API Listening" });
});

// GET /api/countries

app.get('/api/countries', async (req, res) => {
    const { page = 1, perPage = 10, name = '' } = req.query;
    try {
      const countries = await db.getAllCountries(parseInt(page), parseInt(perPage), name);
      console.log('Countries retrieved:', countries); // Log the response
      res.json(countries);
    } catch (err) {
      console.error('Error retrieving countries:', err); // Log the error
      res.status(500).json({ error: err.message });
    }
  });
  
  
  // GET /api/countries/:id
  app.get('/api/countries/:id', async (req, res) => {
    try {
      const country = await db.getCountryById(req.params.id);
      if (country) {
        console.log('Country retrieved:', country); // Log the response
        res.json(country);
      } else {
        res.status(404).json({ error: "Country not found" });
      }
    } catch (err) {
      console.error('Error retrieving country by ID:', err); // Log the error
      res.status(500).json({ error: err.message });
    }
  });
  
// POST /api/countries
app.post('/api/countries', async (req, res) => {
  try {
    const newCountry = await db.addNewCountry(req.body);
    res.status(201).json(newCountry);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/countries/:id
app.put('/api/countries/:id', async (req, res) => {
  try {
    const updatedCountry = await db.updateCountryById(req.body, req.params.id);
    if (updatedCountry) {
      res.json(updatedCountry);
    } else {
      res.status(404).json({ error: "Country not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/countries/:id
app.delete('/api/countries/:id', async (req, res) => {
  try {
    const result = await db.deleteCountryById(req.params.id);
    if (result) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: "Country not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

db.initialize(process.env.MONGODB_CONN_STRING).then(() => {
  app.listen(HTTP_PORT, () => {
    console.log(`Server listening on port ${HTTP_PORT}`);
  });
}).catch(err => {
  console.error('Failed to connect to the database:', err);
});
