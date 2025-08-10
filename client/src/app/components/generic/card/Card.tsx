import { Card as BootstrapCard } from 'react-bootstrap';

type CardProps = {
  isEditing: boolean;
  onClick: () => void;
  children: React.ReactNode;
};

export default function Card({
  isEditing,
  onClick,
  children,
}: CardProps) {
  const backgroundColor = (!isEditing ? '' : 'rgba(255, 229, 217, 1)');

  const border = isEditing
    ? '2px solid #007bff'
    : '2px solid white';

  return (
    <BootstrapCard
      className={`m-0 border-0`}
      draggable="false"
      style={{
        borderRadius: '15px',
        boxShadow: 'rgba(0, 0, 0, 0.2) 0px 2px 6px',
        backgroundColor,
      }}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
    >
      <BootstrapCard.Body className="d-flex m-0 p-0">
        {children}
      </BootstrapCard.Body>
    </BootstrapCard>
  );
}
