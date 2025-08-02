import { Card as BootstrapCard } from 'react-bootstrap';

type CardProps = {
  isSelected: boolean;
  isEditing: boolean;
  onClick: () => void;
  children: React.ReactNode;
};

export default function Card({
  isSelected,
  isEditing,
  onClick,
  children,
}: CardProps) {
  const backgroundColor = isSelected
    ? (isEditing ? 'rgba(217, 217, 217, 1)' : 'rgba(236, 236, 236, 1)')
    : 'transparent';

  const border = isSelected && isEditing
    ? '2px solid #007bff'
    : '2px solid transparent';

  return (
    <BootstrapCard
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
      <BootstrapCard.Body className="d-flex gap-2 m-0 p-0">
        {children}
      </BootstrapCard.Body>
    </BootstrapCard>
  );
}
