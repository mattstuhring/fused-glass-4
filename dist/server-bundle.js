/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/server/server.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./db/knex.js":
/*!********************!*\
  !*** ./db/knex.js ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nconst environment = \"development\" || false;\nconst knexConfig = __webpack_require__(/*! ./knexfile */ \"./db/knexfile.js\")[environment];\nconst knex = __webpack_require__(/*! knex */ \"knex\")(knexConfig);\n\nmodule.exports = knex;\n\n\n//# sourceURL=webpack:///./db/knex.js?");

/***/ }),

/***/ "./db/knexfile.js":
/*!************************!*\
  !*** ./db/knexfile.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = {\n  development: {\n    client: 'pg',\n    connection: 'postgres://localhost/fused_glass_dev',\n    migrations: {\n      directory: './migrations'\n    },\n    seeds: {\n      directory: './seeds'\n    }\n  },\n\n  production: {\n    client: 'pg',\n    connection: process.env.DATABASE_URL,\n    migrations: {\n      directory: './migrations'\n    },\n    seeds: {\n      directory: './seeds'\n    }\n  }\n};\n\n\n//# sourceURL=webpack:///./db/knexfile.js?");

/***/ }),

/***/ "./src/server/routes/categories.js":
/*!*****************************************!*\
  !*** ./src/server/routes/categories.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nconst knex = __webpack_require__(/*! ../../../db/knex */ \"./db/knex.js\");\nconst express = __webpack_require__(/*! express */ \"express\");\nconst router = express.Router();\n\n\n// GET ALL PRODUCTS IN CATEGORY\nrouter.get('/categories/:id', (req, res, next) => {\n  knex('categories')\n    .select('*')\n    .innerJoin('products', 'products.category_id', 'categories.category_id')\n    .where('products.category_id', req.params.id)\n    .then((product) => {\n      res.send(product);\n    })\n    .catch((err) => {\n      next(err);\n    });\n});\n\n\n// GET ALL COLLECTIONS IN CATEGORY\nrouter.get('/categories/:id/collections', (req, res, next) => {\n  knex('categories')\n    .select()\n    .innerJoin('collections', 'collections.category_id', 'categories.category_id')\n    .where('collections.category_id', req.params.id)\n    .then((product) => {\n      res.send(product);\n    })\n    .catch((err) => {\n      next(err);\n    });\n});\n\n\n// INSERT NEW COLLECTION INTO CATEGORY\nrouter.post('/categories/collection', (req, res, next) => {\n  const { name } = req.body;\n  const categoryId = parseInt(req.body.categoryId);\n\n  knex('collections')\n    .insert({\n      collection_name: name,\n      category_id: categoryId\n    }, '*')\n    .then(() => {\n      return knex('collections')\n        .select('*')\n        .where('category_id', categoryId)\n        .then((collections) => {\n          res.send(collections);\n        })\n        .catch((err) => {\n          next(err);\n        })\n    })\n    .catch((err) => {\n      next(err);\n    });\n});\n\n\n// DELETE COLLECTION FROM SIDE NAV CATEGORY & PRODUCTS_COLLECTIONS RELATIONSHIP\nrouter.delete('/categories/:categoryId/collection/:collectionId', (req, res, next) => {\n  const { categoryId, collectionId } = req.params;\n\n  knex('collections')\n    .where('category_id', categoryId)\n    .where('collections.collection_id', collectionId)\n    .del()\n    .then(() => {\n      return knex('collections')\n        .select('*')\n        .where('category_id', categoryId)\n        .then((collections) => {\n          res.send(collections);\n        })\n        .catch((err) => {\n          next(err);\n        });\n    })\n    .catch((err) => {\n      next(err);\n    });\n});\n\nmodule.exports = router;\n\n\n//# sourceURL=webpack:///./src/server/routes/categories.js?");

/***/ }),

/***/ "./src/server/routes/cloudinary.js":
/*!*****************************************!*\
  !*** ./src/server/routes/cloudinary.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nconst knex = __webpack_require__(/*! ../../../db/knex */ \"./db/knex.js\");\nconst express = __webpack_require__(/*! express */ \"express\");\nconst cloudinary = __webpack_require__(/*! cloudinary */ \"cloudinary\");\nconst router = express.Router();\n\ncloudinary.config({\n  cloud_name: process.env.CLOUD_NAME,\n  api_key: process.env.API_KEY,\n  api_secret: process.env.API_SECRET\n});\n\n\n//\nrouter.post('/cloudinary', (req, res, next) => {\n  console.log('SUCCESS');\n\n  res.sendStatus(200);\n});\n\n\n\nmodule.exports = router;\n\n\n//# sourceURL=webpack:///./src/server/routes/cloudinary.js?");

/***/ }),

