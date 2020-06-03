// jshint esversion: 6

const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/fruitsDB", { useNewUrlParser: true });

// { useUnifiedTopology: true },

// FruitSchema is the struture of the fruit database
const fruitSchema = new mongoose.Schema ({
  name: {
    type: String,
    required: [true, "Please check your data entry, there is no name specified!"]
  },
  rating: {
    type: Number,
    min: 1,
    max: 10
  },
  review: String
});

// we the schema to creat mongoose model
const Fruit = mongoose.model("Fruit", fruitSchema);

// const fruit = new Fruit ({
//   rating: 10,
//   review: "sweet."
// });

// fruit.save();

const personSchema = new mongoose.Schema({
  name: String,
  age: Number,
  favouriteFruit: fruitSchema
});

const Person = mongoose.model("Person", personSchema);

const mango = new Fruit ({
  name: "mango",
  score: 8,
  review: "nice fruit"
});

mango.save();

Person.updateOne({name: "John"}, {favouriteFruit: mango}, function(err) {
  if (err) {
    console.log(err);
  } else {
    console.log("successfully updated document");
  }
});

// const person = new Person({
//   name: "Amy",
//   age: 12,
//   favouriteFruit:  pineapple
// });
//
// person.save();

// const kiwi = new Fruit ({
//   name: "Kiwi",
//   rating: 7,
//   review: "Pretty fruit."
// });
// const orange = new Fruit ({
//   name: "Orange",
//   rating: 5,
//   review: "Pretty solid as a fruit."
// });
// const banana = new Fruit ({
//   name: "Banana",
//   rating: 7,
//   review: "Pretty solid as a fruit."
// });
//
// // Fruit.insertMany([kiwi, orange, banana], function(err) {
// //   if (err) {
// //     console.log(err);
// //   }else {
// //     console.log("successfully added to fruitsDB");
// //   }
// // });

Fruit.find(function (err, fruits) {
  if (err) {
    console.log(err);
  } else {

    mongoose.connection.close();
    fruits.forEach (function (fruit) {
      console.log(fruit.name);
    });
  }
});

// Person.deleteMany({name: /John/}, {age: {$gte: 37}}, function (err) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("successfully deleted");
//   }
// });
