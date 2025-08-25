"use client";

import React, { useState, useEffect } from "react";

import { useRouter } from 'next/navigation';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import AuthLogo from '../components/logo/AuthLogo'
import TextLogo from '../components/logo/TextLogo'
import AuthBackgroundWrapper from '../components/generic/backgrounds/AuthBackgroundWrapper'

import usersService from '../services/usersService'

import { useLoading } from '../loadingProvider/LoadingProvider';

import { User } from "@my-org/shared";

import '../styles/auth.css'

export default function LoginPage() {
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");

  const router = useRouter();

  const { setLoading } = useLoading();

  async function register() {
    setLoading(true);
    try {
      await usersService.register(email, password, name, surname);
      router.push('/login');
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    register();
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

              <br/>

              <Form.Group className="mb-3" controlId="formName">
                <Form.Control
                  type="text"
                  placeholder="Name"
                  className="auth-input p-2 px-3"
                  value={name}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formSurname">
                <Form.Control
                  type="text"
                  placeholder="Surname"
                  className="auth-input p-2 px-3"
                  value={surname}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSurname(e.target.value)}
                  required
                />
              </Form.Group>

            </div>

            <div className="d-flex justify-content-center py-4 pb-2">
              <Button
                type="submit"
                className="auth-button"
              >
                REGISTER
              </Button>
            </div>

          </Form>
        </Card.Body>
        <div className="auth-footer">
          <p>
            Already have an account?
          </p>
          <a href="/login" >
            Login
          </a>
        </div>
      </Card>
    </AuthBackgroundWrapper>
  );
}