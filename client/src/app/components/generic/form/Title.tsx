import React from 'react';

import { Form } from 'react-bootstrap';

interface TitleProps {
  title: string;
}

export default function Title({ title }: TitleProps) {

  return (
    <Form.Label
      className="m-0 mb-1 fw-bold"
      style={{fontSize: '1.35rem'}}
    >
      {title}
    </Form.Label>
  );
}