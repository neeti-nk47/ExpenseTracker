import { useState, useRef, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import AuthContext from "../store/auth-context";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Center,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Spinner,
} from "@chakra-ui/react";

const SignupLogin = () => {
  const history = useNavigate();

  const [confirmPassword, setConfirmPassword] = useState("");

  function handleConfirmPasswordChange(event) {
    setConfirmPassword(event.target.value);
  }

  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const authCtx = useContext(AuthContext);

  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    setIsLoading(true);

    let url;
    if (isLogin) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCW-VrFmh7dYoU7ptSpirixoA6CkYZq1Ss";
    } else {
      if (enteredPassword === confirmPassword) {
        url =
          "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCW-VrFmh7dYoU7ptSpirixoA6CkYZq1Ss";
      } else {
        alert("Password not same");
      }
    }
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        setIsLoading(false);
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = data.error.message;

            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        console.log("Success");
        authCtx.login(data.idToken, enteredEmail);
        history("/welcome");
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <Center mt="24">
      <Card align="center" border="0.2px solid lightblue " p="4">
        <Heading>{isLogin ? "Login" : "Sign Up"}</Heading>
        <CardBody as="form" onSubmit={submitHandler}>
          <FormControl isRequired>
            <FormLabel htmlFor="email">Your Email</FormLabel>
            <Input type="email" id="email" ref={emailInputRef} />
          </FormControl>
          <FormControl isRequired>
            <FormLabel htmlFor="password">Your Password</FormLabel>
            <Input type="password" id="password" ref={passwordInputRef} />
          </FormControl>
          {!isLogin && (
            <FormControl isRequired>
              <FormLabel htmlFor="">Confirm Password</FormLabel>
              <Input
                type="password"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
              />
            </FormControl>
          )}

          <Center m="4">
            {!isLoading && (
              <Button colorScheme="blue" type="submit">
                {isLogin ? "Login" : "Create Account"}
              </Button>
            )}
          </Center>
          <Center mt="4">
            {isLogin && <NavLink>Forget Password </NavLink>}
            {isLoading && <Spinner />}
          </Center>
        </CardBody>
        <CardFooter>
          <Center>
            <Button
              size="sm"
              colorScheme="teal"
              variant="outline"
              onClick={switchAuthModeHandler}
            >
              {isLogin ? "Create new account" : "Login with existing account"}
            </Button>
          </Center>
        </CardFooter>
      </Card>
    </Center>
  );
};

export default SignupLogin;
