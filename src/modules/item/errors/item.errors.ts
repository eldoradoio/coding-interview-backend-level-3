export class ItemNotFoundError extends Error {
    public readonly statusCode: number = 404;

    constructor() {
        super('Item not found');
    }
}

export class ItemCreationError extends Error {
    constructor() {
        super('Failed to create item');
    }
}

export class ItemUpdateError extends Error {
    constructor() {
        super('Failed to update item');
    }
}

export class ItemDeletionError extends Error {
    constructor() {
        super('Failed to delete item');
    }
}

export class ItemListError extends Error {
    constructor() {
        super('Failed to fetch items');
    }
}

export class ItemGetError extends Error {
    constructor() {
        super('Failed to fetch item');
    }
}