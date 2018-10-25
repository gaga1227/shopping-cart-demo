(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./src/$$_lazy_route_resource lazy recursive":
/*!**********************************************************!*\
  !*** ./src/$$_lazy_route_resource lazy namespace object ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error('Cannot find module "' + req + '".');
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/app.component.html":
/*!************************************!*\
  !*** ./src/app/app.component.html ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"app\">\n  <!-- heading for accessibility -->\n  <h1 class=\"visually-hidden\">Shopping Cart Demo</h1>\n\n  <!-- cart: shopping cart component -->\n  <app-cart\n      [products]=\"availableProducts\"\n      (removeFromCartClick)=\"onCartItemChange($event, false)\"></app-cart>\n\n  <!-- product display: container component for published product items -->\n  <app-product-display\n      [products]=\"availableProducts\"\n      [isProductsLoadComplete]=\"isRemoteProductsLoaded\"\n      [isProductsLoadError]=\"isRemoteProductsLoadError\"\n      (addToCartClick)=\"onCartItemChange($event, true)\"></app-product-display>\n\n  <!-- for accessibility announcement -->\n  <div class=\"visually-hidden\" aria-live=\"polite\" [innerHTML]=announcementContent></div>\n</div>\n"

/***/ }),

/***/ "./src/app/app.component.scss":
/*!************************************!*\
  !*** ./src/app/app.component.scss ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".app {\n  max-width: 1350px;\n  margin: 0 auto;\n  padding: 30px 15px;\n  overflow: hidden; }\n"

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_products_api_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./services/products-api.service */ "./src/app/services/products-api.service.ts");
/* harmony import */ var _mappers_product_mapper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./mappers/product.mapper */ "./src/app/mappers/product.mapper.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AppComponent = /** @class */ (function () {
    function AppComponent(productsApi) {
        this.productsApi = productsApi;
        // remote products loading states
        this.isRemoteProductsLoaded = false;
        this.isRemoteProductsLoadError = false;
        // products array from mapped from remote API data
        this.availableProducts = [];
        // for accessibility live announcements
        this.announcementContent = '';
    }
    AppComponent.prototype.ngOnInit = function () {
        this._loadRemoteProducts();
    };
    /**
     * onCartItemChange - event handler for cart item add/remove events
     *
     * @param {number} productIndex
     * @param {boolean} isAdding
     * @return {void}
     */
    AppComponent.prototype.onCartItemChange = function (productIndex, isAdding) {
        if (isNaN(productIndex) || !this.availableProducts[productIndex]) {
            console.warn('[SCD]', 'Invalid product index number', productIndex);
            return;
        }
        // assign timestamp to help determine added-to-cart status
        this.availableProducts[productIndex].addToCartTimestamp = isAdding ? (new Date()).getTime() : -1;
        // shallow copy to trigger setter on child component
        this.availableProducts = this.availableProducts.slice();
        // announce interaction for screen reader
        var productName = this.availableProducts[productIndex].name;
        this._makeAnnouncement("product item: " + productName + " is " + (isAdding ? 'added to' : 'removed from') + " shopping cart");
        console.log('[SCD]', 'Product change in cart: ', productIndex, isAdding ? 'Added' : 'Removed');
    };
    /**
     * _loadRemoteProducts - load remote products from API service
     *
     * @private
     * @return {void}
     */
    AppComponent.prototype._loadRemoteProducts = function () {
        var _this = this;
        this._makeAnnouncement('loading products in progress');
        this.productsApi.getProducts()
            .subscribe(function (data) {
            _this.isRemoteProductsLoadError = false;
            _this.availableProducts = _mappers_product_mapper__WEBPACK_IMPORTED_MODULE_2__["ProductMapper"].transform(data);
            var productsCount = _this.availableProducts.length;
            _this._makeAnnouncement(productsCount + " product" + (productsCount > 1 ? 's' : '') + " loaded and displayed");
            console.log('[SCD]', 'Products loaded:', _this.availableProducts);
        }, function (errorResponse) {
            _this.isRemoteProductsLoadError = true;
            _this._makeAnnouncement('error loading products');
            console.warn('[SCD]', 'Error getting remote products', errorResponse);
        }, function () {
            _this.isRemoteProductsLoaded = true;
            _this._makeAnnouncement('loading products complete');
            console.log('[SCD]', 'Products subscription complete');
        });
    };
    /**
     * _makeAnnouncement - method to update aria-live property value
     *
     * @param {string} text
     * @private
     * @return {void}
     */
    AppComponent.prototype._makeAnnouncement = function (text) {
        if (text === void 0) { text = ''; }
        this.announcementContent = text;
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", Object)
    ], AppComponent.prototype, "isRemoteProductsLoaded", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", Object)
    ], AppComponent.prototype, "isRemoteProductsLoadError", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", Array)
    ], AppComponent.prototype, "availableProducts", void 0);
    AppComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-shopping-cart-demo',
            template: __webpack_require__(/*! ./app.component.html */ "./src/app/app.component.html"),
            styles: [__webpack_require__(/*! ./app.component.scss */ "./src/app/app.component.scss")]
        }),
        __metadata("design:paramtypes", [_services_products_api_service__WEBPACK_IMPORTED_MODULE_1__["ProductsApiService"]])
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _components_cart_cart_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/cart/cart.component */ "./src/app/components/cart/cart.component.ts");
/* harmony import */ var _components_product_display_product_display_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/product-display/product-display.component */ "./src/app/components/product-display/product-display.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            declarations: [
                _app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"],
                _components_cart_cart_component__WEBPACK_IMPORTED_MODULE_4__["CartComponent"],
                _components_product_display_product_display_component__WEBPACK_IMPORTED_MODULE_5__["ProductDisplayComponent"]
            ],
            imports: [
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["BrowserModule"],
                _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClientModule"]
            ],
            providers: [],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/app/components/cart/cart.component.html":
