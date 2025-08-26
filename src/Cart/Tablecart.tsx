import {
    Box,
    Button,
    HStack,
    Text,
    VStack,
    Divider,
    Card,
    CardBody,
} from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import Headerr from "../components/Headerr.tsx";
import Footer from "../components/Footer.tsx";

interface CartItem {
    menu_id: number;
    title: string;
    quantity: number;
}

function CartPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const initialItems: CartItem[] = location.state?.cartItems || [];

    const [cartItems, setCartItems] = useState<CartItem[]>(initialItems);

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

    return (
        <>
            <Headerr />
            <Box maxW="800px" mx="auto" p={6}>
                <Text fontSize="3xl" fontWeight="bold" mb={6} textAlign="center">
                    ລາຍການຕະກ້າອາຫານ
                </Text>

                {cartItems.length === 0 ? (
                    <Text fontSize="lg" color="gray.500" textAlign="center">
                        ບໍ່ມີລາຍການອາຫານໃນຕະກ້າ
                    </Text>
                ) : (
                    <VStack spacing={4} align="stretch">
                        {cartItems.map(item => (
                            <Card key={item.menu_id} boxShadow="md" borderRadius="md">
                                <CardBody>
                                    <HStack justifyContent="space-between">
                                        <Text fontSize="lg" fontWeight="medium">{item.title}</Text>
                                        <HStack>
                                            <Button size="sm" colorScheme="red" onClick={() => decreaseQuantity(item.menu_id)}>-</Button>
                                            <Text>{item.quantity}</Text>
                                            <Button size="sm" colorScheme="green" onClick={() => increaseQuantity(item.menu_id)}>+</Button>
                                        </HStack>
                                    </HStack>
                                </CardBody>
                            </Card>
                        ))}
                        <Divider />
                        <Button
                            colorScheme="teal"
                            size="lg"
                            onClick={() => navigate("/Allproduct")}
                            alignSelf="center"
                        >
                            ເພີ່ມອາຫານເພີ່ມ
                        </Button>
                    </VStack>
                )}
            </Box>
            <Footer />
        </>
    );
}

export default CartPage;