/***/ "./src/server/routes/collections.js":
/*!******************************************!*\
  !*** ./src/server/routes/collections.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nconst knex = __webpack_require__(/*! ../../../db/knex */ \"./db/knex.js\");\nconst express = __webpack_require__(/*! express */ \"express\");\nconst router = express.Router();\n\n// GET ALL PRODUCTS BY COLLECTION ID\nrouter.get('/collections/:id', (req, res, next) => {\n  knex('products')\n    .select('*')\n    .innerJoin('products_collections', 'products.product_id', 'products_collections.product_id')\n    .where('products_collections.collection_id', req.params.id)\n    .then((product) => {\n      res.send(product);\n    })\n    .catch((err) => {\n      next(err);\n    });\n});\n\nmodule.exports = router;\n\n\n//# sourceURL=webpack:///./src/server/routes/collections.js?");

/***/ }),

/***/ "./src/server/routes/createPayment.js":
/*!********************************************!*\
  !*** ./src/server/routes/createPayment.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nconst knex = __webpack_require__(/*! ../../../db/knex */ \"./db/knex.js\");\nconst express = __webpack_require__(/*! express */ \"express\");\nconst router = express.Router();\nconst request = __webpack_require__(/*! request */ \"request\");\nconst PAYPAL_API = 'https://api.sandbox.paypal.com';\nconst CLIENT = 'AX3x_CybpUYv5tqxs48pCnRO4yifsqtc8ZPnS_DHTfx9aXP5JkXeUMvXBM-Fn9W90WqMjwsTYLyX-4-k';\nconst SECRET = 'EFOC5Fh4bd0bWLk9C-mGBh8HYQqAd-quiRkBOZgi6EdIcAJ70i9cEcmJ4OBG8B1JOuC1KPbU15gFu7go';\n\n\nrouter.post('/createPayment', (req, res, next) => {\n    console.log('Create Payment!');\n\n    request.post(PAYPAL_API + '/v1/payments/payment', {\n      auth: {\n        user: CLIENT,\n        pass: SECRET\n      },\n      body: {\n        intent: 'sale',\n        payer: {\n          payment_method: 'paypal'\n        },\n        transactions: [{\n          amount: {\n            total: '5.99',\n            currency: 'USD'\n          }\n        }],\n        redirect_urls: {\n          return_url: 'http://192.168.1.17:3000/cart',\n          cancel_url: 'http://192.168.1.17:3000/cart'\n        }\n      },\n      json: true\n    }, function (err, response) {\n        if (err) {\n          console.error(err);\n          return res.sendStatus(500);\n        }\n\n        // 3. Return the payment ID to the client\n        res.json({\n          id: response.body.id\n        });\n    });\n});\n\n\nmodule.exports = router;\n\n\n//# sourceURL=webpack:///./src/server/routes/createPayment.js?");

/***/ }),

/***/ "./src/server/routes/executePayment.js":
/*!*********************************************!*\
  !*** ./src/server/routes/executePayment.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nconst knex = __webpack_require__(/*! ../../../db/knex */ \"./db/knex.js\");\nconst express = __webpack_require__(/*! express */ \"express\");\nconst router = express.Router();\nconst request = __webpack_require__(/*! request */ \"request\");\nconst PAYPAL_API = 'https://api.sandbox.paypal.com';\nconst CLIENT = 'AX3x_CybpUYv5tqxs48pCnRO4yifsqtc8ZPnS_DHTfx9aXP5JkXeUMvXBM-Fn9W90WqMjwsTYLyX-4-k';\nconst SECRET = 'EFOC5Fh4bd0bWLk9C-mGBh8HYQqAd-quiRkBOZgi6EdIcAJ70i9cEcmJ4OBG8B1JOuC1KPbU15gFu7go';\n\nrouter.post('/executePayment', (req, res, next) => {\n  var paymentID = req.body.paymentID;\n  var payerID   = req.body.payerID;\n\n  request.post(PAYPAL_API + '/v1/payments/payment/' + paymentID + '/execute', {\n    auth: {\n      user: CLIENT,\n      pass: SECRET\n    },\n    body: {\n      payer_id: payerID,\n      transactions: [{\n        amount: {\n          total: '10.99',\n          currency: 'USD'\n        }\n      }]\n    },\n    json: true\n  }, function (err, response) {\n    if (err) {\n      console.error(err);\n      return res.sendStatus(500);\n    }\n\n    // 4. Return a success response to the client\n    res.json({\n      status: 'success'\n    });\n  });\n});\n\n\n\nmodule.exports = router;\n\n\n//# sourceURL=webpack:///./src/server/routes/executePayment.js?");

/***/ }),

