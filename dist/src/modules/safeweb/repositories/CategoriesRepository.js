"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriesRepository = void 0;
const Category_1 = require("../entities/Category");
class CategoriesRepository {
    constructor() {
        this.categories = [];
    }
    create({ name, description }) {
        const category = new Category_1.Category();
        Object.assign(category, {
            name,
            description,
            created_at: new Date()
        });
        this.categories.push(category);
    }
    list() {
        return this.categories;
    }
    validateCategory(name) {
        const category = this.categories.find(category => category.name == name);
        return category;
    }
}
exports.CategoriesRepository = CategoriesRepository;
