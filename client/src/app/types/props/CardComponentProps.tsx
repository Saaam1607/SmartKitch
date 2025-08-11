import BaseItem from '../BaseItem';

export default interface CardComponentProps<T extends BaseItem> {
  item: T;
  isEditing: boolean;
  edit: (newItem: T) => void;
}