/***/ "./src/server/routes/images.js":
/*!*************************************!*\
  !*** ./src/server/routes/images.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nconst knex = __webpack_require__(/*! ../../../db/knex */ \"./db/knex.js\");\nconst express = __webpack_require__(/*! express */ \"express\");\nconst multer  = __webpack_require__(/*! multer */ \"multer\");\nconst upload = multer()\nconst cloudinary = __webpack_require__(/*! cloudinary */ \"cloudinary\");\nconst Datauri = __webpack_require__(/*! datauri */ \"datauri\");\nconst path = __webpack_require__(/*! path */ \"path\");\nconst router = express.Router();\n\n\n// GET ALL SECONDARY PRODUCT IMAGES BY ID\nrouter.get('/images/:id', (req, res, next) => {\n  knex('images')\n    .select('*')\n    .where('images.product_id', req.params.id)\n    .then((images) => {\n      res.send(images);\n    })\n    .catch((err) => {\n      next(err);\n    });\n});\n\n\n\n\n// POST PRODUCT SECONDARY IMAGES\nrouter.post('/images', upload.array('images'), (req, res, next) => {\n  cloudinary.config({\n    cloud_name: process.env.CLOUD_NAME,\n    api_key: process.env.API_KEY,\n    api_secret: process.env.API_SECRET\n  });\n\n  const { category } = req.body;\n  let { id } = req.body;\n  let categoryName;\n  let productId;\n\n  if (Array.isArray(id) === true) {\n    productId = parseInt(req.body.id[0]);\n  } else {\n    productId = parseInt(req.body.id);\n  }\n\n  if (Array.isArray(category) === true) {\n    categoryName = req.body.category[0];\n  } else {\n    categoryName = req.body.category;\n  }\n\n\n  // CHECK IF THERE ARE ANY SECONARY IMAGES\n  if (req.files) {\n    req.files.forEach((file) => {\n      const datauri = new Datauri();\n      datauri.format(path.extname(file.originalname).toString(), file.buffer);\n\n      cloudinary.v2.uploader.upload(datauri.content,\n        {\n          folder: `${categoryName}/${productId}/`,\n          tags: productId,\n          height: 400,\n          weight: 500,\n          crop: 'limit'\n        },\n        function(error, result) {\n          if (error) {\n            next(error);\n          }\n\n          knex('images')\n            .insert({\n              image_public_id: result.public_id,\n              product_id: productId\n            })\n            .then((r) => {\n              console.log(r, '********* r');\n            })\n            .catch((err) => {\n              next(err);\n            });\n        });\n    });\n  }\n\n  res.sendStatus(200);\n});\n\n\n\n\n// UPDATE PRODUCT SECONDARY IMAGES\nrouter.put('/images', upload.array('images'), (req, res, next) => {\n  cloudinary.config({\n    cloud_name: process.env.CLOUD_NAME,\n    api_key: process.env.API_KEY,\n    api_secret: process.env.API_SECRET\n  });\n\n  // console.log(req.body, '*********** req.body');\n  // console.log(req.files, '********** req.files');\n\n  let { id, category } = req.body;\n  let productId;\n  let categoryName;\n\n  if (Array.isArray(id) === true) {\n    productId = parseInt(req.body.id[0]);\n  } else {\n    productId = parseInt(req.body.id);\n  }\n\n  if (Array.isArray(category) === true) {\n    categoryName = req.body.category[0];\n  } else {\n    categoryName = req.body.category;\n  }\n\n  if (req.files.length > 0) {\n    // NORMAL PROCESS FLOW\n    // UPLOAD ALL IMAGES TO CLOUDINARY AND INSERT ALL IMAGES INTO DB\n    req.files.forEach((file) => {\n      const datauri = new Datauri();\n      datauri.format(path.extname(file.originalname).toString(), file.buffer);\n\n      // UPLOAD ALL IMAGES TO CLOUDINARY\n      cloudinary.v2.uploader.upload(datauri.content,\n        {\n          folder: `${categoryName}/${productId}/`,\n          tags: productId,\n          height: 400,\n          weight: 500,\n          crop: 'limit'\n        },\n        function(error, result) {\n          if (error) {\n            next(error);\n          }\n\n          // INSERT ALL IMAGES INTO DB\n          knex('images')\n            .insert({\n              image_public_id: result.public_id,\n              product_id: productId\n            })\n            .then((r) => {\n              console.log(r.command, '********* success');\n            })\n            .catch((err) => {\n              next(err);\n            });\n        });\n    });\n  }\n\n  res.sendStatus(200);\n});\n\n\n\n\n\n\n\n\n// DELETE SECONDARY IMAGE FROM CLOUDINARY & DB\nrouter.delete('/images/:imagePublicId', (req, res, next) => {\n  const imagePublicId = req.params.imagePublicId;\n\n  // DELETE SECONDARY IMAGE FROM CLOUDINARY\n  cloudinary.v2.api.delete_resources(imagePublicId, function(err, res) {\n    if (err) {\n      next(err);\n    }\n    console.log(res, '*********  CLOUD DELETE SUCCESS');\n  });\n\n  // DELETE ROW FROM DB BY IMAGE PUBLIC ID\n  knex('images')\n    .where('images.image_public_id', imagePublicId)\n    .del()\n    .then((r) => {\n      console.log('********* DELETE');\n\n      // COMPLETE WITH STATUS 200\n      res.sendStatus(200);\n    })\n    .catch((err) => {\n      next(err);\n    });\n});\n\n\nmodule.exports = router;\n\n\n//# sourceURL=webpack:///./src/server/routes/images.js?");

