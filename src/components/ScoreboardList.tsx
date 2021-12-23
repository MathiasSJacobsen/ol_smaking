import {
  Table,
  TableCaption,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";

const ScoreboardList = () => {
  const beers = [
    {
      id: 1,
      name: "Leffe",
      raters: [
        ["Ask", 3],
        ["Mathias", 7],
        ["Torjus", null],

      ],
    },
    {
      id: 2,
      name: "Hansa",
      raters: [
        ["Ask", 5],
        ["Mathias", 10],
        ["Torjus", 1],
      ],
    },
  ];




  return (
    <Table
      variant="simple"
      w="100%"
      maxW={{ base: "90vw", sm: "80vw", lg: "50vw", xl: "40vw" }}
      borderColor="gray.100"
      borderRadius="lg"
      p={4}
    >
      <TableCaption>Ølsmaking julen 2021</TableCaption>
      <Thead>
        <Tr>
          <Th>Beer</Th>
          <Th isNumeric>Ask</Th>
          <Th isNumeric>Mathias</Th>
          <Th isNumeric>Torjus</Th>
        </Tr>
      </Thead>
      <Tbody>
        {beers.map((beer) => (
          <Tr>
            <Td>{beer.name}</Td>
            {beer.raters.map((raters) => (
              <Td key={beer.id} isNumeric>{raters[1] ? raters[1] : "-"}</Td>
            ))}
          </Tr>
        ))}
      </Tbody>
      <Tfoot>
        <Tr>
          <Th>Beer</Th>
          <Th isNumeric>Ask</Th>
          <Th isNumeric>Mathias</Th>
          <Th isNumeric>Torjus</Th>
        </Tr>
      </Tfoot>
    </Table>
  );
};

export default ScoreboardList;
