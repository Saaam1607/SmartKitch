import { Button } from 'react-bootstrap';
import * as LucideIcons from "lucide-react";

import '../../../styles/iconButton.css';

type IconButtonProps = {
  variant: string;
  iconName: string;
  color?: string;
  borderColor?: string
  title?: string;
  onClick: () => void;
};

export default function IconButton({
  variant,
  iconName,
  color,
  borderColor,
  title,
  onClick,
}: IconButtonProps) {

  const LucideIcon = LucideIcons[iconName as keyof typeof LucideIcons] as React.ElementType | undefined;

  return (
    <Button
      variant={`${variant}`}
      className={`icon-button d-flex align-items-center`}
      style={{
        borderRadius: '10px',
        // ...(color && { color: color }),
        ...(borderColor && { border: "1px solid " + borderColor })
      }}
      title={title}
    >
      {LucideIcon ? <LucideIcon onClick={onClick} /> : null}
    </Button>
  );
}
