import React, { ReactElement } from 'react';

export default function Footer(): ReactElement {
  return (
    <div style={{ display: 'flex', color: '#ababab', padding: '1em' }}>
      <span>
        Have a look at code! :)
      </span>

      <span style={{ flex: 1, textAlign: 'right' }}>
        <a style={{ color: '#ababab !important' }} href="https://github.com/damianw27/event-driven-architecture-example">Source Code</a>
      </span>
    </div>
  );
}
