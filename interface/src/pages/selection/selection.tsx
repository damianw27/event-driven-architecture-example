import React, { ReactElement } from 'react';
import {
  Button, ButtonGroup, Container, Paper,
} from '@mui/material';
import Header from '../../components/header';
import Footer from '../../components/footer';

export default function Selection(): ReactElement {
  return (
    <Container maxWidth="sm" style={{ paddingTop: '2em' }}>
      <Paper elevation={3}>
        <div style={{ padding: '1em' }}>
          <Header
            title="Event-Driven Example App"
            message=""
          />

          <p>
            Application made for explanation purposes.
            User has to choose which role he wants to play: Producer or Listener.
          </p>

          <p>
            Producer can say hello by call event &apos;introduce yourself&apos;, and then can send
            messages.
          </p>

          <p>
            Listener can view incoming messages at a given moment. Page shows only that messages of
            &apos;producers&apos; which send greet event after entering the listener page.
          </p>

          <ButtonGroup orientation="vertical" fullWidth>
            <Button variant="contained" href="/producer" fullWidth>Producer</Button>
            <Button variant="contained" href="/view" fullWidth>Listener</Button>
          </ButtonGroup>
        </div>
        <Footer />
      </Paper>
    </Container>
  );
}
