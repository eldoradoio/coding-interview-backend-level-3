export class ItemManager {
    items = [];
    currentId = 1;
    getAllItems() {
        return this.items;
    }
    getItemById(id) {
        return this.items.find(item => item.id === id);
    }
    createItem(name, price) {
        const newItem = { id: this.currentId++, name, price };
        this.items.push(newItem);
        return newItem;
    }
    updateItem(id, name, price) {
        const itemIndex = this.items.findIndex(item => item.id === id);
        if (itemIndex === -1) {
            return null;
        }
        this.items[itemIndex] = { id, name, price };
        return this.items[itemIndex];
    }
    deleteItem(id) {
        const itemIndex = this.items.findIndex(item => item.id === id);
        if (itemIndex === -1) {
            return false;
        }
        this.items.splice(itemIndex, 1);
        return true;
    }
}
