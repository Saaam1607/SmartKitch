import BaseItem from '../BaseItem';

export default interface CardComponentProps<T extends BaseItem> {
  item: T;
  isSelected: boolean;
  setIsSelected: () => void;
  isEditing: boolean;
  editItem: (item: T) => void;
}