/***/ }),

/***/ "./src/server/routes/login.js":
/*!************************************!*\
  !*** ./src/server/routes/login.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nconst knex = __webpack_require__(/*! ../../../db/knex */ \"./db/knex.js\");\nconst express = __webpack_require__(/*! express */ \"express\");\nconst bcrypt = __webpack_require__(/*! bcrypt */ \"bcrypt\");\nconst router = express.Router();\nconst { camelizeKeys } = __webpack_require__(/*! humps */ \"humps\");\nconst jwt = __webpack_require__(/*! jsonwebtoken */ \"jsonwebtoken\")\n\n\nrouter.get('/login', (req, res, next) => {\n  res.sendStatus(200);\n});\n\n\nrouter.post('/login', (req, res, next) => {\n  let user;\n\n  knex('users')\n    .where('user_email', req.body.email)\n    .first()\n    .then((row) => {\n      console.log(row, '********* row')\n      if (!row) {\n        console.log(401, 'Invalid username or password');\n        res.sendStatus(401);\n      }\n\n      user = camelizeKeys(row);\n\n      return bcrypt.compare(req.body.password, user.userHashedPassword);\n    })\n    .then(() => {\n      const token = jwt.sign(\n        {\n          userId: user.userId,\n          email: user.userEmail\n        },\n        process.env.JWT_SECRET,\n        {\n          expiresIn: 86400 // expires in 24 hours\n        }\n      );\n\n      res.status(200).send({ auth: true, token: token });\n    })\n    .catch(bcrypt.MISMATCH_ERROR, () => {\n      console.log(401, 'Invalid username or password.');\n    })\n    .catch((err) => {\n      next(err);\n    });\n});\n// router.post('/login', (req, res, next) => {\n//   let user;\n//\n//   knex('users')\n//     .where('user_email', req.body.email)\n//     .first()\n//     .then((row) => {\n//       if (!row) {\n//         console.log(401, 'Invalid username or password');\n//         res.sendStatus(401);\n//       }\n//\n//       user = camelizeKeys(row);\n//\n//       return bcrypt.compare(req.body.password, user.userHashedPassword);\n//     })\n//     .then(() => {\n//       const expiry = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30);\n//\n//       const token = jwt.sign(\n//         { userId: user.userId, email: user.userEmail },\n//         process.env.JWT_SECRET,\n//         { expiresIn: '30 days' }\n//       );\n//\n//       // res.cookie('accessToken', token, {\n//       //   httpOnly: true,\n//       //   expires: expiry,\n//       //   secure: router.get('env') === 'production'\n//       // });\n//       //\n//       // res.cookie('loggedIn', true, {\n//       //   expires: expiry,\n//       //   secure: router.get('env') === 'production'\n//       // });\n//       //\n//       // res.cookie('access', user.access, {\n//       //   expires: expiry,\n//       //   secure: router.get('env') === 'production'\n//       // });\n//\n//       res.send(token);\n//     })\n//     .catch(bcrypt.MISMATCH_ERROR, () => {\n//       console.log(401, 'Invalid username or password.');\n//     })\n//     .catch((err) => {\n//       next(err);\n//     });\n// });\n\n\nrouter.delete('/token', (req, res) => {\n  res.clearCookie('accessToken');\n  res.clearCookie('loggedIn');\n  res.clearCookie('access');\n  res.sendStatus(200);\n});\n\nmodule.exports = router;\n\n\n//# sourceURL=webpack:///./src/server/routes/login.js?");

/***/ }),

/***/ "./src/server/routes/productQty.js":
/*!*****************************************!*\
  !*** ./src/server/routes/productQty.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nconst knex = __webpack_require__(/*! ../../../db/knex */ \"./db/knex.js\");\nconst express = __webpack_require__(/*! express */ \"express\");\nconst router = express.Router();\n\n\n\nrouter.post('/productQty', (req, res, next) => {\n  console.log(req.body, '******* body')\n\n  const prodsIDs = req.query.productsIDs;\n  let psIDs = [];\n\n  prodsIDs.forEach((el) => {\n    return psIDs.push(parseInt(el));\n  });\n\n  console.log(psIDs, '*********** psIDs');\n\n\n  knex('products')\n    .select('*')\n    .whereIn('products.product_id', psIDs)\n    .then((prods) => {\n      console.log(prods);\n\n      res.send(prods);\n    })\n    .catch((err) => {\n      next(err);\n    });\n});\n\n\n\nmodule.exports = router;\n\n\n//# sourceURL=webpack:///./src/server/routes/productQty.js?");

