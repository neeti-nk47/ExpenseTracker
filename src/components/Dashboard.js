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
  UnorderedList,
} from "@chakra-ui/react";
import { useState } from "react";

export default function Dashboard() {
  const [items, setItems] = useState([]);

  const [inputAmount, setInputAmount] = useState("");
  const [inputDesc, setInputDesc] = useState("");
  const [inputCategory, setInputCategory] = useState("");

  function handleInputChange1(event) {
    setInputAmount(event.target.value);
  }
  function handleInputChange2(event) {
    setInputDesc(event.target.value);
  }
  function handleInputChange3(event) {
    setInputCategory(event.target.value);
  }

  const addExpenseHandler = (e) => {
    e.preventDefault();
    const newItem = {
      Amount: inputAmount,
      Description: inputDesc,
      Category: inputCategory,
    };

    setItems([...items, newItem]);
    setInputAmount("");
    setInputCategory("");
    setInputDesc("");
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
                />
              </GridItem>
              <GridItem colSpan="1" m="3">
                <FormLabel textAlign="center">Category</FormLabel>
              </GridItem>
              <GridItem colSpan="2" m="3" bg="white">
                <Select
                  placeholder="Select Category"
                  onChange={handleInputChange3}
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
        <UnorderedList>
          {items.map((item, index) => (
            <ListItem key={index}>
              {item.Amount}, {item.Description}, {item.Category}
            </ListItem>
          ))}
        </UnorderedList>
      </Center>
    </>
  );
}
