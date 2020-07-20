var express = require('express');
const request=require('request')
const mongoose = require('mongoose');
ObjectID = mongoose.Types.ObjectId;
var router = express.Router();
const csv=require('csvtojson')
const Product = require('../models/Product');
const ProductCategory = require('../models/productCategory')
/* GET home page. */
router.get('/', async function(req, res, next) {
  // const categories = [ObjectID("5f1407832516012ba41b338d"),
  //                     ObjectID("5f14078f2516012ba41b338f"),
  //                   ObjectID("5f1407952516012ba41b3391"),
  //                 ObjectID("5f1408182516012ba41b3392"),
  //               ObjectID("5f1408202516012ba41b3393"),
  //             ObjectID("5f1408482516012ba41b3394")];
  // let j = 0;
  // await csv()
  //   .fromStream(request.get('http://agile-refuge-37570.herokuapp.com/products/d91/csv'))
  //   .subscribe(async function(json){
  //     var data = JSON.parse(JSON.stringify(json));
      
  //     let images = [data['images 1'], data['images 2'], data['images 3'], data['images 4'], data['images 5']];
  //     let images_final = [];
  //     for (i = 0; i<images.length; i++) {
  //       if (images[i] !='' && images[i] !=' ')
  //         images_final.push(images[i])
  //     }
  //     data.images = images_final;
  //     data.price = data.price.replace(',','');
  //     data.cluster = data.collection;
  //     data.title = data.name_2;
  //     data.warehouse = '5f0df4fc7b22072ffc9457c6';
  //     let response = await Product.save_product(data);
  //     if (response.isExecuted) {
  //       data = {};
  //       data.warehouse_product_id = response.data._id;
  //       if (j == 6) {
  //         j = 0
  //       }
  //       data.category_id = categories[j];
  //       j = j+1;
  //       response = await ProductCategory.save_product(data);
  //       console.log('aa');
  //     }
      
  //   });
    
    res.status(200).send('aaaa');
});

module.exports = router;
