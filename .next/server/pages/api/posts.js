"use strict";
(() => {
var exports = {};
exports.id = 223;
exports.ids = [223,525];
exports.modules = {

/***/ 8296:
/***/ ((module) => {

module.exports = require("@formspree/react");

/***/ }),

/***/ 1185:
/***/ ((module) => {

module.exports = require("mongoose");

/***/ }),

/***/ 3280:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/app-router-context.js");

/***/ }),

/***/ 4964:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router-context.js");

/***/ }),

/***/ 1751:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/add-path-prefix.js");

/***/ }),

/***/ 3938:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/format-url.js");

/***/ }),

/***/ 1109:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/is-local-url.js");

/***/ }),

/***/ 8854:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/parse-path.js");

/***/ }),

/***/ 3297:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/remove-trailing-slash.js");

/***/ }),

/***/ 7782:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/resolve-href.js");

/***/ }),

/***/ 9232:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/utils.js");

/***/ }),

/***/ 6689:
/***/ ((module) => {

module.exports = require("react");

/***/ }),

/***/ 997:
/***/ ((module) => {

module.exports = require("react/jsx-runtime");

/***/ }),

/***/ 9648:
/***/ ((module) => {

module.exports = import("axios");;

/***/ }),

/***/ 5616:
/***/ ((module) => {

module.exports = import("next-connect");;

/***/ }),

/***/ 8201:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _models_Post__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6631);
/* harmony import */ var _pages_customers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9617);
/* harmony import */ var _utils_dbConnect__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4405);
/* harmony import */ var next_connect__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5616);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_pages_customers__WEBPACK_IMPORTED_MODULE_1__, next_connect__WEBPACK_IMPORTED_MODULE_3__]);
([_pages_customers__WEBPACK_IMPORTED_MODULE_1__, next_connect__WEBPACK_IMPORTED_MODULE_3__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);




(0,_utils_dbConnect__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z)();
const handler = (0,next_connect__WEBPACK_IMPORTED_MODULE_3__["default"])().get(async (req, res)=>{
    try {
        const posts = await _models_Post__WEBPACK_IMPORTED_MODULE_0__/* ["default"].find */ .Z.find({});
        res.send(posts);
    // res.send({message:"hellooo"})
    } catch (error) {
        return res.status(400).json({
            message: "Sorry something went wrong !"
        });
    }
}).post(async (req, res)=>{
    let currentDate = new Date();
    let day = currentDate.getDate();
    let month = currentDate.getMonth() + 1;
    let year = currentDate.getFullYear();
    const date = `${day}/${month}/${year}`;
    const { name , value  } = req.body;
    const price = (0,_pages_customers__WEBPACK_IMPORTED_MODULE_1__/* .getPrice */ .aS)(Number(value));
    const cost = (0,_pages_customers__WEBPACK_IMPORTED_MODULE_1__/* .getCost */ .we)(Number(value));
    const newpost = new _models_Post__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Z({
        name,
        value,
        price,
        cost,
        date: date
    });
    try {
        await newpost.save();
        res.send(newpost);
    } catch (error) {
        return res.status(400).json({
            message: "Sorry added something went wrong !"
        });
    }
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (handler);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [262,614], () => (__webpack_exec__(8201)));
module.exports = __webpack_exports__;

})();