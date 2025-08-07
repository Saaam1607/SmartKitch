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

  const LucideIcon = LucideIcons[iconName as keyof typeof LucideIcons] as React.ElementType | undefined;

  return (
    <Button
      variant={`${variant} rounded-circle`}
      className="icon-button d-flex align-items-center"
      title={title}
    >
      {LucideIcon ? <LucideIcon onClick={onClick} /> : null}
    </Button>
  );
}
