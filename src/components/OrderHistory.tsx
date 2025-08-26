import {
    Box,
    ChakraProvider,
    Image,
    SimpleGrid,
    Text,
    Card,
    CardBody,
    Stack,
    Divider,
    Skeleton, Heading, Button,
} from "@chakra-ui/react";
import Headerr from "../components/Headerr";
import Footer from "../components/Footer";
import { useGetOrderHistoryQuery } from "../stores/service/user.ts";
import { useState, useEffect } from "react";
import { skipToken } from "@reduxjs/toolkit/query";
import { IOrderData, OrderItem } from "./main_model/model.ts";
import {MdBlock} from "react-icons/md";
import {FaCheckCircle} from "react-icons/fa";
import {TagOutline} from "../tag/outline.tsx";
import {IMAGE_BASE_URL} from "../utils/function";

function History_order() {
    const [customerId, setCustomerId] = useState<string | null>(null);

    useEffect(() => {
        const id = localStorage.getItem("customer_id");
        setCustomerId(id);
    }, []);

    const { data :dataorder , error, isLoading } = useGetOrderHistoryQuery(
        customerId ? { customer_id: Number(customerId) } : skipToken
    );

    const orders = dataorder?.data ?? [];

    const LoadingSkeletonCard = () => (
        <Card boxShadow="lg" borderRadius="xl" padding={4}>
            <Stack spacing={4}>
                <Skeleton height="28px" width="60%" />
                <Skeleton height="20px" width="30%" />
                <Skeleton height="20px" width="40%" />
                <Divider />
                <Stack spacing={3} maxH="200px" overflow="hidden">
                    {[...Array(3)].map((_, idx) => (
                        <Stack key={idx} direction="row" spacing={4} align="center">
                            <Skeleton boxSize="60px" borderRadius="md" />
                            <Box flex="1">
                                <Skeleton height="18px" width="80%" mb={2} />
                                <Skeleton height="14px" width="60%" />
                            </Box>
                        </Stack>
                    ))}
                </Stack>
            </Stack>
        </Card>
    );
    if (error || !dataorder || !dataorder.data || dataorder.data.length === 0) {
        return (
            <>
                <Headerr />
                <Box textAlign="center" py={100}  pt={100}   px={105} maxW="2xl" mx="auto">
                    <Box fontSize="6xl" role="img" aria-label="ເຄື່ອງຫມາຍຖາມ">
                        🧾❌
                    </Box>

                    <Heading as="h3" size="lg" mt={4} color="gray.700">
                        ບໍ່ມີການສັ່ງອາຫານ
                    </Heading>

                    <Text mt={2} color="gray.6 00" fontSize="sm">
                        ບໍ່ພົບຂໍ້ມູນການສັ່ງອາຫານລູກຄ້າ
                    </Text>

                    <Text mt={1} color="gray.500" fontSize="xs">
                        ອາດຍັງບໍ່ທັນມີການສັ່ງອາຫານ ແນະນໍາ ກັບໄປສັ່ງອາຫານຢູ່ໝ້າຫຼັກ
                    </Text>

                    <Button
                        as="a"
                        href="/Mainbody"
                        mt={6}
                        colorScheme="teal"
                        leftIcon={<span>🏠</span>}
                        size="md"
                        px={6}
                    >
                        ໄປໜ້າຫຼັກ
                    </Button>
                    `            </Box>
                <Footer />
            </>
        );
    }
    return (
        <ChakraProvider>
            <Headerr />
            <SimpleGrid
                py={4}
                px={{ base: 10, md: 10 }}
            >
            {isLoading && (
                    <SimpleGrid columns={{ base: 20, md: 10, lg: 10 }} spacing={6}>
                        {[...Array(4)].map((_, idx) => (
                            <LoadingSkeletonCard key={idx} />
                        ))}
                    </SimpleGrid>
                )}

                {error && (
                    <Text color="red.500" textAlign="center">
                        ເກີດຂໍ້ຜິດພາດໃນການໂຫຼດຂໍ້ມູນ
                    </Text>
                )}

                {!isLoading && orders.length === 0 && (
                    <Text textAlign="center" color="gray.500" py={10}>
                        ບໍ່ພົບປະຫວັດການສັ່ງຊື້
                    </Text>
                )}

                {!isLoading && orders.length > 0 && (
                    <SimpleGrid columns={{ base: 1, md: 1, lg: 4 }} spacing={6}>
                        {orders.map((order: IOrderData) => (
                            <Card key={order.id} boxShadow="lg" borderRadius="xl">
                                <CardBody>
                                    <Stack spacing={4}>
                                        <Stack direction="row" justify="space-between" align="center">
                                            <Text fontWeight="bold" fontSize="xl" color="teal.700">
                                                ໝາຍເລກການສັ່ງ: #{order.id}
                                            </Text>
                                            <Box fontWeight="bold" p={0} pr={2} textAlign="right" py={2}>
                                                {order.order_status.toLowerCase() === "success" ? (
                                                    <TagOutline label="SUCCESS" w="100px" size="sm"
                                                                icon={FaCheckCircle}
                                                                color="green"/>
                                                ) : (
                                                    <TagOutline label="PENDING" w="100px" size="sm"
                                                                icon={MdBlock}
                                                                color="yellow"/>
                                                )}
                                            </Box>
                                        </Stack>
                                        <Text color="teal.700 ">ເບີໂຕະ: {order.table_number}</Text>
                                        <Text color="teal.700">ວັນທີ: {new Date(order.created_at).toLocaleString()}</Text>

                                        <Divider />

                                        <Box color="teal.700" maxH="200px" overflowY="auto">
                                            {Array.isArray(order.order_items) &&
                                                order.order_items.map((item: OrderItem) => (
                                                    <Stack
                                                        key={item.id}
                                                        direction="row"
                                                        spacing={4}
                                                        align="center"
                                                        mb={2}
                                                    >
                                                        <Image
                                                            src={`${IMAGE_BASE_URL}${item.image}`}
                                                            alt={item.name}
                                                            boxSize="60px"
                                                            borderRadius="md"
                                                            objectFit="cover"
                                                        />
                                                        <Box flex="1">
                                                            <Text fontWeight="semibold">{item.name}</Text>
                                                            <Text fontSize="sm" color="gray.500">
                                                                ປະເພດ: {item.category_name} | ຈຳນວນ: {item.quantity}
                                                            </Text>
                                                        </Box>
                                                    </Stack>
                                                ))}
                                        </Box>
                                    </Stack>
                                </CardBody>
                            </Card>
                        ))}
                    </SimpleGrid>
                )}
            </SimpleGrid>

            <Footer />
        </ChakraProvider>
    );
}

export default History_order;