/*!*****************************************************!*\
  !*** ./src/app/components/cart/cart.component.html ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"app__cart\">\n  <h2>Shopping cart</h2>\n\n  <!-- cart message -->\n  <div class=\"app__cart-msg\" *ngIf=!cartItems.length>Your cart is empty, shop now!</div>\n\n  <!-- shopping cart container -->\n  <ol class=\"app__cart-items list--unstyled\">\n\n    <!-- shopping cart items -->\n    <li class=\"app__cart-item\"\n        *ngFor=\"let cartItem of cartItems\"\n        [attr.data-product-index]=cartItem.prodIndex>\n\n      <h4 class=\"app__cart-item-title\"\n          [innerHTML]=cartItem.prodName></h4>\n\n      <button class=\"app__cart-item-remove btn btn--small\"\n              (click)=\"onRemoveFromCartClick(cartItem.prodIndex)\">\n        Remove\n        <span class=\"visually-hidden\">{{cartItem.prodName + ' from cart'}}</span>\n      </button>\n    </li>\n  </ol>\n</div>\n"

/***/ }),

/***/ "./src/app/components/cart/cart.component.scss":
/*!*****************************************************!*\
  !*** ./src/app/components/cart/cart.component.scss ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ":host {\n  display: block;\n  width: auto; }\n\n@media screen and (min-width: 970px) {\n  :host {\n    float: right;\n    width: 320px; } }\n\n.app__cart h2 {\n  color: #2D2379;\n  font-size: 34px;\n  font-weight: 300;\n  text-transform: capitalize;\n  text-align: center;\n  margin: 10px auto 0 auto; }\n\n.app__cart-msg {\n  color: #666;\n  padding: 15px;\n  font-size: 14px;\n  font-weight: 400;\n  text-align: center; }\n\n@media screen and (min-width: 680px) {\n  .app__cart-items {\n    margin: 0 15px; } }\n\n.app__cart-item {\n  align-items: center;\n  display: flex;\n  border-bottom: 1px solid #aaa;\n  padding: 15px 0; }\n\n.app__cart-item-title {\n  flex: 1 1 auto;\n  margin: 0 20px 0 0;\n  color: #0057c8;\n  font-size: 18px;\n  font-weight: 400;\n  line-height: 1.25; }\n\n.app__cart-item-remove {\n  flex: 0 0 auto; }\n"

/***/ }),

