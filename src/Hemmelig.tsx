import {
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { QueryDocumentSnapshot, DocumentData } from "firebase/firestore";
import { useEffect, useState } from "react";
import { FaArrowDown } from "react-icons/fa";
import { fetchAllBeers, setCurrentBeer, vote } from "./backend/Firebase";
import { CRITERIAS } from "./enum/VotesEnum";

const Hemmelig = () => {
  const [beers, setBeers] =
    useState<Array<QueryDocumentSnapshot<DocumentData>>>();
  const [selected, setSelected] = useState({ name: "", id: "" });
  const toast = useToast();

  useEffect(() => {
    fetchAllBeers(setBeers);
  }, []);



  function sendToFirebase(object: { name: string; id: string }) {
    if (object.name === "") {
      toast({
        title: "No selected beer",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    setCurrentBeer(object.name, object.id);
    toast({
      title: `Selected beer is now: ${object}`,
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  }

  return (
    <VStack pt={8}>
      <Menu>
        {({ isOpen }) => (
          <>
            <MenuButton
              isActive={isOpen}
              as={Button}
              rightIcon={<FaArrowDown />}
            >
              {isOpen ? "Close" : "Open"}
            </MenuButton>
            <MenuList>
              {beers?.map((doc) => (
                <MenuItem
                  onClick={() => {
                    setSelected({ name: doc.data().name, id: doc.id });
                  }}
                >
                  {doc.data().name}
                </MenuItem>
              ))}
            </MenuList>
          </>
        )}
      </Menu>
      <Text>{selected.name}</Text>
      <Button
        colorScheme="pink"
        px="8"
        type="submit"
        onClick={(event) => {
          event.preventDefault();
          sendToFirebase(selected!!);
        }}
      >
        Set selected beer
      </Button>
      <Button
        onClick={(e) => {
          vote({
            beer: "Leffe",
            user: "Mathias",
            poeng: 3,
            type: CRITERIAS.SMAK,
          })
        }
      }
      >Tesing button</Button>

    </VStack>
  );
};

export default Hemmelig;
