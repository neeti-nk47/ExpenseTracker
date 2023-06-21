import { Button, useColorMode } from "@chakra-ui/react";

function ToggleTheme() {
  const { toggleColorMode } = useColorMode();

  return (
    <>
      <Button size="sm" onClick={toggleColorMode}>
        Toggle Mode
      </Button>
    </>
  );
}

export default ToggleTheme;