/***/ }),

/***/ "./src/server/routes/products.js":
/*!***************************************!*\
  !*** ./src/server/routes/products.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nconst knex = __webpack_require__(/*! ../../../db/knex */ \"./db/knex.js\");\nconst express = __webpack_require__(/*! express */ \"express\");\nconst multer  = __webpack_require__(/*! multer */ \"multer\");\nconst upload = multer()\nconst cloudinary = __webpack_require__(/*! cloudinary */ \"cloudinary\");\nconst Datauri = __webpack_require__(/*! datauri */ \"datauri\");\nconst path = __webpack_require__(/*! path */ \"path\");\nconst router = express.Router();\n\ncloudinary.config({\n  cloud_name: process.env.CLOUD_NAME,\n  api_key: process.env.API_KEY,\n  api_secret: process.env.API_SECRET\n});\n\n\n// GET PRODUCT DETAILS BY ID\nrouter.get('/products/:id', (req, res, next) => {\n  const productId = req.params.id;\n\n  // GET PRODUCT TABLE\n  knex('products')\n    .select('*')\n    .where('products.product_id', productId)\n    .innerJoin('categories', 'categories.category_id', 'products.category_id')\n    .then((product) => {\n\n      // CHECK IF PRODUCTS_COLLECTIONS EXISTS\n      return knex('products_collections')\n        .select('*')\n        .where('products_collections.product_id', productId)\n        .innerJoin('collections', 'products_collections.collection_id', 'collections.collection_id')\n        .then((colls) => {\n\n          let collections = [];\n\n          // IF PRODUCTS_COLLECTIONS EXISTS\n          if (colls.length > 0) {\n            colls.forEach((c) => {\n              collections.push(c);\n            });\n          }\n\n          product.push(collections);\n\n          // SEND PRODUCT DETAILS\n          res.send(product);\n        })\n        .catch((err) => {\n          next(err);\n        });\n    })\n    .catch((err) => {\n      next(err);\n    });\n});\n\n\n\n\n\n\n// INSERT NEW PRODUCT TO DB & UPLOAD PRIMARY IMAGE TO CLOUDINARY\nrouter.post('/products', upload.single('primary'), (req, res, next) => {\n\n  // GENERATE DATA URI SCHEME\n  const datauri = new Datauri();\n  datauri.format(path.extname(req.file.originalname).toString(), req.file.buffer);\n\n  // PRODUCT VARIABLES\n  const { name, description, price, size } = req.body;\n  let { category, collections, categoryId } = req.body;\n\n  // INSERT NEW PRODUCT INTO DB\n  knex('products')\n    .insert({\n      product_name: name,\n      product_price: price,\n      product_description: description,\n      product_size: size,\n      product_image_public_id: '',\n      category_id: parseInt(categoryId)\n    })\n    .returning('product_id')\n    .then((productId) => {\n      productId = parseInt(productId[0]);\n\n      // IF COLLECTIONS EXIST, INSERT COLLECTIONS INTO DB\n      if (collections !== '' || collections.length >= 1) {\n\n        if (collections.length === 1) {\n          let collName = collections;\n          collections = [];\n          collections.push(collName);\n        }\n\n        if (collections.length > 1) {\n          collections = collections.split(',');\n        }\n\n        // INSERT COLLECTIONS INTO DB\n        knex('collections')\n          .select('collection_id')\n          .whereIn('collection_name', collections)\n          .then((collectionIdArray) => {\n            let db = knex.table('products_collections')\n            const colls = [];\n\n            // CREATE COLLECTIONS ARRAY\n            collectionIdArray.forEach((item) => {\n              colls.push({\n                product_id: productId,\n                collection_id: parseInt(item.collection_id)\n              })\n            });\n\n            // INSERT COLLECTIONS ARRAY\n            db.insert(colls)\n              .then((r) => {\n                console.log('collections successful');\n              })\n              .catch((err) => {\n                next(err);\n              });\n          })\n          .catch((err) => {\n            next(err);\n          });\n      }\n\n      // UPLOAD PRIMARY DROPZONE IMAGE TO CLOUNDINARY\n      cloudinary.v2.uploader.upload(datauri.content,\n        {\n          folder: `${category}/${productId}/`,\n          tags: productId,\n          height: 400,\n          weight: 500,\n          crop: 'limit'\n        },\n        function(error, result) {\n          if (error) {\n            console.log(error, '********** CLOUD ERROR');\n          }\n\n          // INSERT IMAGE INTO DB\n          knex('products')\n            .where('products.product_id', productId)\n            .update({\n              product_image_public_id: result.public_id\n            })\n            .then((data) => {\n              console.log(productId, '********* productId');\n\n              // SEND RESPONSE -> PRODUCT ID\n              res.send(productId.toString());\n            })\n            .catch((err) => {\n              next(err)\n            });\n        });\n    })\n    .catch((err) => {\n      next(err);\n    });\n});\n\n\n\n\n\n\n\n// UPDATE PRODUCT IN CLOUDINARY & DB\nrouter.put('/products', upload.single('primary'), (req, res, next) => {\n  const { category, name, description, price, size } = req.body;\n  let { productId, collections, categoryId } = req.body;\n  productId = parseInt(productId);\n  categoryId = parseInt(categoryId);\n  let knexProductsCollections;\n  let knexCollections;\n\n  // CHECK IF COLLECTIONS EXISTS && COLLECTIONS LENGTH IS > 0\n  if (typeof collections !== 'undefined') {\n    let collectionsNameArray = [];\n\n    // COLLECTIONS VARIABLE CONFIG\n    if (collections.length > 0) {\n      collectionsNameArray = collections.split(',');\n    } else {\n      collectionsNameArray = [];\n    }\n\n    // SELECT ALL COLLECTION_ID's BY COLLECTION_NAME's\n    knex('collections')\n      .select('collection_id')\n      .whereIn('collection_name', collectionsNameArray)\n      .then((collectionIdArray) => {\n\n        // DELETE ALL PRODUCTS_COLLECTIONS ROWS IN DB BY PRODUCT_ID\n        return knex('products_collections')\n          .where('products_collections.product_id', productId)\n          .del()\n          .then((r) => {\n            let db = knex.table('products_collections')\n            let coll = [];\n\n            // CREATE PRODUCTS_COLLECTIONS ROWS TO BE INSERTED\n            collectionIdArray.forEach((item) => {\n              coll.push({\n                product_id: productId,\n                collection_id: parseInt(item.collection_id)\n              })\n            });\n\n            // INSERT NEW PRODUCTS_COLLECTIONS ROWS INTO DB\n            db.insert(coll)\n              .then(() => {\n                console.log('Insert collection sucessful!');\n              })\n              .catch((err) => {\n                next(err);\n              });\n          })\n          .catch((err) => {\n            next(err);\n          });\n      })\n      .catch((err) => {\n        next(err);\n      });\n  }\n\n  // UPDATE PRODUCT DETAILS IN DB\n  knex('products')\n    .select('*')\n    .where('products.product_id', productId)\n    .returning('product_image_public_id')\n    .update({\n      product_name: name,\n      product_price: price,\n      product_description: description,\n      product_size: size\n    })\n    .then((productImagePublicId) => {\n      const file = req.file;\n\n      // IF THERE IS A PRIMARY IMAGE FILE:\n      // DELETE THE OLD IMAGE FROM CLOUDINARY\n      // UPLOAD NEW IMAGE TO CLOUDINARY\n      // UPDATE DB WITH NEW PUBLIC_ID\n      if (file !== undefined && Object.keys(file).length > 0 && file.constructor === Object) {\n\n        // DELETE PRIMARY IMAGE FROM CLOUDINARY\n        cloudinary.v2.api.delete_resources(productImagePublicId, function(err, res) {\n          console.log(res, '*********  CLOUD DELETE SUCCESS');\n        });\n\n        const datauri = new Datauri();\n        datauri.format(path.extname(file.originalname).toString(), file.buffer);\n\n        // UPLOAD NEW PRIMARY IMAGE TO CLOUDINARY\n        cloudinary.v2.uploader.upload(datauri.content,\n          {\n            folder: `${category}/${productId}/`,\n            tags: productId,\n            height: 400,\n            weight: 500,\n            crop: 'limit'\n          },\n          function(err, result) {\n            if (err) {\n              next(err)\n            }\n\n            // UPDATE PRODUCT WITH CLOUDINARY PUBLIC_ID\n            knex('products')\n              .where('products.product_id', productId)\n              .update({\n                product_image_public_id: result.public_id\n              })\n              .then((data) => {\n                res.send(productId.toString());\n              })\n              .catch((err) => {\n                next(err)\n              });\n          });\n      }\n      else {\n        // IF THERE IS NO IMAGE FILE:\n        // SEND BACK PRODUCT ID, MUST BE SENT AS A STRING.\n        res.send(productId.toString());\n      }\n    })\n    .catch((err) => {\n      next(err);\n    });\n});\n\n\n\n\n\nconst { exec } = __webpack_require__(/*! child_process */ \"child_process\");\n\n// DELETE PRODUCT BY ID\nrouter.delete('/products/:productId/:categoryName', (req, res, next) => {\n  console.log(req.params.productId, '********** PRODUCT ID');\n  const productId = req.params.productId;\n  let categoryName = req.params.categoryName;\n  categoryName = categoryName[0].toUpperCase() + categoryName.substr(1);\n\n  // DELETE IMAGE FROM CLOUDINARY BY PRODUCT ID TAG NAME\n  cloudinary.v2.api.delete_resources_by_tag(productId, function(err, res) {\n    console.log(res, '*********  CLOUD DELETE BY TAG NAME');\n  });\n\n  exec(`curl -X DELETE -u ${process.env.API_KEY}:${process.env.API_SECRET} \"https://api.cloudinary.com/v1_1/${process.env.CLOUD_NAME}/folders/${categoryName}/${productId}\"`, (err, stdout, stderr) => {\n    if (err) {\n      console.error(`exec error: ${err}`);\n      return;\n    }\n\n    console.log(`Something was successful`);\n  });\n\n  // UPDATE PRODUCT DETAILS IN DB\n  knex('products')\n    .where('products.product_id', productId)\n    .del()\n    .then((r) => {\n      console.log(r, '******** DELETE RES');\n      res.sendStatus(200);\n    })\n    .catch((err) => {\n      next(err);\n    });\n});\n\nmodule.exports = router;\n\n\n//# sourceURL=webpack:///./src/server/routes/products.js?");

