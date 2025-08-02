import { Button } from 'react-bootstrap';
import * as LucideIcons from "lucide-react";

import '../../../styles/iconButton.css';

type IconButtonProps = {
  variant: string;
  iconName: string
  title?: string;
  onClick: () => void;
};

export default function IconButton({
  variant,
  iconName,
  title,
  onClick,
}: IconButtonProps) {

  const LucideIcon = LucideIcons[iconName];

  return (
    <Button
      variant={`${variant} rounded-circle`}
      className="icon-button d-flex align-items-center"
      title={title}
    >
      <LucideIcon onClick={onClick} />
    </Button>
  );
}
