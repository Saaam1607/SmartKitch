import BaseItem from '../BaseItem';

export default interface CardComponentProps<T extends BaseItem> {
  item: T;
  isEditing: boolean;
  edit: (newItem: T) => void;
  handleCheckChange: (event: React.ChangeEvent<HTMLInputElement>, fieldName: string) => void;
  handleTextChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, fieldName: string) => void;
  handleImageChange: (newImage: string, fieldName: string) => void;
  handlePriceChange: (event: React.ChangeEvent<HTMLInputElement>, fieldName: string) => void;
  handleArrayAddition?: (string: value, fieldName: string) => void;
  handleArrayRemoval?: (string: value, fieldName: string) => void;
}