/***/ }),

/***/ "./src/server/server.js":
/*!******************************!*\
  !*** ./src/server/server.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n// setup env variables\n__webpack_require__(/*! dotenv */ \"dotenv\").config();\n\n// SILENCE ERROR IN PROD\nif (false) {}\n\n// PACKAGES . . .\nconst express = __webpack_require__(/*! express */ \"express\");\nconst path = __webpack_require__(/*! path */ \"path\");\nconst bodyParser = __webpack_require__(/*! body-parser */ \"body-parser\");\nconst morgan = __webpack_require__(/*! morgan */ \"morgan\");\nconst cookieSession = __webpack_require__(/*! cookie-session */ \"cookie-session\");\nconst webpackDevMiddleware = __webpack_require__(/*! webpack-dev-middleware */ \"webpack-dev-middleware\");\n\nconst PORT = process.env.PORT || 3000;\nconst webpack = __webpack_require__(/*! webpack */ \"webpack\");\nconst webpackConfig = __webpack_require__(/*! ../../webpack.server.config.js */ \"./webpack.server.config.js\");\nconst compiler = webpack(webpackConfig);\n\n// SETUP ROUTES . . .\nconst categories = __webpack_require__(/*! ./routes/categories */ \"./src/server/routes/categories.js\");\nconst collections = __webpack_require__(/*! ./routes/collections */ \"./src/server/routes/collections.js\");\nconst products = __webpack_require__(/*! ./routes/products */ \"./src/server/routes/products.js\");\nconst images = __webpack_require__(/*! ./routes/images */ \"./src/server/routes/images.js\");\nconst cloudinary = __webpack_require__(/*! ./routes/cloudinary */ \"./src/server/routes/cloudinary.js\");\nconst productQty = __webpack_require__(/*! ./routes/productQty */ \"./src/server/routes/productQty.js\");\nconst login = __webpack_require__(/*! ./routes/login */ \"./src/server/routes/login.js\");\nconst createPayment = __webpack_require__(/*! ./routes/createPayment */ \"./src/server/routes/createPayment.js\");\nconst executePayment = __webpack_require__(/*! ./routes/executePayment */ \"./src/server/routes/executePayment.js\");\n\n// EXPRESS APP\nconst app = express();\n\n// HTTP headers security\napp.disable('x-powered-by');\n\n// MIDDLEWARE . . .\n// parse application/x-www-form-urlencoded\napp.use(bodyParser.urlencoded({ extended: false }));\n\n// parse application/json\napp.use(bodyParser.json());\n\n// http request logger\nswitch (app.get('env')) {\n  case 'production':\n    app.use(morgan('combined'));\n    break;\n  case 'development':\n    app.use(morgan('dev'));\n    break;\n  default:\n    console.log('No logging done by morgan.');\n}\n\napp.use(webpackDevMiddleware(compiler, {\n  publicPath: webpackConfig.output.publicPath,\n  reload: true,\n  timeout: 2000\n}));\n\n// SERVE STATIC FILES\napp.use(express.static('dist'));\n\n// USE ROUTES . . .\napp.use('/api', categories);\napp.use('/api', collections);\napp.use('/api', products);\napp.use('/api', images);\napp.use('/api', cloudinary);\napp.use('/api', productQty);\napp.use('/api', login);\napp.use('/api', createPayment);\napp.use('/api', executePayment);\n\napp.get('*', function(req, res) {\n  res.sendFile(path.resolve(__dirname, '../../dist/index.html'));\n});\n\n// 404 CATCH ALL\napp.use(function(_req, res, _next) {\n  res.sendStatus(404);\n});\n\n// ERROR HANDLING\napp.use(function(err, req, res, next) {\n  console.error(err.message);\n  // If no specified error code, set to 'Internal Server Error (500)'\n  if (!err.statusCode) {\n    err.statusCode = 500;\n  }\n  // Send error with status code and message\n  res.status(err.statusCode).send(err.message);\n});\n\n// START SERVER!!!\napp.listen(PORT, function() {\n  console.log('Served fresh daily on PORT: ', PORT);\n});\n\n\n//# sourceURL=webpack:///./src/server/server.js?");

