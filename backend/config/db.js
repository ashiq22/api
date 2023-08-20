const mongoose = require("mongoose");


//connect data
mongoose.connect('mongodb+srv://malabus:devopsdevops@malabus.wp0djog.mongodb.net/malabus', {
    useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.log('Failed to connect to MongooDB', err));
