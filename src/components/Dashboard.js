import {
  Center,
  Card,
  CardHeader,
  CardBody,
  FormLabel,
  Input,
  Grid,
  GridItem,
  Heading,
  Select,
  Button,
  ListItem,
  List,
  Flex,
  Spacer,
} from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";

export default function Dashboard() {
  const [items, setItems] = useState([]);

  const [inputAmount, setInputAmount] = useState("");
  const [inputDesc, setInputDesc] = useState("");
  const [inputCategory, setInputCategory] = useState("");

  let userEmail = localStorage
    .getItem("Email")
    .replace("@", "")
    .replace(".", "");

  function handleInputChange1(event) {
    setInputAmount(event.target.value);
  }
  function handleInputChange2(event) {
    setInputDesc(event.target.value);
  }
  function handleInputChange3(event) {
    setInputCategory(event.target.value);
  }

  //GET DATA FROM DATABASE-------------------------------------------------------------------------
  const fetchHandler = useCallback(async (mailid) => {
    const response = await fetch(
      `https://login-signup-6427f-default-rtdb.firebaseio.com/Expenses/${mailid}.json`
    );
    const data = await response.json();

    const loadedItems = [];
    for (const key in data) {
      loadedItems.push({
        ID: key,
        Amount: data[key].Amount,
        Description: data[key].Description,
        Category: data[key].Category,
      });
    }
    //console.log(loadedItems);
    setItems(loadedItems);
  }, []);

  useEffect(() => {
    fetchHandler(userEmail);
  }, [fetchHandler, userEmail]);

  //ADD EXPENSE TO LIST AND DB----------------------------------------------------------------------
  const addExpenseHandler = (e) => {
    e.preventDefault();
    const newItem = {
      Amount: inputAmount,
      Description: inputDesc,
      Category: inputCategory,
    };
    fetch(
      `https://login-signup-6427f-default-rtdb.firebaseio.com/Expenses/${userEmail}.json`,
      {
        method: "POST",
        body: JSON.stringify(newItem),
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
        console.log(data);
        // setItems([...items, newItem]);
        setInputAmount("");
        setInputDesc("");
        setInputCategory("");
        fetchHandler(userEmail);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  //DELETE ACTION----------------------------------------------------------------------------
  const deleteHandler = (obj) => {
    fetch(
      `https://login-signup-6427f-default-rtdb.firebaseio.com/Expenses/${userEmail}/${obj.ID}.json`,
      {
        method: "DELETE",
      }
    )
      .then((res) => {
        console.log(res.statusText);
        fetchHandler(userEmail);
      })
      .catch((err) => console.log(err));
  };

  //EDIT ACTION------------------------------------------------------------------------------
  const editHandler = (obj) => {
    setInputAmount(obj.Amount);
    setInputCategory(obj.Category);
    setInputDesc(obj.Description);
    deleteHandler(obj);
  };

  return (
    <>
      <Center m="10">
        <Card bg="blue.50" border="0.4px solid lightblue">
          <CardHeader>
            <Heading size="lg" textAlign="center">
              Enter Your Expenses
            </Heading>
          </CardHeader>
          <CardBody>
            <Grid templateColumns="repeat(3, 1fr)">
              <GridItem colSpan="1" m="3">
                <FormLabel textAlign="center">Amount</FormLabel>
              </GridItem>
              <GridItem colSpan="2" m="3">
                <Input
                  type="number"
                  placeholder="Enter Amount"
                  bg="white"
                  onChange={handleInputChange1}
                  value={inputAmount}
                />
              </GridItem>
              <GridItem colSpan="1" m="3">
                <FormLabel textAlign="center">Description</FormLabel>
              </GridItem>
              <GridItem colSpan="2" m="3">
                <Input
                  type="text"
                  placeholder="Enter Description"
                  bg="white"
                  onChange={handleInputChange2}
                  value={inputDesc}
                />
              </GridItem>
              <GridItem colSpan="1" m="3">
                <FormLabel textAlign="center">Category</FormLabel>
              </GridItem>
              <GridItem colSpan="2" m="3" bg="white">
                <Select
                  placeholder="Select Category"
                  onChange={handleInputChange3}
                  value={inputCategory}
                >
                  <option value="Fuel">Fuel</option>
                  <option value="Food">Food</option>
                  <option value="Clothes">Clothes</option>
                  <option value="Other">Other</option>
                </Select>
              </GridItem>
            </Grid>
          </CardBody>
          <Center mb="10">
            <Button colorScheme="green" onClick={addExpenseHandler}>
              ADD EXPENSE
            </Button>
          </Center>
        </Card>
      </Center>
      <Center>
        <List>
          {items.map((ele) => (
            <ListItem m="2" key={ele.ID}>
              <Flex alignItems="center" gap="10px">
                {ele.Amount}, {ele.Category}, {ele.Description}
                <Spacer />
                <Button size="sm" onClick={() => editHandler(ele)}>
                  EDIT
                </Button>
                <Button size="sm" onClick={() => deleteHandler(ele)}>
                  DELETE
                </Button>
              </Flex>
            </ListItem>
          ))}
        </List>
      </Center>
    </>
  );
}