/***/ }),

/***/ "./webpack.server.config.js":
/*!**********************************!*\
  !*** ./webpack.server.config.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const path = __webpack_require__(/*! path */ \"path\");\nconst webpack = __webpack_require__(/*! webpack */ \"webpack\");\nconst nodeExternals = __webpack_require__(/*! webpack-node-externals */ \"webpack-node-externals\");\n\nmodule.exports = {\n  mode: 'development',\n  entry: {\n    server: './src/server/server.js'\n  },\n  output: {\n    path: path.join(__dirname, 'dist'),\n    publicPath: '/',\n    filename: 'server-bundle.js'\n  },\n  target: 'node',\n  node: {\n    __dirname: false\n  },\n  externals: [nodeExternals()]\n}\n\n\n//# sourceURL=webpack:///./webpack.server.config.js?");

/***/ }),

/***/ "bcrypt":
/*!*************************!*\
  !*** external "bcrypt" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"bcrypt\");\n\n//# sourceURL=webpack:///external_%22bcrypt%22?");

/***/ }),

/***/ "body-parser":
/*!******************************!*\
  !*** external "body-parser" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"body-parser\");\n\n//# sourceURL=webpack:///external_%22body-parser%22?");

/***/ }),

/***/ "child_process":
/*!********************************!*\
  !*** external "child_process" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"child_process\");\n\n//# sourceURL=webpack:///external_%22child_process%22?");

/***/ }),

