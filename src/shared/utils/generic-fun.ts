import * as bcrypt from "bcryptjs";
import * as fs from 'fs';
import * as path from 'path';
import handlebars from "handlebars";

export const applyMixins = (derivedCtor: any, constructors: any[]) => {
    constructors.forEach((baseCtor) => {
        Object.getOwnPropertyNames(baseCtor.prototype).forEach((name) => {
            Object.defineProperty(
                derivedCtor.prototype,
                name,
                Object.getOwnPropertyDescriptor(baseCtor.prototype, name) ||
                Object.create(null)
            );
        });
    })
};

export const groupBy = (arr: any[], key: string) => {
    return (arr || []).reduce((acc, x = {}) => ({
        ...acc,
        [x[key]]: [...acc[x[key]] || [], x]
    }), {});
};

export const makePasswordHash = (password: string) => {
    return bcrypt.hashSync(password, 8) as string;
}

export const checkIfUnencryptedPasswordIsValid = (rawPassword: string, hashPassword: string) => {
    return bcrypt.compareSync(rawPassword, hashPassword);
}

export const readTemplateContent = (templateName: string, params: any = {}) => {
    // Compile Handlebars template
    const templateFilePath = path.join(__dirname, `../../templates/${templateName}.template.hbs`);
    const templateContent = fs.readFileSync(templateFilePath, 'utf-8');
    const compiledTemplate = handlebars.compile(templateContent);

    // Render the template with data
    return compiledTemplate(params);
}

export const paginateArray = (array: any[], page: number, pageSize: number) => {
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    const paginatedItems = array.slice(startIndex, endIndex);

    return paginatedItems;
};