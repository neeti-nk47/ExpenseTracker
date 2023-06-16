import {
  Button,
  Card,
  CardBody,
  Center,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Spinner,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const history = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const emailInputRef = useRef();

  const sendLink = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const enteredEmail = emailInputRef.current.value;

    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyCW-VrFmh7dYoU7ptSpirixoA6CkYZq1Ss",
      {
        method: "POST",
        body: JSON.stringify({
          requestType: "PASSWORD_RESET",
          email: enteredEmail,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
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
        //console.log(data);
        history("/");
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <Center mt="24">
      <Card align="center" border="0.2px solid lightblue " p="4">
        <Heading>Forget password</Heading>
        <CardBody>
          <FormControl isRequired>
            <FormLabel htmlFor="email">Enter your Email</FormLabel>
            <Input type="email" id="email" ref={emailInputRef} />
            {!isLoading && (
              <Center m="4">
                <Button colorScheme="red" onClick={sendLink}>
                  Send Link
                </Button>
              </Center>
            )}
            <Center mt="4">{isLoading && <Spinner />}</Center>
          </FormControl>
        </CardBody>
      </Card>
    </Center>
  );
}
