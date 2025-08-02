import { Form as BootstrapForm }  from 'react-bootstrap';

type FormProps = {
  isEditing: boolean;
  children: React.ReactNode;
};

export default function Form({ isEditing, children }: FormProps) {
  return (
    <BootstrapForm
      className="flex-grow-1 pe-2"
      style={{
        pointerEvents: isEditing ? 'auto' : 'none',
        userSelect: isEditing ? 'auto' : 'none'
      }}
    >
      {children}
    </BootstrapForm>
  );
}
