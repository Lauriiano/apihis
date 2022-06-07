import { ICategoriesRepository } from "../repositories/implementations/ICategoriesRepository";

interface IRequest {
    name: string;
    description: string;
}

class CreateCategoryService {

    constructor(private categoriesRepository: ICategoriesRepository) { }

    execute({ name, description }: IRequest): void { //responsavel por fazer tudo que o create precisa fazer
        const categoriesAlreadyExists = this.categoriesRepository.validateCategory(name);

        if (categoriesAlreadyExists) {
            throw new Error("Categoria ja cadastrada");
        }

        this.categoriesRepository.create({ name, description });
    }

}

export { CreateCategoryService };

