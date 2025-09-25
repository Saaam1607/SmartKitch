export default interface CrudService<T> {
  fetchItems: () => Promise<T[]>;
  addItem: (item: T) => Promise<T>;
  editItem: (item: T) => Promise<T>;
  editItemImage?: (componentKey: string, image: string) => Promise<T>;
  deleteItem: (componentKey: string) => Promise<void>;
}