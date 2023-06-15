import { Badge, Button, Flex, HStack, Heading, Spacer } from "@chakra-ui/react";
import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import AuthContext from "../store/auth-context";

export default function NavBar() {
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();

  const logoutHandler = (e) => {
    e.preventDefault();
    localStorage.removeItem("Email");
    localStorage.removeItem("Token");
    navigate("/");
  };

  return (
    <Flex
      as="nav"
      p="5px"
      borderBottom="1px solid grey"
      alignItems="center"
      gap="10px"
    >
      <Heading as="h1">Welcome to Expense Tracker !!!</Heading>
      <Spacer />
      <HStack spacing="20px">
        <Badge>
          Your profile is incomplete.
          <Badge colorScheme="red">
            <NavLink to="/welcome/CompleteProfile">Complete now</NavLink>
          </Badge>
        </Badge>

        {authCtx.isLoggedIn && (
          <Button colorScheme="red" onClick={logoutHandler}>
            Logout
          </Button>
        )}
      </HStack>
    </Flex>
  );
}