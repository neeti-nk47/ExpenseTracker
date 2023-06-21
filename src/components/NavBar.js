import {
  Badge,
  Button,
  Flex,
  HStack,
  Heading,
  Spacer,
  useColorModeValue,
} from "@chakra-ui/react";
import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import AuthContext from "../store/auth-context";
import ToggleTheme from "./ToggleTheme";

export default function NavBar() {
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();

  let premium = localStorage.getItem("IsPremium");

  const bg = useColorModeValue("blue.100", "blue.800");

  const logoutHandler = (e) => {
    e.preventDefault();
    localStorage.removeItem("Email");
    localStorage.removeItem("Token");
    navigate("/");
  };

  return (
    <Flex
      as="nav"
      p="10px"
      bg={bg}
      borderBottom="1px solid grey"
      alignItems="center"
      gap="10px"
    >
      <Heading as="h1">Welcome to Expense Tracker !!!</Heading>
      <Spacer />
      <HStack spacing="20px">
        <Badge colorScheme="red">
          <NavLink to="/welcome/CompleteProfile">Complete Profile</NavLink>
        </Badge>

        {premium !== null && <ToggleTheme />}

        {authCtx.isLoggedIn && (
          <Button colorScheme="red" onClick={logoutHandler}>
            Logout
          </Button>
        )}
      </HStack>
    </Flex>
  );
}
