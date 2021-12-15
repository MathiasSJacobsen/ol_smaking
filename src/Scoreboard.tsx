import {
  VStack,
  IconButton,
  Heading,
  useColorMode,
  Button,
  HStack,
} from "@chakra-ui/react";
import { getAuth } from "firebase/auth";
import { FaSun, FaMoon } from "react-icons/fa";
import AddToScorboard from "./components/AddToScoreboard";
import ScoreboardList from "./components/ScoreboardList";

const Scoreboard = () => {
  const {colorMode, toggleColorMode} = useColorMode()
  return (
    <div>
      <VStack p={4}>
        <HStack
        >
          <Button onClick={() => getAuth().signOut()}>Sign out</Button>

        <IconButton
          aria-label={"Drakmode"}
          icon={colorMode === 'light' ? <FaSun /> : <FaMoon/>}
          alignSelf="flex-end"
          onClick={toggleColorMode}
          />
          </HStack>

        <Heading
          mb={8}
          fontWeight="extrabold"
          size="2xl"
          bgGradient="linear(to-r, pink.500, pink.300, blue.500)"
          bgClip="text"
        >
          Scoreboard
        </Heading>
        <ScoreboardList />
        <AddToScorboard/>
      </VStack>
    </div>
  );
};

export default Scoreboard;
