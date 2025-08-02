import React, { useState } from 'react';

import { Form, Button, Modal, Image as BootstrapImage } from 'react-bootstrap';

type CreationModalProps = {
  title: string;
  show: boolean;
  close: () => void;
  createItem: () => void;
  children: React.ReactNode;
};

export default function CreationModal({ title, show, close, createItem, children }: CreationModalProps) {

  return (
    <Modal show={show} onHide={close}>
      <Modal.Header className="p-2">
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="p-2">
        <Form>
          {children}
        </Form>
      </Modal.Body>
      <Modal.Footer className="p-2">
        <Button variant="secondary" onClick={close}>
          Undo
        </Button>
        <Button variant="primary" onClick={createItem}>
          Create
        </Button>
      </Modal.Footer>
    </Modal>
  );
}