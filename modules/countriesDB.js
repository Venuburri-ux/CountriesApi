// In modules/countriesDB.js
const mongoose = require('mongoose');
const Country = require('./countrySchema'); // Adjust the path if needed

class CountriesDB {
  async initialize(connectionString) {
    try {
      await mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });
      console.log('Database connected');
    } catch (err) {
      throw new Error('Database connection failed: ' + err.message);
    }
  }

 
  async getAllCountries(page = 1, perPage = 10, name = '') {
    try {
      const query = name ? { name: new RegExp(name, 'i') } : {};
      const countries = await Country.find(query)
                                    .skip((page - 1) * perPage)
                                    .limit(perPage);
      return countries;
    } catch (err) {
      throw new Error('Error retrieving countries: ' + err.message);
    }
  }


  async getCountryById(id) {
    try {
      const country = await Country.findById(id);
      return country;
    } catch (err) {
      throw new Error('Error retrieving country by ID: ' + err.message);
    }
  }

  async addNewCountry(data) {
    try {
      const country = new Country(data);
      const result = await country.save();
      return result;
    } catch (err) {
      throw new Error('Error adding new country: ' + err.message);
    }
  }

  async updateCountryById(data, id) {
    try {
      const result = await Country.findByIdAndUpdate(id, data, { new: true });
      return result;
    } catch (err) {
      throw new Error('Error updating country by ID: ' + err.message);
    }
  }

  async deleteCountryById(id) {
    try {
      const result = await Country.findByIdAndDelete(id);
      return result;
    } catch (err) {
      throw new Error('Error deleting country by ID: ' + err.message);
    }
  }
}

module.exports = CountriesDB;
