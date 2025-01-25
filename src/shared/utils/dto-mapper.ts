export function filterResultByDto<T>(result: object, dtoInstance: any): T {
    if (Array.isArray(result)) {
        throw new Error("Result should not be an array");
    }

    const dtoKeys = Object.keys(dtoInstance) as (keyof T)[];

    const filterItem = (item: any): T => {
        const filteredItem = {} as T;
        dtoKeys.forEach(key => {
            if (key in item) {
                // Check if the value is an object and if the corresponding dtoInstance key is also an object
                if (typeof item[key] === 'object' && !Array.isArray(item[key]) && typeof dtoInstance[key] === 'object') {
                    filteredItem[key] = filterResultByDto(item[key], dtoInstance[key]); // Recursive call for nested objects
                } else {
                    filteredItem[key] = item[key];
                }
            }
        });
        return filteredItem;
    };

    return filterItem(result);
}

export function filterResultsByDto<T>(result: any[], dtoInstance: any): T[] {
    const dtoKeys = Object.keys(dtoInstance) as (keyof T)[];

    const filterItem = (item: any): T => {
        const filteredItem = {} as T;
        dtoKeys.forEach(key => {
            if (key in item) {
                // Check if the value is an object and if the corresponding dtoInstance key is also an object
                if (typeof item[key] === 'object' && !Array.isArray(item[key]) && typeof dtoInstance[key] === 'object') {
                    filteredItem[key] = filterResultByDto(item[key], dtoInstance[key]); // Recursive call for nested objects
                } else {
                    filteredItem[key] = item[key];
                }
            }
        });
        return filteredItem;
    };

    return result.map(filterItem);
}
