import React, {
  ReactElement,
  useEffect,
  useReducer,
  useState,
} from 'react';
import { Container, Paper } from '@mui/material';
import Client from '../../types/client';
import Header from '../../components/header';
import Footer from '../../components/footer';

interface ListenerState {
  clients: Client[];
  messages: Record<string, string[]>;
}

const initialState: ListenerState = {
  clients: [],
  messages: {},
};

type Action =
  | { type: 'add-client', client: Client }
  | { type: 'add-message', data: { client: Client, content: string } };

function reducer(state: ListenerState, action: Action): ListenerState {
  switch (action.type) {
    case 'add-client': {
      const targetClient = state.clients.find((client) => client.uuid === action.client.uuid);

      if (targetClient !== undefined) {
        return state;
      }

      return {
        ...state,
        clients: [...state.clients, action.client],
      };
    }
    case 'add-message': {
      const { uuid } = action.data.client;

      const targetClient = state.clients.find((client) => client.uuid === uuid);

      if (targetClient === undefined) {
        return state;
      }

      return {
        ...state,
        messages: {
          ...state.messages,
          [uuid]: [action.data.content],
        },
      };
    }
    default:
      throw new Error();
  }
}

export default function ListenerPage(): ReactElement {
  const [state, dipatch] = useReducer(reducer, initialState);
  const [wsConnection, setWsConnection] = useState<WebSocket | undefined>();

  useEffect(() => {
    setWsConnection(new WebSocket(`ws://${window.location.hostname}:4001`));
  }, []);

  useEffect(() => {
    if (wsConnection === undefined) {
      return;
    }

    wsConnection.onmessage = (ev) => {
      const { source, data } = JSON.parse(ev.data);

      if (source === 'introduce-yourself-event') {
        dipatch({ type: 'add-client', client: data });
      }

      if (source === 'message-event') {
        dipatch({ type: 'add-message', data });
      }
    };
  }, [wsConnection]);

  function drawMessages() {
    if (state.clients.length === 0) {
      return (
        <Paper
          variant="outlined"
          style={{ padding: '20px 20px', margin: '3px 0' }}
        >
          No massages yet!
        </Paper>
      );
    }

    return state.clients.map((client) => {
      const messages = state.messages[client.uuid];

      if (messages === undefined || messages.length === 0) {
        return (
          <Paper
            variant="outlined"
            key={client.uuid}
            style={{ padding: '10px 20px', margin: '3px 0' }}
          >
            {'User '}
            <span style={{ color: 'green' }}>{client.name}</span>
            {' just entered the room!'}
          </Paper>
        );
      }

      const lastMessage = messages[messages.length - 1];

      return (
        <Paper
          variant="outlined"
          key={client.uuid}
          style={{ padding: '10px 20px', margin: '3px 0' }}
        >
          <span style={{ color: 'green' }}>{`[${client.name}]:`}</span>
          {` ${lastMessage}`}
        </Paper>
      );
    });
  }

  return (
    <Container maxWidth="sm" style={{ paddingTop: '2em' }}>
      <Paper elevation={3}>
        <div style={{ padding: '1em' }}>
          <Header
            title="Listener"
            message="This page displays messages from producers."
          />
          {drawMessages()}
        </div>
        <Footer />
      </Paper>
    </Container>
  );
}
