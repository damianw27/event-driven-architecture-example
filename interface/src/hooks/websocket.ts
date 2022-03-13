import { useEffect, useState } from 'react';

export default function useWebSocket() {
  const [connection, setConnection] = useState<WebSocket>();

  useEffect(() => {
    const wsConnection = new WebSocket('ws://localhost:4001');
    setConnection(wsConnection);
  }, []);

  return connection;
}
