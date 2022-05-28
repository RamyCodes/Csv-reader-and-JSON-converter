const Product = require("../models/Product");
const express = require("express");

const csvtojson = require("csvtojson");

const router = require("express").Router();

//CREATE

router.post('/add', async (req, res) => {

	csvtojson()
		.fromFile("Products.csv")
		.then(csvData => {
			console.log(csvData);
			Product.insertMany(csvData).then(function () {
				console.log("Data inserted")
				res.json({success: 'success'});
			}).catch(function(error){
				console.log(error)
			});
		});
})


//UPDATE
router.put("/:id", async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});