/***/ "./src/app/components/cart/cart.component.ts":
/*!***************************************************!*\
  !*** ./src/app/components/cart/cart.component.ts ***!
  \***************************************************/
/*! exports provided: CartComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CartComponent", function() { return CartComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _mappers_cart_item_mapper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../mappers/cart-item.mapper */ "./src/app/mappers/cart-item.mapper.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var CartComponent = /** @class */ (function () {
    function CartComponent() {
        this.removeFromCartClick = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this._products = []; // private var to hold the product list reference
        this.cartItems = [];
    }
    Object.defineProperty(CartComponent.prototype, "products", {
        /**
         * products - getter method for products
         *
         * @return {Array<Product>}
         */
        get: function () {
            return this._products;
        },
        /**
         * products - setter method for products
         *
         * @param {Array<Product>} products
         */
        set: function (products) {
            this._products = products;
            // update cart items each time when products list changes from parent
            this.cartItems = _mappers_cart_item_mapper__WEBPACK_IMPORTED_MODULE_1__["CartItemMapper"].transform(this._products);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * onRemoveFromCartClick - handler for remove from cart button click
     *
     * @param {number} prodIndex
     * @return {void}
     */
    CartComponent.prototype.onRemoveFromCartClick = function (prodIndex) {
        this.removeFromCartClick.emit(prodIndex);
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"])
    ], CartComponent.prototype, "removeFromCartClick", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Array),
        __metadata("design:paramtypes", [Array])
    ], CartComponent.prototype, "products", null);
    CartComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-cart',
            template: __webpack_require__(/*! ./cart.component.html */ "./src/app/components/cart/cart.component.html"),
            styles: [__webpack_require__(/*! ./cart.component.scss */ "./src/app/components/cart/cart.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], CartComponent);
    return CartComponent;
}());



/***/ }),

/***/ "./src/app/components/product-display/product-display.component.html":
/*!***************************************************************************!*\
  !*** ./src/app/components/product-display/product-display.component.html ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"app__product-display\">\n  <!-- section heading for accessibility -->\n  <h2 class=\"visually-hidden\">Products</h2>\n\n  <!-- loading messages -->\n  <div class=\"app__product-display-msg\" *ngIf=!isProductsLoadComplete>\n    <span *ngIf=!isProductsLoadError>Loading products...</span>\n    <span *ngIf=isProductsLoadError>Error loading products :(</span>\n  </div>\n\n  <!-- loading success: show product display -->\n  <ol class=\"app__product-display-list list--unstyled\"\n      *ngIf=\"isProductsLoadComplete\">\n\n    <!-- product display items -->\n    <li class=\"app__product-display-item\"\n        *ngFor=\"let product of products\"\n        [ngClass]=\"{'is-hidden': product.addToCartTimestamp > 0}\"\n        [attr.data-index]=product.index>\n\n      <h4 class=\"app__product-display-item-title\"\n          [innerHTML]=product.name></h4>\n\n      <img class=\"app__product-display-item-thumb\"\n           [src]=product.thumbUrl\n           [title]=product.name\n           alt=\"Image of {{product.name}}\"/>\n\n      <div class=\"app__product-display-item-price\">\n        <span class=\"visually-hidden\">{{'priced at ' + product.price}}</span>\n        <span aria-hidden=\"true\">{{product.displayPrice}}</span>\n      </div>\n\n      <button class=\"app__product-display-item-add btn btn--cta-primary\"\n              (click)=\"onAddToCart(product.index)\">\n        Add to cart\n        <span class=\"visually-hidden\">{{'for ' + product.name + ' priced at ' + product.price}}</span>\n      </button>\n    </li>\n  </ol>\n</div>\n"

/***/ }),

