"use client";

import React, { useState } from "react";

import { useRouter } from 'next/navigation';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import AuthLogo from '../components/logo/AuthLogo'
import TextLogo from '../components/logo/TextLogo'
import AuthBackgroundWrapper from '../components/generic/backgrounds/AuthBackgroundWrapper'

import usersService from '../services/usersService'

import { useLoading } from '../loadingProvider/LoadingProvider';

import '../styles/auth.css'

export default function LoginPage() {
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const { setLoading } = useLoading();

  async function login() {
    setLoading(true);
    try {
      await usersService.login(email, password);
      router.push('/');
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    login();
  };
  
  return (
    <AuthBackgroundWrapper>
      <Card className="auth-card" >
        
        <AuthLogo />

        <Card.Body >
          <Form
            style={{ width: '100%' }}
            onSubmit={handleSubmit}
          >
            <div>
              
              <div className="d-flex justify-content-center my-3 mb-4">
                <TextLogo color='rgb(176, 180, 185)' size={25} />
              </div>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  className="auth-input p-2 px-3"
                  value={email}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Control
                  type="password"
                  placeholder="Password"
                  className="auth-input p-2 px-3"
                  value={password}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                  required
                />
              </Form.Group>

            </div>

            <div className="d-flex justify-content-center py-4 pb-2">
              <Button
                type="submit"
                className="auth-button"
              >
                LOGIN
              </Button>
            </div>

          </Form>
        </Card.Body>
        <div className="auth-footer">
          <p>
            Do not have an account?
          </p>
          <a href="/register" >
            Register
          </a>
        </div>
      </Card>
    </AuthBackgroundWrapper>
  );
}