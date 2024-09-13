export class ItemManager {
    private items: { 
        id: number, 
        name: string, 
        price: number 
    }[] = [];
    private currentId: number = 1;

    
    getAllItems() {
        return this.items;
    }

    getItemById(id: number) {
        return this.items.find(item => item.id === id);
    }

    createItem(name: string, price: number) {
        const newItem = { id: this.currentId++, name, price };
        this.items.push(newItem);
        return newItem;
    }

    updateItem(id: number, name: string, price: number) {
        const itemIndex = this.items.findIndex(item => item.id === id);
        if (itemIndex === -1) {
            return null;
        }
        this.items[itemIndex] = { id, name, price };
        return this.items[itemIndex];
    }

    deleteItem(id: number) {
        const itemIndex = this.items.findIndex(item => item.id === id);
        if (itemIndex === -1) {
            return false;
        }
        this.items.splice(itemIndex, 1);
        return true;
    }
}
