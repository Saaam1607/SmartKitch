import { Form } from 'react-bootstrap';

type FormWrapperProps = {
  isEditing: boolean;
  children: React.ReactNode;
};

export default function FormWrapper({ isEditing, children }: FormWrapperProps) {
  return (
    <Form
      className="flex-grow-1 pe-2"
      style={{
        pointerEvents: isEditing ? 'auto' : 'none',
        userSelect: isEditing ? 'auto' : 'none'
      }}
    >
      {children}
    </Form>
  );
}
