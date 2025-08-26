import {
    Avatar,
    Box,
    Button,
    ChakraProvider,
    FormControl,
    FormLabel,
    Heading,
    HStack,
    Input,
    InputGroup,
    InputLeftElement,
    useToast,
    VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaUsers, FaChild } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useCreateCustomerMutation } from "../stores/service/user.ts";
import { checkErrorResponse } from "../responses/response.ts";
import { setCustomer } from "../stores/service/features/customerSlice.ts";

const LoginForm = () => {
    const toast = useToast();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [adults, setAdults] = useState("");
    const [children, setChildren] = useState("");
    const [tableNumber, setTableNumber] = useState("");

    const [createCustomer, { isLoading }] = useCreateCustomerMutation();

    const handleCreate = async () => {
        console.log("===  handleCreate ===");
        console.log("dtata:", {
            tableNumber,
            adults,
            children,
        });

        try {
            const { data: res, error: err }: any = await createCustomer({
                table_number: tableNumber,
                adults: Number(adults),
                children: Number(children),
            });


            if (err) {
                checkErrorResponse(toast, navigate, "Create Customer", err);
                return;
            }

            if (res !== undefined) {

                const customerId = res.customer_id.toString();
                const token = res.token;


                localStorage.setItem("customer_id", customerId);
                localStorage.setItem("token", token);

                dispatch(setCustomer({ customer_id: customerId, token }));

                navigate("/MainBody", { replace: true });
            }
        } catch (e) {
            console.error("Error in handleCreate:", e);
        }
    };

    const handleTableNumberChange = (e: any) => {
        const value = e.target.value;

        const number = parseInt(value, 10);

        if (!value || isNaN(number) || number < 1 || number > 100) {
            setTableNumber("");
            return;
        }

        const formatted = number < 10 ? `0${number}` : `${number}`;
        const finalValue = `TM-${formatted}`;
        setTableNumber(finalValue);
    };

    return (
        <ChakraProvider>
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight="100vh"
                bgGradient="linear(to-r, teal.400, teal.600)"
                px={4}
            >
                <Box
                    bg="white"
                    p={8}
                    borderRadius="2xl"
                    boxShadow="xl"
                    width="100%"
                    maxW="420px"
                >
                    <VStack spacing={6}>
                        <Avatar
                            size="xl"
                            name="Customer"
                            src="/images/tomou.jpg"
                            bg="teal.500"
                        />
                        <Heading size="lg" color="teal.600" fontFamily="'Poppins', sans-serif">
                            Welcome To Tomou
                        </Heading>

                        <FormControl>
                            <FormLabel color="teal.600">Table Number</FormLabel>
                            <InputGroup>
                                <InputLeftElement pointerEvents="none">
                                    <FaUsers color="gray.500" />
                                </InputLeftElement>
                                <Input
                                    type="number"
                                    placeholder="ເລກໂຕະ"
                                    min={1}
                                    max={100}
                                    value={tableNumber ? parseInt(tableNumber.replace("TM-", "")) : ""}
                                    onChange={handleTableNumberChange}
                                    bg="gray.50"
                                />
                            </InputGroup>
                        </FormControl>

                        <HStack spacing={4} width="100%">
                            <FormControl>
                                <FormLabel color="teal.600">Adults</FormLabel>
                                <InputGroup>
                                    <InputLeftElement pointerEvents="none">
                                        <FaUser color="gray.500" />
                                    </InputLeftElement>
                                    <Input
                                        type="number"
                                        placeholder="ຜູ້ໃຫ່ຍ"
                                        value={adults}
                                        onChange={(e) => {
                                            console.log("Adults input changed:", e.target.value);
                                            setAdults(e.target.value);
                                        }}
                                        bg="gray.50"
                                    />
                                </InputGroup>
                            </FormControl>

                            <FormControl>
                                <FormLabel color="teal.600">Children</FormLabel>
                                <InputGroup>
                                    <InputLeftElement pointerEvents="none">
                                        <FaChild color="gray.500" />
                                    </InputLeftElement>
                                    <Input
                                        type="number"
                                        placeholder="ເດັກນ້ອຍ"
                                        value={children}
                                        onChange={(e) => {
                                            console.log("Children input changed:", e.target.value);
                                            setChildren(e.target.value);
                                        }}
                                        bg="gray.50"
                                    />
                                </InputGroup>
                            </FormControl>
                        </HStack>

                        <Button
                            width="100%"
                            bgGradient="linear(to-r, teal.400, teal.600)"
                            color="white"
                            _hover={{ bgGradient: "linear(to-r, teal.500, teal.700)" }}
                            onClick={() => {
                                handleCreate();
                            }}
                            // isDisabled={!isFormComplete()}
                            isLoading={isLoading}
                            mt={4}
                            borderRadius="full"
                        >
                            ເຂົ້າສູ່ລະບົບ
                        </Button>
                    </VStack>
                </Box>
            </Box>
        </ChakraProvider>
    );
};

export default LoginForm;
