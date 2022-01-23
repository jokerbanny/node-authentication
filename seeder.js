const fs = require("fs");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const colors = require("colors");

// Load env vars
dotenv.config({ path: "./configs/config.env" });

// Load Bootcamp Models
const Bootcamp = require("./models/Bootcamp");
const Course = require("./models/Course");
const User = require("./models/User");
const Review = require("./models/Review");

// Connect to Database
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Read file bootcamps.json data.json
const bootcamps = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/bootcamps.json`)
);
// Read file couses.json data.json
const courses = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/courses.json`)
);
// Read file users.json data.json
const users = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/users.json`)
);
// Read file reviews.json data.json
const reviews = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/reviews.json`)
);

// Function call to import data to database
const importData = async () => {
  try {
    await Bootcamp.create(bootcamps);
    await Course.create(courses);
    await User.create(users);
    await Review.create(reviews);
    console.log(`Data Imported...`.green.inverse);
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

// Function call to delete data from database
const deleteData = async () => {
  try {
    await Bootcamp.deleteMany();
    await Course.deleteMany();
    await User.deleteMany();
    await Review.deleteMany();
    console.log(`Data Destroy...`.red.inverse);
    process.exit();
  } catch (er) {
    console.log(err);
  }
};

if (process.argv[2] === "-i") {
  importData();
} else if (process.argv[2] === "-d") {
  deleteData();
}
