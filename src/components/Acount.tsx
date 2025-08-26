import {
    Box,
    Text,
    Spinner,
    Center,
    Alert,
    AlertIcon,
    Button,
    SimpleGrid,
    Stack,
    useColorModeValue,
    Divider,
    Flex,
    ScaleFade,
    ChakraProvider,
    HStack,
    useToast, useDisclosure, Icon,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { skipToken } from "@reduxjs/toolkit/query";
import { useGetDataCustomrIdQuery, useInsertBillsMutation } from "../stores/service/user.ts";
import Headerr from "./Headerr";
import Footer from "./Footer";
import { TagOutline } from "../tag/outline.tsx";
import {FaCheckCircle, FaUtensils} from "react-icons/fa";
import {MdBlock} from "react-icons/md";
import {ConfirmOrder} from "../Models/confirm.tsx";

const AccountPage = () => {
    const [customerId, setCustomerId] = useState<number | null>(null);
    const toast = useToast();
    const { isOpen,onOpen, onClose } = useDisclosure();

    useEffect(() => {
        const id = localStorage.getItem("customer_id");
        if (id) setCustomerId(Number(id));
    }, []);

    const { data, error, isLoading} = useGetDataCustomrIdQuery(
        customerId ? { id: customerId } : skipToken
    );

    const [insertBills, { isLoading: isSubmitting }] = useInsertBillsMutation();

    const bg = useColorModeValue("white", "gray.700");
    const borderColor = useColorModeValue("gray.200", "gray.600");
    const labelColor = useColorModeValue("gray.600", "gray.300");
    const valueColor = useColorModeValue("gray.800", "white");

    const handleInsertBill = async () => {
        if (!customerId) return;

        try {
            await insertBills({ customer_id: customerId }).unwrap();
            toast({
                title: "ເຊັກບິນສຳເລັດ",
                status: "success",
                duration: 3000,
                isClosable: true,
                position: "bottom-right",

            });
            onClose();
        } catch (err: any) {
            toast({
                title: "ເຊັກບິນລົ້ມເຫຼວ",
                description: err?.data?.message || "ຍັງບໍ່ສາມາດເຊັກບິນໄດ້",
                status: "error",
                duration: 3000,
                isClosable: true,
                position: "bottom-right",

            });
        }
    };
    return (
        <ChakraProvider>
            <Headerr />
            <SimpleGrid py={4} px={{ base: 16, md: 16 }}>
                <Stack spacing={2}>
                    <ScaleFade initialScale={2} in={isLoading}>
                        <Center flexDir="column" hidden={!isLoading} color="teal.400">
                            <Spinner size="xl" />
                            <Text fontSize="lg" color="gray.500">
                                ກຳລັງໂຫລດຂໍ້ມູນ...
                            </Text>
                        </Center>
                    </ScaleFade>

                    {!isLoading && error && (
                        <Alert status="error" borderRadius="md">
                            <AlertIcon />
                            ເກີດບັນຫາໃນການໂຫລດຂໍ້ມູນ
                        </Alert>
                    )}

                    {!isLoading && data?.data?.length > 0 ? (
                        <Box
                            bg={bg}
                            borderRadius="xl"
                            boxShadow="lg"
                            borderWidth="1px"
                            borderColor={borderColor}
                            p={5}
                            transition="all 0.3s ease"
                            _hover={{ boxShadow: "2xl" }}
                        >
                            <SimpleGrid columns={{ base: 2, md: 2 }} spacing={8} mb={6}>
                                <Box p="6" borderRadius="md" borderWidth="1px" borderColor={borderColor}>
                                    <HStack color={labelColor}>
                                        <Text fontWeight="semibold">ຜູ້ໃຫຍ່</Text>
                                    </HStack>
                                    <Text fontSize="xl" fontWeight="bold" color={valueColor}>
                                        {data.data[0].adults}
                                    </Text>
                                </Box>

                                <Box p="6" borderRadius="md" borderWidth="1px" borderColor={borderColor}>
                                    <HStack color={labelColor}>
                                        <Text fontWeight="semibold">ເດັກນ້ອຍ</Text>
                                    </HStack>
                                    <Text fontSize="xl" fontWeight="bold" color={valueColor}>
                                        {data.data[0].children}
                                    </Text>
                                </Box>

                                <Box p="6" borderRadius="md" borderWidth="1px" borderColor={borderColor}>
                                    <HStack color={labelColor}>
                                        <Text fontWeight="semibold">ໂຕະ</Text>
                                    </HStack>
                                    <Text fontSize="xl" fontWeight="bold" color={valueColor}>
                                        {data.data[0].table_number}
                                    </Text>
                                </Box>

                                <Box p="5" borderRadius="md" borderWidth="1px" borderColor={borderColor}>
                                    <HStack color={labelColor}>
                                        <Text fontWeight="semibold">ລວມ</Text>
                                    </HStack>
                                    <Text fontSize="xl" fontWeight="bold" color={valueColor}>
                                        {data.data[0].total_customer}
                                    </Text>
                                </Box>
                            </SimpleGrid>

                            <Divider mb={2} />

                            <Flex justify="space-between" align="center" flexWrap="wrap" gap="7" mb={4}>
                                <Text fontWeight="semibold" fontSize="lg" color={labelColor}>
                                    ສະຖານະ
                                </Text>
                                <TagOutline
                                    label={data.data[0].can_order ? "ສາມາດສັ່ງໄດ້" : "ບໍ່ສາມາດສັ່ງໄດ້"}
                                    size="sm"
                                    icon={data.data[0].can_order ? FaCheckCircle : MdBlock}
                                    color={data.data[0].can_order ? "green" : "red"}
                                />
                            </Flex>
                            <Center>
                                <Button
                                    colorScheme="teal"
                                    size="md"
                                    onClick={() => {
                                        if (data?.data?.[0]?.can_order) {
                                            onOpen();
                                        } else {
                                            toast({
                                                title: "ບໍ່ສາມາດເຊັກບິນໄດ້",
                                                description: "ລູກຄ້າໄດ້ກົດເຊັກບິນແລ້ວ",
                                                status: "warning",
                                                duration: 3000,
                                                isClosable: true,
                                            });
                                        }
                                    }}
                                    isLoading={isSubmitting}
                                    loadingText="ກຳລັງເຊັກບິນ..."
                                >
                                    ເຊັກບິນ
                                </Button>

                            </Center>
                            <ConfirmOrder
                                isOpen={isOpen}
                                onClose={onClose}
                                title="ຢືນຢັນການເຊັກບິນ"
                                onSave={handleInsertBill}
                                isLoading={isSubmitting}
                            >
                                <HStack color="teal.500" spacing={2}>
                                    <Icon as={FaUtensils} boxSize={5} />
                                    <Text>
                                        ຢຶນຢັນການເຊັກບິນຂອງໂຕະ {data.data[0].table_number}
                                    </Text>
                                </HStack>
                            </ConfirmOrder>
                            {/*<Text fontSize="sm" fontStyle="italic" textAlign="center" color={labelColor}>*/}
                            {/*    ອັບເດດລ່າສຸດ: {new Date(data.data[0].updated_at).toLocaleString()}*/}
                            {/*</Text>*/}
                        </Box>
                    ) : (
                        !isLoading && (
                            <Text textAlign="center" fontSize="lg" color="gray.600">
                                ບໍ່ພົບຂໍ້ມູນຕູ້ຂອງທ່ານ
                            </Text>
                        )
                    )}
                </Stack>
            </SimpleGrid>
            <Footer />
        </ChakraProvider>
    );
};

export default AccountPage;