/***/ "./src/app/components/product-display/product-display.component.scss":
/*!***************************************************************************!*\
  !*** ./src/app/components/product-display/product-display.component.scss ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ":host {\n  display: block;\n  width: auto; }\n\n@media screen and (min-width: 970px) {\n  :host {\n    float: left;\n    width: calc(100% - 320px); } }\n\n.app__product-display-msg {\n  padding: 2em;\n  font-size: 18px;\n  font-weight: 500;\n  text-align: center; }\n\n.app__product-display-list {\n  margin-top: 20px;\n  overflow: hidden; }\n\n@media screen and (min-width: 970px) {\n  .app__product-display-list {\n    margin-top: 0; } }\n\n.app__product-display-item {\n  background: #fff;\n  box-sizing: border-box;\n  border-radius: 15px;\n  border-bottom: 3px solid rgba(0, 0, 0, 0.12);\n  margin: 15px 0;\n  padding: 20px;\n  overflow: hidden;\n  width: auto;\n  height: auto;\n  text-align: center; }\n\n@media screen and (min-width: 680px) {\n  .app__product-display-item {\n    width: calc(50% - 30px);\n    margin: 15px;\n    float: left; } }\n\n@media screen and (min-width: 1170px) {\n  .app__product-display-item {\n    width: calc(33.33% - 30px); } }\n\n.app__product-display-item-title {\n  color: #2D2379;\n  text-align: center;\n  font-size: 16px;\n  line-height: 1.25;\n  margin: 0 0 1em; }\n\n.app__product-display-item-thumb {\n  display: block;\n  width: auto;\n  height: 160px;\n  margin: 0 auto; }\n\n.app__product-display-item-price {\n  color: #f61665;\n  text-align: center;\n  font-size: 32px;\n  line-height: 1em;\n  margin: 15px 0; }\n"

/***/ }),

/***/ "./src/app/components/product-display/product-display.component.ts":
/*!*************************************************************************!*\
  !*** ./src/app/components/product-display/product-display.component.ts ***!
  \*************************************************************************/
/*! exports provided: ProductDisplayComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProductDisplayComponent", function() { return ProductDisplayComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var ProductDisplayComponent = /** @class */ (function () {
    function ProductDisplayComponent() {
        this.products = [];
        this.isProductsLoadComplete = false;
        this.isProductsLoadError = false;
        this.addToCartClick = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
    }
    /**
     * onAddToCart - handler for click event on product 'Add to cart' CTA
     *
     * @returns {void}
     */
    ProductDisplayComponent.prototype.onAddToCart = function (productIndex) {
        this.addToCartClick.emit(productIndex);
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Array)
    ], ProductDisplayComponent.prototype, "products", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], ProductDisplayComponent.prototype, "isProductsLoadComplete", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], ProductDisplayComponent.prototype, "isProductsLoadError", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"])
    ], ProductDisplayComponent.prototype, "addToCartClick", void 0);
    ProductDisplayComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-product-display',
            template: __webpack_require__(/*! ./product-display.component.html */ "./src/app/components/product-display/product-display.component.html"),
            styles: [__webpack_require__(/*! ./product-display.component.scss */ "./src/app/components/product-display/product-display.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], ProductDisplayComponent);
    return ProductDisplayComponent;
}());



/***/ }),

/***/ "./src/app/mappers/cart-item.mapper.ts":
/*!*********************************************!*\
  !*** ./src/app/mappers/cart-item.mapper.ts ***!
  \*********************************************/
/*! exports provided: CartItemMapper */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CartItemMapper", function() { return CartItemMapper; });
/* harmony import */ var _models_cart_item__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../models/cart-item */ "./src/app/models/cart-item.ts");

