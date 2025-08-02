import React, { useState } from 'react';

import { Form, Button, Modal as BootstrapModal } from 'react-bootstrap';

type ModalProps = {
  title: string;
  show: boolean;
  close: () => void;
  saveItem: () => void;
  children: React.ReactNode;
};

export default function Modal({ title, show, close, saveItem, children }: ModalProps) {

  return (
    <BootstrapModal show={show} onHide={close}>
      <BootstrapModal.Header className="p-2">
        <BootstrapModal.Title>{title}</BootstrapModal.Title>
      </BootstrapModal.Header>
      <BootstrapModal.Body className="p-2">
        <Form>
          {children}
        </Form>
      </BootstrapModal.Body>
      <BootstrapModal.Footer className="p-2">
        <Button variant="secondary" onClick={close}>
          Undo
        </Button>
        <Button variant="primary" onClick={saveItem}>
          Save
        </Button>
      </BootstrapModal.Footer>
    </BootstrapModal>
  );
}