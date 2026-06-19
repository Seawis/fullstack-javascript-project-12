import { useRollbar } from '@rollbar/react';
import { Button, ButtonGroup } from 'react-bootstrap'

function TestRollbar() {
  const rollbar = useRollbar();

  return (
    <ButtonGroup>
      <Button
        variant="outline-secondary"
        onClick={() => rollbar.info('Test message from React')}
      >
        Send Test Message
      </Button>
      <Button
        variant="outline-secondary"
        onClick={() => {
          throw new Error('Test error from React ErrorBoundary');
        }}
      >
        Trigger Test Error
      </Button>
    </ButtonGroup>
  );
}

export default TestRollbar