"use client";

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

export default function LoginPage() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        fontFamily: "'Cursive', sans-serif",
        backgroundColor: '#f0f0f0',
        color: '#333',
        padding: '1rem',
      }}
    >

    <Card
      className="rounded shadow"
      style={{
        width: '30rem',
        maxWidth: '100%',
        backgroundColor: '#f3f7f6ff',
      }}
    >
      <Card.Body>
        <Card.Title
          className="d-flex justify-content-center m-0 p-0"
          style={{ fontSize: '1.5rem', fontWeight: 'bold' }}
        >
          Login
        </Card.Title>
        <Card.Body>
          <Form style={{ width: '100%', maxWidth: '400px' }}>
            
            <div
              className="p-2 py-4 my-4"
              style={{
                backgroundColor: '#d8e4e1ff',
                borderRadius: '15px'
              }}
            >
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label className="p-0 m-0">Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  className="rounded-pill px-3"
                  style= {{
                  }}
                />
                {/* <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text> */}
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label className="p-0 m-0">Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  className="rounded-pill px-3"
                />
              </Form.Group>
            </div>

            <Button
              variant="primary"
              type="submit"
              className="rounded-pill w-100"
            >
              Submit
            </Button>
          </Form>
        </Card.Body>
      </Card.Body>
    </Card>

      
    </div>
  );
}
