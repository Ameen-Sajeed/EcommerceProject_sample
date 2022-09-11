var db = require('../config/connection')
var collection = require('../config/collection')
var bcrypt = require('bcrypt')
const { ObjectId } = require('mongodb')
const { response } = require('express')
var objectId = require('mongodb').ObjectId
var includes = require('includes')


module.exports = {

  /* -------------------------------------------------------------------------- */
  /*                                 view Users                                 */
  /* -------------------------------------------------------------------------- */
  viewUsers: (data) => {
    return new Promise(async (resolve, reject) => {
      let data = await db.get().collection(collection.USERCOLLECTION).find().toArray()
      resolve(data)
      console.log(data._id)
    })
  },

  /* -------------------------------------------------------------------------- */
  /*                                 block User                                 */
  /* -------------------------------------------------------------------------- */

  blockUser: (Id) => {
    return new Promise(async (resolve, reject) => {
      let details = await db.get().collection(collection.USERCOLLECTION).findOne({ $and: [{ _id: ObjectId(Id) }, { state: true }] })

      if (details) {
        await db.get().collection(collection.USERCOLLECTION).updateOne({ _id: ObjectId(Id) }, { $set: { state: false } }).then((data) => {
          // console.log(data);
          data.status = true;
          console.log("nghadjgfda");
          console.log(data);
          resolve(data)
        })
      } else {
        await db.get().collection(collection.USERCOLLECTION).updateOne({ _id: objectId(Id) }, { $set: { state: true } }).then((data) => {
          resolve(data)
        })
      }

    })
  },


  /* -------------------------------------------------------------------------- */
  /*                                unblock User                                */
  /* -------------------------------------------------------------------------- */
  // unblockUser: (proId) => {
  //   return new Promise(async (resolve, reject) => {
  //     await db.get().collection(collection.USERCOLLECTION).updateOne({ _id: objectId(proId) }, { $set: { state: true } }).then((data) => {
  //       console.log(data)
  //       resolve(data)
  //     })
  //   })
  // },


  /* -------------------------------------------------------------------------- */
  /*                                View product                                */
  /* -------------------------------------------------------------------------- */

  viewProducts: (product) => {
    return new Promise(async (resolve, reject) => {
      let product = await db.get().collection(collection.PRODUCTCOLLECTION).find().toArray()
      resolve(product)
      console.log(product)
    })
  },



  /* -------------------------------------------------------------------------- */
  /*                                 Add Product                                */
  /* -------------------------------------------------------------------------- */

  addproduct: (productData) => {
    console.log(productData);
    return new Promise(async (resolve, reject) => {
      let data = await db.get().collection(collection.PRODUCTCOLLECTION).insertOne(productData)
      resolve(data)
      // console.log(data)
    })
  },


  /* -------------------------------------------------------------------------- */
  /*                               delete Product                               */
  /* -------------------------------------------------------------------------- */

  deleteproduct: (delId) => {
    return new Promise(async (resolve, reject) => {
      await db.get().collection(collection.PRODUCTCOLLECTION).deleteOne({ _id: objectId(delId) }).then((data) => {

        console.log(data)
        resolve(data)

      })

    })
  },

  /* -------------------------------------------------------------------------- */
  /*                               update Product                               */
  /* -------------------------------------------------------------------------- */
  updateProduct: (Id, product) => {
    // console.log(Id);
    return new Promise(async (resolve, reject) => {
      await db.get().collection(collection.PRODUCTCOLLECTION).updateOne({ _id: objectId(Id) }, {
        $set: {
          name: product.name,
          index: product.index,
          category: product.category,
          price: product.price,
          inventory: product.inventory,
          description: product.description,
          image: product.image
        }
      }).then((data) => {
        // console.log(data);
        resolve(data)
      })
    })
  },


  /* -------------------------------------------------------------------------- */
  /*                              getUpdateProduct                              */
  /* -------------------------------------------------------------------------- */

  ViewUpdateproduct: (Id) => {
    return new Promise(async (resolve, reject) => {
      let data = await db.get().collection(collection.PRODUCTCOLLECTION).findOne({ _id: objectId(Id) })
      resolve(data)
    })
  },

  /* -------------------------------------------------------------------------- */
  /*                               delete Category                              */
  /* -------------------------------------------------------------------------- */
  deletecategory: (catId) => {
    return new Promise(async (resolve, reject) => {
      await db.get().collection(collection.CATEGORYCOLLECTION).deleteOne({ _id: objectId(catId) }).then((data) => {

        console.log(data)
        resolve(data)

      })

    })
  },


  /* -------------------------------------------------------------------------- */
  /*                                Add Category                                */
  /* -------------------------------------------------------------------------- */

  addcategory: (categoryData) => {
    return new Promise(async (resolve, reject) => {
      let data = await db.get().collection(collection.CATEGORYCOLLECTION).insertOne(categoryData)
      resolve(data)
      console.log(data)
    })
  },
  /* -------------------------------------------------------------------------- */
  /*                                View Category                               */
  /* -------------------------------------------------------------------------- */

  viewCategory: (category) => {
    return new Promise(async (resolve, reject) => {
      let category = await db.get().collection(collection.CATEGORYCOLLECTION).find().toArray()
      resolve(category)
      console.log(category)
    })
  },

  /* -------------------------------------------------------------------------- */
  /*                                 view Banner                                */
  /* -------------------------------------------------------------------------- */

  viewBanner: (banner) => {
    return new Promise(async (resolve, reject) => {
      let banner = await db.get().collection(collection.BANNERCOLLECTION).find().toArray()
      resolve(banner)
      console.log(banner)
    })
  },

  /* -------------------------------------------------------------------------- */
  /*                                 Add Banner                                 */
  /* -------------------------------------------------------------------------- */

  addBanner: (banner) => {

    return new Promise(async (resolve, reject) => {
      let data = await db.get().collection(collection.BANNERCOLLECTION).insertOne(banner)
      resolve(data)
      // console.log(data)
    })
  },

  /* -------------------------------------------------------------------------- */
  /*                              getUpdate Banner                              */
  /* -------------------------------------------------------------------------- */

  ViewUpdateBanner: (Id) => {
    return new Promise(async (resolve, reject) => {
      let data = await db.get().collection(collection.BANNERCOLLECTION).findOne({ _id: objectId(Id) })
      resolve(data)
    })
  },


  /* -------------------------------------------------------------------------- */
  /*                                Update Banner                               */
  /* -------------------------------------------------------------------------- */

  updateBanner: (Id, banner) => {
    console.log(Id);
    return new Promise(async (resolve, reject) => {
      await db.get().collection(collection.BANNERCOLLECTION).updateOne({ _id: objectId(Id) }, {
        $set: {
          name: banner.name,
          index: banner.index,
          description: banner.description
        }
      }).then((data) => {
        console.log(data);
        resolve(data)
      })
    })
  },

  /* -------------------------------------------------------------------------- */
  /*                                delete Banner                               */
  /* -------------------------------------------------------------------------- */

  deleteBanner: (delId) => {
    return new Promise(async (resolve, reject) => {
      await db.get().collection(collection.BANNERCOLLECTION).deleteOne({ _id: objectId(delId) }).then((data) => {

        console.log(data)
        resolve(data)

      })

    })
  },


  /* -------------------------------------------------------------------------- */
  /*                                 View Orders                                */
  /* -------------------------------------------------------------------------- */

  viewOrders: (order) => {
    return new Promise(async (resolve, reject) => {
      let orders = await db.get().collection(collection.ORDERCOLLECTION).aggregate([
        {
          $lookup: {
            from: collection.ADDRESSCOLLECTION,
            localField: 'deliveryDetails',
            foreignField: '_id',
            as: 'address'
          }
        },

        {
          $unwind: '$address'
        }, {
          $project: {
            date: { $dateToString: { format: "%d-%m-%Y", date: "$date" } }, totalAmount: 1, products: 1, paymentMethod: 1, address: 1, status: 1
          }
        }
      ]).toArray()
      console.log("csdajndj");
      console.log(orders);
      resolve(orders)

    })
  },


  /* -------------------------------------------------------------------------- */
  /*                                cancel Orders                               */
  /* -------------------------------------------------------------------------- */



  cancelOrder: (orderId) => {
    return new Promise(async (resolve, reject) => {

      db.get().collection(collection.ORDERCOLLECTION).updateOne({
        _id: objectId(orderId)


      },
        {
          $set: {
            status: "Cancelled"

          }
        }).then((data) => {
          resolve(data)
        })


    })
  },


  /* -------------------------------------------------------------------------- */
  /*                               Shipped Orders                               */
  /* -------------------------------------------------------------------------- */

  shippedOrder: (orderId) => {
    return new Promise(async (resolve, reject) => {

      db.get().collection(collection.ORDERCOLLECTION).updateOne({
        _id: objectId(orderId)


      },
        {
          $set: {
            status: "Shipped"

          }
        }).then((data) => {
          resolve(data)
        })


    })
  },

  /* -------------------------------------------------------------------------- */
  /*                              Delivered Orders                              */
  /* -------------------------------------------------------------------------- */

  deliveredOrder: (orderId) => {
    return new Promise(async (resolve, reject) => {

      db.get().collection(collection.ORDERCOLLECTION).updateOne({
        _id: objectId(orderId)


      },
        {
          $set: {
            status: "Delivered"

          }
        }).then((data) => {
          resolve(data)
        })


    })
  },




  /* -------------------------------------------------------------------------- */
  /*                         DonutChartData for Payments                        */
  /* -------------------------------------------------------------------------- */


  doNutchartData: () => {

    return new Promise(async (resolve, reject) => {

      let order = await db.get().collection(collection.ORDERCOLLECTION).aggregate([

        {
          $group: {
            _id: "$paymentMethod",
            count: {
              $sum: 1
            }
          }
        },
        // {
        //   $project:{

        //   }
        // }

      ]).toArray()
      console.log(order)
      resolve(order)
    })

  },


  /* -------------------------------------------------------------------------- */
  /*                             order status graph                             */
  /* -------------------------------------------------------------------------- */

  piechartData: () => {

    return new Promise(async (resolve, reject) => {

      let order = await db.get().collection(collection.ORDERCOLLECTION).aggregate([

        {
          $group: {
            _id: "$status",
            count: {
              $sum: 1
            }
          }
        },
    
      ]).toArray()
      console.log(order,"**********************")
      resolve(order)
    })

  },


  /* -------------------------------------------------------------------------- */
  /*                           bar charts for paymenst                          */
  /* -------------------------------------------------------------------------- */

  barchartData: () => {

    return new Promise(async (resolve, reject) => {

      let order = await db.get().collection(collection.ORDERCOLLECTION).aggregate([

      {
        $match:{
          "status": { $nin: ['Cancelled','pending'] }

        }
      },{
        $group:{
          _id:'$paymentMethod',
          totalAmount:{
            $sum:"$totalAmount"
          }
        }
      }

      ]).toArray()
      console.log(order,"99999999999999999999999999")
      resolve(order)
    })

  },


/* -------------------------------------------------------------------------- */
/*                            line Charts of sales                            */
/* -------------------------------------------------------------------------- */

  yearlyChart: () => {
    return new Promise(async (resolve, reject) => {

      let yearChart = await db.get().collection(collection.ORDERCOLLECTION).aggregate([
        {

          $project: {

            year: {
              $year: '$date'
            },
            totalAmount: 1
          }
        }, {
          $group: {
            _id: "$year",
            totalAmount: {
              $sum: "$totalAmount"
            }
          }
        }, {

          $sort: {
            _id: 1
          }

        },
        {

          $limit: 10
        }



      ]).toArray()
      console.log(yearChart);
      resolve(yearChart)
    })



  },


  /* -------------------------------------------------------------------------- */
  /*                               get Total Sales for dashboard                */
  /* -------------------------------------------------------------------------- */




  getDailySales: () => {
    return new Promise(async (resolve, reject) => {

      let dailysales = await db.get().collection(collection.ORDERCOLLECTION).aggregate([
        {
          $match: {
            "status": { $nin: ['cancelled'] }
          }
        },
        {
          $project: {
            date: { $dateToString: { format: "%Y-%m-%d", date: '$date' } }, _id: 1,totalAmount:1
          }
        },

        {
          $group: {
            _id: "$date",
            totalAmount: {
              $sum: "$totalAmount"
            }
          }
        },
        {
          $sort:{_id:1}
        }
       
        // {
        //   $count: 'date'
        // }

      ]).toArray()
      resolve(dailysales)
      // console.log(",**************");
      // console.log(dailysales);
    })
  },


  /* -------------------------------------------------------------------------- */
  /*                       get total orders for dashboard                       */
  /* -------------------------------------------------------------------------- */

  getDailyOrders: () => {
    return new Promise(async (resolve, reject) => {

      let dailyorders = await db.get().collection(collection.ORDERCOLLECTION).aggregate([
        {
          $match: {
            "status": { $nin: ['cancelled'] }
          }
        },
        {
          $project: {
            torders: { $dateToString: { format: "%Y-%m-%d", date: '$date' } }, _id: 1
          }
        },

      
       
        {
          $count: 'torders'
        }

      ]).toArray()
      resolve(dailyorders)
      // console.log(",**************");
      // console.log(dailyorders);
    })
  },

  /* -------------------------------------------------------------------------- */
  /*                        get total users for dashboard                       */
  /* -------------------------------------------------------------------------- */

  getTotalUsers: () => {
    return new Promise(async (resolve, reject) => {

      let TotalUsers = await db.get().collection(collection.USERCOLLECTION).aggregate([
        {
          $match: {
            "state": { $nin: [false] }
          }
        },
        {
          $project: {
            user: { _id: 1  } 
          }
        },

      
       
        {
          $count: 'user'
        }

      ]).toArray()
      resolve(TotalUsers)
      // console.log(",**************");
      // console.log(TotalUsers);
    })
  },

  /* -------------------------------------------------------------------------- */
  /*                     get total block users for dashboard                    */
  /* -------------------------------------------------------------------------- */

  getTotalInactiveUsers: () => {
    return new Promise(async (resolve, reject) => {

      let TotalInactiveUsers = await db.get().collection(collection.USERCOLLECTION).aggregate([
        {
          $match: {
            "state": { $nin: [true] }
          }
        },
        {
          $project: {
            user: { _id: 1  } 
          }
        },

      
       
        {
          $count: 'user'
        }

      ]).toArray()
      resolve(TotalInactiveUsers)
      console.log(",**************");
      console.log(TotalInactiveUsers);
    })
  },




  /* -------------------------------------------------------------------------- */
  /*                       daily sales with specified date                      */
  /* -------------------------------------------------------------------------- */

  getDailySalespro: (day) => {
    return new Promise(async (resolve, reject) => {

      let dailysales = await db.get().collection(collection.ORDERCOLLECTION).aggregate([
        {
          $match: {
            "status": { $nin: ['cancelled'] }
          }
        },
        {
          $unwind: '$products'
        },
        {
          $project: {
            totalAmount: 1,
            date: 1,
            status: 1,
            _id: 1,
            item: '$products.item',
            quantity: '$products.quantity'

          }
        }, {
          $lookup: {
            from: collection.PRODUCTCOLLECTION,
            localField: 'item',
            foreignField: '_id',
            as: 'product'
          }
        },
        {
          $project: {
            date: { $dateToString: { format: "%Y-%m-%d", date: '$date' } }, totalAmount: 1, paymentMethod: 1, item: 1, product: { $arrayElemAt: ['$product', 0] }, quantity: 1
          }
        },
        {
          $match: { date: day }
        },
        {
          $group: {
            _id: '$item',
            quantity: { $sum: '$quantity' },
            totalAmount: { $sum: { $multiply: [{ $toInt: '$quantity' }, { $toInt: '$product.price' }] } },
            name: { $first: '$product.name' },
            date: { $first: '$date' },
            price: { $first: '$product.price' },
          }
        },
        {
          $sort: { _id: 1 },
        }
      ]).toArray()
      resolve(dailysales)
      console.log(",akjs***********");
      console.log(dailysales);
    })
  },


  /* -------------------------------------------------------------------------- */
  /*                    get monthly sale with specified date                    */
  /* -------------------------------------------------------------------------- */



  getMonthlySalesPro: (day) => {
    return new Promise(async (resolve, reject) => {

      let sales = await db.get().collection(collection.ORDERCOLLECTION).aggregate([
        {
          $match: {
            "status": { $nin: ['cancelled'] }
          }
        },
        {
          $project: { dates: { $dateToString: { format: "%Y-%m", date: "$date" } }, totalAmount: 1, date: { $dateToString: { format: "%d-%m-%Y", date: '$date' } } }
        },
        {
          $match: {
            dates: day
          }
        },
        {
          $group: {
            _id: '$date',
            totalAmount: { $sum: '$totalAmount' },
            count: { $sum: 1 }
          }
        },
        {
          $sort: { _id: 1 }
        }

      ]).toArray()
      console.log(sales);
      resolve(sales)
    })

  },




  /* -------------------------------------------------------------------------- */
  /*                              get Monthly Sales                             */
  /* -------------------------------------------------------------------------- */



  getMonthlySales: () => {

    return new Promise(async (resolve, reject) => {

      let monthlysale = await db.get().collection(collection.ORDERCOLLECTION).aggregate([
        {
          $match: {
            "status": { $nin: ['cancelled'] }
          }
        },
        {
          $group: {
            _id: { $dateToString: { format: "%m", date: "$date" } },
            total: { $sum: '$totalAmount' },
            count: { $sum: 1 },
          }
        },
        {
          $sort: { _id: 1 },
        }
      ]).toArray()
      resolve(monthlysale)
      console.log("akjhd");
      console.log(monthlysale);
    })





  },


  /* -------------------------------------------------------------------------- */
  /*                      Yearly Sales with specified Year                      */
  /* -------------------------------------------------------------------------- */

  getYearlySalesPro: (day) => {
    return new Promise(async (resolve, reject) => {

      let sales = await db.get().collection(collection.ORDERCOLLECTION).aggregate([
        {
          $match: {
            "status": { $nin: ['cancelled'] }
          }
        },
        {
          $project: { dates: { $dateToString: { format: "%Y", date: "$date" } }, totalAmount: 1, date: { $dateToString: { format: "%m-%Y", date: '$date' } } }
        },
        {
          $match: {
            dates: day
          }
        },
        {
          $group: {
            _id: '$date',
            totalAmount: { $sum: '$totalAmount' },
            count: { $sum: 1 }
          }
        },
        {
          $sort: { _id: 1 }
        }

      ]).toArray()
      console.log(sales);
      resolve(sales)
    })

  },



  /* -------------------------------------------------------------------------- */
  /*                              get yearly sales                              */
  /* -------------------------------------------------------------------------- */



  getyearlySales: () => {

    return new Promise(async (resolve, reject) => {

      let sale = await db.get().collection(collection.ORDERCOLLECTION).aggregate([
        {
          $match: {
            "status": { $nin: ['cancelled'] }
          }
        },
        {
          $group: {
            _id: { $dateToString: { format: "%Y", date: "$date" } },
            total: { $sum: '$totalAmount' },
            count: { $sum: 1 },
          }
        },
        {
          $sort: { _id: 1 },
        }
      ]).toArray()
      resolve(sale)
      console.log(sale);
    })





  },


  /* -------------------------------------------------------------------------- */
  /*                                 Add Coupon                                 */
  /* -------------------------------------------------------------------------- */

  addCoupon: (couponDetails) => {
    return new Promise(async (resolve, reject) => {
      // couponDetails.endingdate = new Date(couponDetails.endingdate)
      // console.log(couponDetails, "iahaka");
      let response = {}
      let couponExist = await db.get().collection(collection.COUPENCOLLECTION).findOne({ code: couponDetails.code })

      if (couponExist) {
        response.status = true
        response.message = "Coupon With this Code Already Exist"
        resolve(response)
      } else {
        await db.get().collection(collection.COUPENCOLLECTION).insertOne({ name: couponDetails.name, code: couponDetails.code, endingdate: couponDetails.endingdate, value: couponDetails.value, minAmount: couponDetails.minAmount, maxAmount: couponDetails.maxAmount, status: true }).then((response) => {
          response.message = 'Coupon Added successfully'
          response.status = false
          resolve(response)
        })
      }

    })
  },




  /* -------------------------------------------------------------------------- */
  /*                                View Coupons                                */
  /* -------------------------------------------------------------------------- */

  viewCoupens: (coupen) => {
    return new Promise(async (resolve, reject) => {
      let coupen = await db.get().collection(collection.COUPENCOLLECTION).find().toArray()
      resolve(coupen)
      console.log(coupen)
    })
  },




  /* -------------------------------------------------------------------------- */
  /*                                Apply Coupon                                */
  /* -------------------------------------------------------------------------- */


  applyCoupon: (details, userId, date) => {
    return new Promise(async (resolve, reject) => {
      let response = {}
      // let coupon = await db.get().collection(collection.COUPON_COLLECTION).findOne({couponId:details.coupon})
      let coupon = await db.get().collection(collection.COUPENCOLLECTION).findOne({ code: details.coupon, status: true })
      console.log(coupon, 'couponpre');
      // console.log(expDate);
      // console.log(coupon.status);

      if (coupon) {
        const expDate = new Date(coupon.endingdate)
        response.couponData = coupon
        let user = await db.get().collection(collection.COUPENCOLLECTION).findOne({ code: details.coupon, Users: objectId(userId) })
        if (user) {
          response.used = "Coupon Already Used"
          resolve(response)
        } else {

          if (date <= expDate) {

            response.dateValid = true
            // response.Coupenused = false

            resolve(response)
            let total = details.total
            // let total = 24000;
            console.log(total, 'total');
            console.log(coupon.minAmount, 'kkkkmin');
            console.log(coupon.maxAmount, 'kkkkkmax');

            if (total >= coupon.minAmount) {
              console.log('amount heloooo');
              response.verifyminAmount = true
              // response.Coupenused = false

              resolve(response)

              if (total <= coupon.maxAmount) {
                console.log('amountmax heloooo');
                response.verifymaxAmount = true
                //  response.Coupenused = false

                resolve(response)
              } else {
                response.maxAmountMsg = 'Your maximum purchase should be' + coupon.maxAmount
                response.maxAmount = true
                // console.log(response.maxAmount,'resmaxamount');
                resolve(response)
              }

            } else {
              response.minAmountMsg = 'Your minimum purchase should be' + coupon.minAmount
              response.minAmount = true
              resolve(response)
            }




          } else {
            response.invalidDateMsg = 'Coupon Expired'
            response.invalidDate = true
            response.Coupenused = false

            resolve(response)
            console.log('invalid date');
          }


        }
      } else {
        response.invalidCoupon = true
        response.invalidCouponMsg = ' Invalid Coupon '
        resolve(response)
      }

      if (response.dateValid && response.verifymaxAmount && response.verifyminAmount) {
        response.verify = true
        // db.get().collection(collection.COUPON_COLLECTION).updateOne({couponId:details.coupon},
        //     {
        //         $push:{users:objectId(userId)}
        //     })

        db.get().collection(collection.CARTCOLLECTION).updateOne({ user: objectId(userId) }, {

          $set: {
            coupon: objectId(coupon._id)
          }
        })

        resolve(response)
        console.log('hi heloo');
      }
    })
  },


  /* -------------------------------------------------------------------------- */
  /*                              Verifying Coupon                              */
  /* -------------------------------------------------------------------------- */

  couponVerify: (user) => {
    console.log('hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh');

    console.log(user);

    return new Promise(async (resolve, reject) => {

      let userCart = await db.get().collection(collection.CARTCOLLECTION).findOne({ user: objectId(user) })


      if (userCart.coupon) {

        let coupenData = await db.get().collection(collection.COUPENCOLLECTION).findOne({ _id: objectId(userCart.coupon) })

        resolve(coupenData)
        console.log(coupenData);


      }


      resolve(userCart)
      console.log("iiiiiiiiiiiiiiiiiiiiiiiii");
      console.log(userCart);
    })
  },

/* -------------------------------------------------------------------------- */
/*                                Remove Coupon                               */
/* -------------------------------------------------------------------------- */

  removeCoupon: (user) => {

    return new Promise(async (resolve, reject) => {
      await db.get().collection(collection.CARTCOLLECTION).updateOne({ user: objectId(user) }, {

        $unset: {

          coupon: ""
        }

      }).then((response) => {
        resolve(response)

      })

    })
  },


  addProductOffer: (data) => {

    return new Promise(async (resolve, reject) => {

      let product = await db.get().collection(collection.PRODUCTCOLLECTION).find({ _id: objectId(data.prodoffer) }).toArray()

    })
  }

}
