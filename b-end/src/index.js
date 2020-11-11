const app = require('./app');
const mongoose = require('mongoose');
const configs = require('./configs/app');

mongoose.connect(configs.mongoURI, configs.mongoConnectingConfig)
  .then(() => {
    console.log('MongoDB connecting: Successfully!');
    app.listen(configs.PORT, () => console.log(`Server has been started on Port ${configs.PORT}`));
  })
  .catch(err => console.log(err))