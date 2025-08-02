import React, { useState } from 'react';

import { Form } from 'react-bootstrap';

export default function FormTitle({ title }) {

  return (
    <Form.Label
      className="m-0 mb-1 fw-bold"
      style={{fontSize: '1.2rem'}}
    >
      {title}
    </Form.Label>
  );
}