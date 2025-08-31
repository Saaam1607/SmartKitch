export default interface CrudService<T> {
  fetchItems: () => Promise<T[]>;
  fetchItemImage?: (componentKey: string) => Promise<string>
  addItem: (item: T) => Promise<T>;
  editItem: (item: T) => Promise<T>;
  deleteItem: (componentKey: string) => Promise<void>;
}