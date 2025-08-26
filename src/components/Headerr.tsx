import {
    Avatar,
    Box,
    ChakraProvider,
    Flex,
    HStack,
    Icon,
    Text,
} from "@chakra-ui/react";
import { NavLink, useLocation } from "react-router-dom";
import {
    FaHistory,
    FaHome,
} from "react-icons/fa";
import { MdNoteAlt } from "react-icons/md";
import { GrDocumentTime } from "react-icons/gr";

const pageNames: { [key: string]: string } = {
    "/Mainbody": "ໜ້າຫຼັກ",
    "/Allproduct": "ລາຍການອາຫານ",
    "/History": "ປະຫວັດການສັ່ງ",
    "/Acount-table": "ຂໍ້ມູນລູກຄ້າ",
    "/Bill-response": "ໃບບິນ",
};

function Headerr() {
    const location = useLocation();

    const getIconColor = (path: string) => {
        return location.pathname === path ? "yellow.300" : "white";
    };

    const pageTitle = pageNames[location.pathname] || "ໜ້າຫຼັກ";

    return (
        <ChakraProvider>
            <Box>
                <Flex
                    h={16}
                    alignItems="center"
                    justifyContent="space-between"
                    px={6}
                    py={2}
                    bgGradient="linear(to-r, teal.400, gray.400)"
                    boxShadow="md"
                >
                    <HStack spacing={4} alignItems="center">
                        <NavLink to="/Mainbody">
                            <Avatar
                                src={"images/tomou.jpg"}
                                name="Logo"
                                bg="teal.500"
                                color="white"
                                size="sm"
                                cursor="pointer"
                            />
                        </NavLink>
                        <Text fontSize="lg" fontWeight="bold" color="white">
                            {pageTitle}
                        </Text>
                    </HStack>

                    <HStack as="nav" spacing={6} color="white">
                        <NavLink to="/Mainbody">
                            <Icon
                                as={FaHome}
                                boxSize={5}
                                color={getIconColor("/Mainbody")}
                            />
                        </NavLink>

                        <NavLink to="/History">
                            <Icon
                                as={FaHistory}
                                boxSize={5}
                                color={getIconColor("/History")}
                            />
                        </NavLink>
                        <NavLink to="/Acount-table">
                            <Icon
                                as={MdNoteAlt}
                                boxSize={5}
                                color={getIconColor("/Acount-table")}
                            />
                        </NavLink>
                        <NavLink to="/Bill-response">
                            <Icon
                                as={GrDocumentTime}
                                boxSize={5}
                                color={getIconColor("/Bill-response")}
                            />
                        </NavLink>
                    </HStack>
                </Flex>
            </Box>
        </ChakraProvider>
    );
}

export default Headerr;