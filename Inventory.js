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
