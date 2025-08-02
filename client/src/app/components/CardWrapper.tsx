import { Card } from 'react-bootstrap';

type CardWrapperProps = {
  isSelected: boolean;
  isEditing: boolean;
  onClick: () => void;
  children: React.ReactNode;
};

export default function CardWrapper({
  isSelected,
  isEditing,
  onClick,
  children,
}: CardWrapperProps) {
  const backgroundColor = isSelected
    ? (isEditing ? 'rgba(217, 217, 217, 1)' : 'rgba(236, 236, 236, 1)')
    : 'transparent';

  const border = isSelected && isEditing
    ? '2px solid #007bff'
    : '2px solid transparent';

  return (
    <Card
      className={`m-0`}
      draggable="false"
      style={{
        backgroundColor,
        border
      }}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
    >
      <Card.Body className="d-flex gap-2 m-0 p-0">
        {children}
      </Card.Body>
    </Card>
  );
}
