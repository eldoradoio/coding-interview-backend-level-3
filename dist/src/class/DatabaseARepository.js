export class DatabaseARepository {
    items = []; // Simular base de datos
    async getItem(id) {
        return this.items.find(item => item.id === id) || null;
    }
    async getAllItems() {
        //console.log('---> todos los items:', this.items);
        return this.items;
    }
    async createItem(item) {
        this.items.push(item);
        return item;
    }
    async updateItem(id, name, price) {
        const itemIndex = this.items.findIndex(item => item.id === id);
        if (itemIndex === -1) {
            return null;
        }
        this.items[itemIndex] = { id, name, price };
        return this.items[itemIndex];
    }
    async deleteItem(id) {
        const itemIndex = this.items.findIndex(item => item.id === id);
        if (itemIndex === -1) {
            return false;
        }
        //const deletedItem = this.items.splice(itemIndex, 1)[0];
        //console.log('Elemento eliminado:', deletedItem);
        return true;
    }
}
