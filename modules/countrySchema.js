const mongoose = require('mongoose');

const countrySchema = new mongoose.Schema({
  name: String,
  nativeName: String,
  a2code: String,
  a3code: String,
  tld: [String],
  currencies: [
    {
      name: String,
      symbol: String
    }
  ],
  capital: String,
  region: String,
  subregion: String,
  languages: String,
  latlng: String,
  googleMaps: String,
  population: Number,
  area: Number,
  continents: String,
  coatOfArms: String,
  flag: String
});

module.exports = mongoose.model('Country', countrySchema);
