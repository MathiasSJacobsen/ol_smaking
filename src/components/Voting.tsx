import { useEffect, useState } from "react";
import { fetchAllBeers, fetchCurrentBeer, vote } from "../backend/Firebase";
import {
  Button,
  Center,
  Heading,
  HStack,
  Input,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { QueryDocumentSnapshot, DocumentData } from "firebase/firestore";
import { CRITERIAS } from "../enum/VotesEnum";

const Voting = () => {
  const [beers, setBeers] = useState<
    Array<QueryDocumentSnapshot<DocumentData>>
  >([]);
  const [currentBeer, setCurrentBeer] = useState<DocumentData>();

  const [poengSmak, setPoengSmak] = useState<number>();
  const [poengFarge, setPoengFarge] = useState<number>();
  const [poengEtikett, setPoengEtikett] = useState<number>();

  const toast = useToast();

  useEffect(() => {
    fetchAllBeers(setBeers);
    fetchCurrentBeer(setCurrentBeer);
  }, []);

  function checkErrors() {
    let returnvalue = true;
    if (!poengFarge) {
      toast({
        title: "Du har glemt poeng for farge.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      returnvalue = false;
    }
    if (!poengEtikett) {
      toast({
        title: "Du har glemt poeng for etikett.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      returnvalue = false;
    }
    if (!poengSmak) {
      toast({
        title: "Du har glemt poeng for smak.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      returnvalue = false;
    }
    return returnvalue;
  }

  return (
    <VStack>
      <Heading p="8px" as="h1" size="2xl">
        Vote
      </Heading>
      <Heading pb="16px" size="sm">
        Ølen du skal bedømme: {currentBeer && currentBeer.data().name}
      </Heading>
      <HStack>
        <VStack p="4px">
          <Text>Farge:</Text>
          <Input
            type="number"
            placeholder="Farge"
            size="md"
            value={poengFarge}
            onChange={(event) => {
              setPoengFarge(parseInt(event.target.value));
            }}
          />
        </VStack>

        <VStack p="4px">
          <Text>Etikett:</Text>
          <Input
            type="number"
            placeholder="Etikett"
            size="md"
            value={poengEtikett}
            onChange={(event) => {
              setPoengEtikett(parseInt(event.target.value));
            }}
          />
        </VStack>

        <VStack p="4px">
          <Text>Smak:</Text>
          <Input
            type="number"
            placeholder="Smak"
            size="md"
            value={poengSmak}
            onChange={(event) => {
              setPoengSmak(parseInt(event.target.value));
            }}
          />
        </VStack>
      </HStack>
      <Center pt="16px">
        <Button
          colorScheme="pink"
          px="8"
          type="submit"
          onClick={(event) => {
            event.preventDefault();
            console.log(poengSmak);
            console.log(poengEtikett);
            console.log(poengFarge);
            if (checkErrors()) {
              vote({
                user: "Mathias",
                poeng: poengFarge!!,
                beer: currentBeer!!.data().name,
                type: CRITERIAS.FARGE,
              });
              vote({
                user: "Mathias",
                poeng: poengEtikett!!,
                beer: currentBeer!!.data().name,
                type: CRITERIAS.ETTIKKET,
              });
              vote({
                user: "Mathias",
                poeng: poengSmak!!,
                beer: currentBeer!!.data().name,
                type: CRITERIAS.SMAK,
              });
            }
          }}
        >
          VOTE
        </Button>
      </Center>
    </VStack>
  );
};

export default Voting;
