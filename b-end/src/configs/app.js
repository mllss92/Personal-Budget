const PORT = process.env.PORT || 3000;
const mongoURI = 'mongodb+srv://user:qwert12345@cluster0.prqep.mongodb.net/final';
const mongoConnectingConfig = { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false };

module.exports = {
  PORT,
  mongoURI,
  mongoConnectingConfig
}