import {
    Box,
    Button,
    Grid,
    GridItem,
    Image,
    SimpleGrid,
    Text,
    useDisclosure,
    VStack,
    HStack,
    Divider,
    useToast,
    useColorModeValue,
    Flex,
    Stack,
    Center,
    Spinner, Icon,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import Headerr from "./Headerr";
import Footer from "./Footer";
import {ConfirmOrder} from "../Models/confirm.tsx";
import { useCreateOrderMutation, useGetCategorytypeQuery, useGetMenusQuery } from "../stores/service/user.ts";
import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import { IMAGE_BASE_URL } from "../utils/function";
import {FaShoppingCart} from "react-icons/fa";
import {MdRestaurantMenu} from "react-icons/md";
import {CartItem, CreateOrderResponse, IMenusData} from "./main_model/model.ts";


function MainBody() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast();
    const cardBg = useColorModeValue('white', 'gray.800');
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [customerId, setCustomerId] = useState<string | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const [showCount, setShowCount] = useState(4);

    const { data: categoryResponse, isLoading: loadingCategory } = useGetCategorytypeQuery({});
    const categories = [...(categoryResponse?.data?.map((cat: { name: string }) => cat.name) || [])];

    const { data, isLoading, error } = useGetMenusQuery({});

    const [createOrder] = useCreateOrderMutation();

    useEffect(() => {
        const id = localStorage.getItem("customer_id");
        setCustomerId(id);
    }, []);

    const filteredMenus = data?.data.filter((menu: { category_name: string }) => {
        if (!selectedCategory) return true;
        return menu.category_name === selectedCategory;
    }) || [];

    const addToCart = (menu: { id: number; name: string }) => {
        setCartItems((prevCartItems) => {
            const existingIndex = prevCartItems.findIndex(item => item.menu_id === menu.id);
            if (existingIndex !== -1) {
                const updatedCart = [...prevCartItems];
                updatedCart[existingIndex].quantity += 1;
                return updatedCart;
            } else {
                return [...prevCartItems, { menu_id: menu.id, title: menu.name, quantity: 1 }];
            }
        });
    };

    const increaseQuantity = (menu_id: number) => {
        setCartItems((prev) =>
            prev.map(item =>
                item.menu_id === menu_id ? { ...item, quantity: item.quantity + 1 } : item
            )
        );
    };

    const decreaseQuantity = (menu_id: number) => {
        setCartItems((prev) =>
            prev
                .map(item =>
                    item.menu_id === menu_id ? { ...item, quantity: item.quantity - 1 } : item
                )
                .filter(item => item.quantity > 0)
        );
    };

    const handleOrder = () => {
        if (!customerId) {
            toast({
                title: "ກະລຸນາເຂົ້າສູ່ລະບົບກ່ອນສັ່ງອາຫານ",
                status: "warning",
                duration: 3000,
                isClosable: true,
    position: "bottom-right",
            });
            return;
        }
        if (cartItems.length === 0) {
            toast({
                title: "ກະລຸນາເລືອກເມນູອາຫານກ່ອນສັ່ງ",
                status: "warning",
                duration: 3000,
                isClosable: true,
    position: "bottom-right",
            });
            return;
        }

        const payload = {
            customer_id: Number(customerId),
            items: cartItems.map(({ menu_id, quantity }) => ({
                menu_id,
                quantity,
            })),
        };

        setIsSubmitting(true);
        createOrder(payload)
            .unwrap()
            .then((res: CreateOrderResponse) => {
                toast({
                    title: `ສັ່ງອາຫານສຳເລັດ! Order ID: ${res.order_id}`,
                    description: `ຈຳນວນ ${cartItems.length} ລາຍການ`,
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                position: "bottom"
                });
                setCartItems([]);
                onClose();
                setIsSubmitting(false);
            })
            .catch(() => {
                toast({
                    title: "ບໍ່ສາມາດສັ່ງອາຫານໄດ້",
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                position: "bottom"
                });
                setIsSubmitting(false);
            });
    };

    return (
        <>
            <Headerr />
            <Grid alignItems="center" justifyContent="center" mb={4}>
                <GridItem>
                    <Image
                        src={"/images/header_tomou.jpg"}
                        alt="Header Image"
                        borderRadius="md"
                        boxShadow="md"
                        maxWidth="100%"
                    />
                </GridItem>
            </Grid>
            <Flex justify="center" px={3} flexWrap="wrap">
                <Stack direction="row" fontWeight="bold" spacing={4} flexWrap="wrap" justify="center">
                    {categories.map((category) => (
                        <Text

                            key={category}
                            cursor="pointer"
                            color="ิblack"
                            fontWeight={selectedCategory === category ? 'bold' : 'bold'}
                            textDecoration={selectedCategory === category ? 'underline' : 'none'}
                            onClick={() => setSelectedCategory(category)}
                            _hover={{
                                color: 'teal.700',
                                textDecoration: 'underline',
                            }}
                            userSelect="none"
                        >
                            {category}
                        </Text>
                    ))}
                </Stack>
            </Flex>


            <Box p={6} maxW="1100px" mx="auto">
                <SimpleGrid gap={4} columns={{ base: 2, md: 4 }}>
                    {isLoading || loadingCategory ? (
                        <Center>
                            <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="teal.500" size="xl" />
                        </Center>
                    ) : error ? (
                        <Text color="red.500">ເກີດຂໍ້ຜິດພາດໃນການໂຫຼດເມນູ</Text>
                    ) : (
                        filteredMenus.slice(0, showCount).map((menu: IMenusData) => (
                            <Box
                                key={menu.id}
                                bg={cardBg}
                                borderRadius="lg"
                                overflow="hidden"
                                boxShadow="lg"
                            >
                                <Image
                                    src={`${IMAGE_BASE_URL}${menu.image}`}
                                    objectFit="cover"
                                    height="150px"
                                    width="100%"
                                />
                                <Box textAlign="center" p={2}>
                                    <Text fontWeight="semibold" color="gray.700" mb={2}>
                                        {menu.name}
                                    </Text>
                                    {menu.status ? (
                                        <Button
                                            colorScheme="teal"
                                            size="sm"
                                            onClick={() => addToCart({ id: menu.id, name: menu.name })}
                                            width="100%"
                                        >
                                            ເພີ່ມເຂົ້າກະຕ່າ
                                        </Button>
                                    ) : (
                                        <Button
                                            colorScheme="red"
                                            size="sm"
                                            isDisabled
                                            width="100%"
                                        >
                                            ໝົດແລ້ວ
                                        </Button>
                                    )}
                                </Box>
                            </Box>
                        ))
                    )}
                </SimpleGrid>
                {filteredMenus.length > showCount && (
                    <Box textAlign="center" mt={4} border="none" boxShadow="none">
                        <Button
                            colorScheme="teal"
                            onClick={() => setShowCount(prev => prev + 6)}
                        >
                            ໂຫຼດເພີ່ມເຕີມ
                        </Button>
                    </Box>
                )}
            </Box>

            <Box py={2} p={2} maxW="1100px" mx="auto" borderTop="1px solid" borderColor="gray.200" bg="gray.50" borderRadius="md" boxShadow="sm" mt={2}>
                <Text textAlign="center" fontSize="2xl" fontWeight="bold" color="teal.600">
                    <HStack justify="center">
                        <Box as={FaShoppingCart} />
                        <Text as="span">ກະຕ່າອໍເດີ້</Text>
                    </HStack>
                </Text>

                {cartItems.length === 0 ? (
                    <Text fontSize="sm" color="gray.500" textAlign="center" >
                        ກະຕ່າຍັງວ່າງ
                    </Text>
                ) : (
                    <VStack spacing={2} align="stretch">
                        {cartItems.map((item) => (
                            <HStack
                                key={item.menu_id}
                                justifyContent="space-between"
                                p={2}
                                bg="white"
                                borderRadius="md"
                                boxShadow="base"
                            >
                                <Text fontWeight="semibold" color="gray.700">
                                    {item.title}
                                </Text>
                                <HStack>
                                    <Button
                                        size="sm"
                                        onClick={() => decreaseQuantity(item.menu_id)}
                                        colorScheme="red"
                                        variant="outline"
                                        aria-label={`ລົບ ${item.title}`}
                                        leftIcon={<MinusIcon />}
                                    >
                                        ລົບ
                                    </Button>
                                    <Text fontWeight="bold" minW="24px" textAlign="center">
                                        {item.quantity}
                                    </Text>
                                    <Button
                                        size="sm"
                                        onClick={() => increaseQuantity(item.menu_id)}
                                        colorScheme="green"
                                        variant="outline"
                                        aria-label={`ເພີ່ມຈໍານວນ ${item.title}`}
                                        leftIcon={<AddIcon />}
                                    >
                                        ເພີ່ມ
                                    </Button>
                                </HStack>
                            </HStack>
                        ))}
                        <Divider />

                        <Button
                            colorScheme="teal"
                            size="lg"
                            fontWeight="bold"
                            onClick={() => onOpen()}
                            isDisabled={cartItems.length === 0 || isSubmitting}
                            leftIcon={<FaShoppingCart />}
                        >
                            ສັ່ງທັ້ງໝົດ
                        </Button>
                    </VStack>
                )}
            </Box>
            <ConfirmOrder
                isOpen={isOpen}
                onClose={onClose}
                title="ຢືນຢັນການສັ່ງອາຫານ"
                onSave={handleOrder}
                isLoading={isSubmitting}
            >
                <Box textAlign="center" mb={2}>
                    <Icon as={MdRestaurantMenu} boxSize={6} color="teal.500" mb={1} />
                    <Text>ອາຫານທັງໝົດ {cartItems.length} ລາຍການ</Text>
                </Box>

                {isSubmitting && (
                    <Text mt={2}  textAlign={"center"} color="teal.500"  fontSize="sm">
                        ກຳລັງສັ່ງອາຫານ...
                    </Text>
                )}
            </ConfirmOrder>
            <Footer />
        </>
    );
}

export default MainBody;
