import {
  Button,
  Center,
  FormLabel,
  Grid,
  GridItem,
  Input,
} from "@chakra-ui/react";
import { useRef } from "react";

export default function CompleteProfile() {
  const nameInputRef = useRef();
  const photoInputRef = useRef();

  const buttonHandler = (e) => {
    e.preventDefault();

    const token = localStorage.getItem("Token");
    const enteredName = nameInputRef.current.value;
    const enteredPhoto = photoInputRef.current.value;

    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCW-VrFmh7dYoU7ptSpirixoA6CkYZq1Ss",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: token,
          displayName: enteredName,
          photoUrl: enteredPhoto,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
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
        console.log("Success", data);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <Center p="5" m="3">
      <Grid templateColumns="repeat(6, 1fr)" borderBottom="1px solid grey">
        <GridItem colSpan="3" m="3">
          <FormLabel>Full Name</FormLabel>
          <Input type="text" ref={nameInputRef} />
        </GridItem>
        <GridItem colSpan="3" m="3">
          <FormLabel>Profile Photo URL</FormLabel>
          <Input type="text" ref={photoInputRef} />
        </GridItem>

        <Button m="3" colorScheme="orange" onClick={buttonHandler}>
          Update
        </Button>
      </Grid>
    </Center>
  );
}