var CartItemMapper = /** @class */ (function () {
    function CartItemMapper() {
    }
    /**
     * transform - map list of Products to list of Cart items
     *
     * @returns {Array<CartItem>}
     */
    CartItemMapper.transform = function (products) {
        var addedToCartProducts = products
            .filter(function (_a) {
            var addToCartTimestamp = _a.addToCartTimestamp;
            return addToCartTimestamp > 0;
        })
            .sort(function (a, b) { return a.addToCartTimestamp - b.addToCartTimestamp; });
        var listLength = addedToCartProducts.length;
        var cartItems = [];
        for (var i = 0; i < listLength; i++) {
            var _a = addedToCartProducts[i], index = _a.index, name_1 = _a.name, price = _a.price;
            cartItems.push(new _models_cart_item__WEBPACK_IMPORTED_MODULE_0__["CartItem"](index, name_1, price));
        }
        return cartItems;
    };
    return CartItemMapper;
}());



/***/ }),

/***/ "./src/app/mappers/product.mapper.ts":
/*!*******************************************!*\
  !*** ./src/app/mappers/product.mapper.ts ***!
  \*******************************************/
/*! exports provided: ProductMapper */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProductMapper", function() { return ProductMapper; });
/* harmony import */ var _models_product__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../models/product */ "./src/app/models/product.ts");

var ProductMapper = /** @class */ (function () {
    function ProductMapper() {
    }
    /**
     * transform - map product response data object list to list of Product
     *
     * @returns {Array<Product>}
     */
    ProductMapper.transform = function (data) {
        // only published products are required
        var filteredData = data.filter(function (_a) {
            var isPublished = _a.isPublished;
            return isPublished === 'true';
        });
        var dataLength = filteredData.length;
        var products = [];
        for (var i = 0; i < dataLength; i++) {
            var _a = filteredData[i], productName = _a.productName, productImage = _a.productImage, price = _a.price;
            products.push(new _models_product__WEBPACK_IMPORTED_MODULE_0__["Product"](i, productName, parseFloat(price), productImage));
        }
        return products;
    };
    return ProductMapper;
}());



/***/ }),

/***/ "./src/app/models/cart-item.ts":
/*!*************************************!*\
  !*** ./src/app/models/cart-item.ts ***!
  \*************************************/
/*! exports provided: CartItem */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CartItem", function() { return CartItem; });
var CartItem = /** @class */ (function () {
    function CartItem(prodIndex, prodName, prodPrice) {
        this.prodIndex = prodIndex;
        this.prodName = prodName;
        this.prodPrice = prodPrice;
        this.quantity = 1;
    }
    return CartItem;
}());



/***/ }),

/***/ "./src/app/models/product.ts":
/*!***********************************!*\
  !*** ./src/app/models/product.ts ***!
  \***********************************/
/*! exports provided: Product */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Product", function() { return Product; });
var Product = /** @class */ (function () {
    function Product(index, name, price, thumbUrl) {
        this.addToCartTimestamp = -1; // timestamp of being added to cart, default not added
        this.index = index;
        this.name = name;
        this.price = price;
        this.thumbUrl = thumbUrl;
        this.displayPrice = (isNaN(this.price) || this.price === null) ? Product.INVALID_PRICE_DISPLAY : "$" + this.price;
    }
    Product.INVALID_PRICE_DISPLAY = 'Price unavailable';
    return Product;
}());



/***/ }),

/***/ "./src/app/services/products-api.service.ts":
/*!**************************************************!*\
  !*** ./src/app/services/products-api.service.ts ***!
  \**************************************************/
/*! exports provided: ProductsApiService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProductsApiService", function() { return ProductsApiService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ProductsApiService = /** @class */ (function () {
    function ProductsApiService(httpClient) {
        this.httpClient = httpClient;
        // endpoint constant
        this.GET_PRODUCTS_ENDPOINT = 'assets/products.json';
    }
    ProductsApiService.prototype.getProducts = function () {
        return this.httpClient.get(this.GET_PRODUCTS_ENDPOINT);
    };
    ProductsApiService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]])
    ], ProductsApiService);
    return ProductsApiService;
}());



/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
var environment = {
    production: false
};
/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm5/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(function (err) { return console.log(err); });


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/johnnyx/Dev/github/shopping-cart-demo/src/main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map