/***/ "cloudinary":
/*!*****************************!*\
  !*** external "cloudinary" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"cloudinary\");\n\n//# sourceURL=webpack:///external_%22cloudinary%22?");

/***/ }),

/***/ "cookie-session":
/*!*********************************!*\
  !*** external "cookie-session" ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"cookie-session\");\n\n//# sourceURL=webpack:///external_%22cookie-session%22?");

/***/ }),

/***/ "datauri":
/*!**************************!*\
  !*** external "datauri" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"datauri\");\n\n//# sourceURL=webpack:///external_%22datauri%22?");

/***/ }),

/***/ "dotenv":
/*!*************************!*\
  !*** external "dotenv" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"dotenv\");\n\n//# sourceURL=webpack:///external_%22dotenv%22?");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"express\");\n\n//# sourceURL=webpack:///external_%22express%22?");

/***/ }),

/***/ "humps":
/*!************************!*\
  !*** external "humps" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"humps\");\n\n//# sourceURL=webpack:///external_%22humps%22?");

/***/ }),

/***/ "jsonwebtoken":
/*!*******************************!*\
  !*** external "jsonwebtoken" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"jsonwebtoken\");\n\n//# sourceURL=webpack:///external_%22jsonwebtoken%22?");

/***/ }),

/***/ "knex":
/*!***********************!*\
  !*** external "knex" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"knex\");\n\n//# sourceURL=webpack:///external_%22knex%22?");

/***/ }),

/***/ "morgan":
/*!*************************!*\
  !*** external "morgan" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"morgan\");\n\n//# sourceURL=webpack:///external_%22morgan%22?");

/***/ }),

/***/ "multer":
/*!*************************!*\
  !*** external "multer" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"multer\");\n\n//# sourceURL=webpack:///external_%22multer%22?");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"path\");\n\n//# sourceURL=webpack:///external_%22path%22?");

/***/ }),

/***/ "request":
/*!**************************!*\
  !*** external "request" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"request\");\n\n//# sourceURL=webpack:///external_%22request%22?");

/***/ }),

/***/ "webpack":
/*!**************************!*\
  !*** external "webpack" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"webpack\");\n\n//# sourceURL=webpack:///external_%22webpack%22?");

/***/ }),

/***/ "webpack-dev-middleware":
/*!*****************************************!*\
  !*** external "webpack-dev-middleware" ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"webpack-dev-middleware\");\n\n//# sourceURL=webpack:///external_%22webpack-dev-middleware%22?");

/***/ }),

/***/ "webpack-node-externals":
/*!*****************************************!*\
  !*** external "webpack-node-externals" ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"webpack-node-externals\");\n\n//# sourceURL=webpack:///external_%22webpack-node-externals%22?");

/***/ })

/******/ });