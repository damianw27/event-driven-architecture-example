import React, { ReactElement, useState } from 'react';
import { Container, Paper } from '@mui/material';
import GreetForm from './greet-form';
import MessageForm from './message-form';
import Client from '../../types/client';
import Header from '../../components/header';
import Footer from '../../components/footer';

export default function ProducerPage(): ReactElement {
  const [client, setClient] = useState<Client | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function onGreetSubmit(name: string): Promise<void> {
    setIsLoading(true);
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    await fetch(`http://${window.location.hostname}:4000/rest/introduce-yourself`, {
      method: 'POST',
      credentials: 'same-origin',
      headers,
      body: JSON.stringify({ name }),
    })
      .then((response) => response.json())
      .then((response) => {
        setIsLoading(false);
        setClient(response);
      });
  }

  async function onMessageSubmit(message: string): Promise<void> {
    setIsLoading(true);
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    await fetch(`http://${window.location.hostname}:4000/rest/message`, {
      method: 'POST',
      credentials: 'same-origin',
      headers,
      body: JSON.stringify({ client, content: message }),
    })
      .then(() => setIsLoading(false));
  }

  return (
    <Container maxWidth="sm" style={{ paddingTop: '2em' }}>
      <Paper elevation={3}>
        <div style={{ padding: '1em' }}>
          <Header
            title="Producer"
            message="Here producers can introduce yourself with server and then send messages."
          />
          {
            client === undefined
              ? (
                <GreetForm
                  onSubmit={(name) => onGreetSubmit(name)}
                  loading={isLoading}
                />
              )
              : (
                <MessageForm
                  loading={isLoading}
                  onSubmit={(message) => onMessageSubmit(message)}
                />
              )
          }
        </div>
        <Footer />
      </Paper>
    </Container>
  );
}
