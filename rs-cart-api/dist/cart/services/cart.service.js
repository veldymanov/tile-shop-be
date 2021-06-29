"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartService = void 0;
const common_1 = require("@nestjs/common");
const uuid_1 = require("uuid");
let CartService = class CartService {
    constructor() {
        this.userCarts = {};
    }
    findByUserId(userId) {
        return this.userCarts[userId];
    }
    createByUserId(userId) {
        const id = uuid_1.v4(uuid_1.v4());
        const userCart = {
            id,
            items: [],
        };
        this.userCarts[userId] = userCart;
        return userCart;
    }
    findOrCreateByUserId(userId) {
        const userCart = this.findByUserId(userId);
        if (userCart) {
            return userCart;
        }
        return this.createByUserId(userId);
    }
    updateByUserId(userId, { items }) {
        const _a = this.findOrCreateByUserId(userId), { id } = _a, rest = __rest(_a, ["id"]);
        const updatedCart = Object.assign(Object.assign({ id }, rest), { items: [...items] });
        this.userCarts[userId] = Object.assign({}, updatedCart);
        return Object.assign({}, updatedCart);
    }
    removeByUserId(userId) {
        this.userCarts[userId] = null;
    }
};
CartService = __decorate([
    common_1.Injectable()
], CartService);
exports.CartService = CartService;
//# sourceMappingURL=cart.service.js.map