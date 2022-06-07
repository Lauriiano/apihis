import { Category } from "../entities/Category";
import { ICategoriesRepository, ICreateCategoryDTO } from "./implementations/ICategoriesRepository";

class CategoriesRepository implements ICategoriesRepository {
    private categories: Category[];

    constructor() {
        this.categories = [];
    }

    create({ name, description }: ICreateCategoryDTO): void {
        const category = new Category();

        Object.assign(category, {
            name,
            description,
            created_at: new Date()
        });

        this.categories.push(category);
    }

    list(): Category[] {
        return this.categories;
    }

    validateCategory(name: string): Category {
        const category = this.categories.find(category => category.name == name);

        return category;
    }

}

export { CategoriesRepository };

