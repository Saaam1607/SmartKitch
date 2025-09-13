import { BaseItem } from '@models/BaseItem';

export default interface CardComponentProps<T extends BaseItem> {
  item: T;
  isHovered: boolean;
  isEditing: boolean;
  handleCheckChange: (event: React.ChangeEvent<HTMLInputElement>, fieldName: string) => void;
  handleTextChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, fieldName: string) => void;
  handleImageChange: (newImage: string, fieldName: string) => void;
  handlePriceChange: (event: React.ChangeEvent<HTMLInputElement>, fieldName: string) => void;
  handleArrayAddition?: (value: string, fieldName: string) => void;
  handleArrayRemoval?: (value: string, fieldName: string) => void;
  handleArraySet?: (newArray: string[], fieldName: string) => void;
}