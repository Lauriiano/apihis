"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCategoryService = void 0;
class CreateCategoryService {
    constructor(categoriesRepository) {
        this.categoriesRepository = categoriesRepository;
    }
    execute({ name, description }) {
        const categoriesAlreadyExists = this.categoriesRepository.validateCategory(name);
        if (categoriesAlreadyExists) {
            throw new Error("Categoria ja cadastrada");
        }
        this.categoriesRepository.create({ name, description });
    }
}
exports.CreateCategoryService = CreateCategoryService;
