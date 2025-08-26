import {
    Box,
    Heading,
    Text,
    Stack,
    Divider,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Flex,
    Avatar,
    Button,
} from '@chakra-ui/react';
import { useGetBillByCustomrIdQuery } from '../stores/service/user.ts';
import { useState, useEffect, useRef } from 'react';
import { skipToken } from '@reduxjs/toolkit/query';
import Headerr from './Headerr.tsx';
import Footer from './Footer.tsx';
import { ItemBillData } from './main_model/model.ts';

const BillResponse = () => {
    const [customerId, setCustomerId] = useState<string | null>(null);

    useEffect(() => {
        const id = localStorage.getItem('customer_id');
        setCustomerId(id);
    }, []);

    const { data: billData, error } = useGetBillByCustomrIdQuery(
        customerId ? { customer_id: Number(customerId) } : skipToken
    );

    const componentRef = useRef<HTMLDivElement>(null);

    if (error || !billData || !billData.data || billData.data.length === 0) {
        return (
            <>
                <Headerr />
                <Box textAlign="center" py={100}  pt={100}   px={105} maxW="6xl" >
                    <Box fontSize="6xl" role="img" aria-label="ເຄື່ອງຫມາຍຖາມ">
                        🧾❌
                    </Box>
                    <Heading as="h4" size="lg" mt={4} color="gray.700">
                        ບໍ່ມີບິນ
                    </Heading>
                    <Text mt={2} color="gray.600" fontSize="sm">
                        ບໍ່ພົບຂໍ້ມູນບິນສຳລັບລະຫັດລູກຄ້າ
                    </Text>
                    <Text mt={1} color="gray.500" fontSize="xs">
                        ອາດຍັງບໍ່ທັນມີການສັ່ງອາຫານ ຫຼື ຍັງບໍ່ໄດ້ເລີ່ມບິນ
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
                </Box>
                <Footer />
            </>
        );
    }

    const bill = billData.data[0];

    if (!bill) {
        return (
            <Box textAlign="center" py={10}>
                <Text color="red.500">ຂໍ້ມູນບິນບໍ່ຖືກຕ້ອງ</Text>
            </Box>
        );
    }

    const displayDate = bill.date
        ? new Date(bill.date.replace(' ', 'T')).toLocaleString('lo-LA', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        })
        : 'ບໍ່ລະບຸ';

    const totalAmount = bill.total_combined_amount ?? bill.total_amount ?? 0;

    const items = Array.isArray(bill.items) ? bill.items : [];

    return (
        <>
            <Headerr />
            <Box
                ref={componentRef}
                maxW="lg"
                mx="auto"
                p={4}
                py={2}
                borderRadius="xl"
                borderWidth="1px"
                bg="white"
                boxShadow="xl"
                fontFamily="body"
            >
                <Stack align="center">
                    <Avatar size="xl" name="Customer" src="/images/tomou.jpg" />
                    <Heading size="lg" color="teal.700">
                        ໃບບິນຈ່າຍເງິນ
                    </Heading>
                    <Text fontSize="sm">iTecc Maill Sindath Tomou BBQ</Text>
                </Stack>
                <Divider />
                <Stack spacing={2} fontSize="md" mt={2} mb={2}>
                    <Text>
                        <strong>ເລກໂຕະ:</strong> {bill.table_number}
                    </Text>
                    <Text>
                        <strong>ລະຫັດການສັ່ງ:</strong> {bill.order_id}
                    </Text>
                    <Text>
                        <strong>ວັນທີ:</strong> {displayDate} ໂມງ
                    </Text>
                    <Text>
                        <strong>ຜູ້ໃຫ່ຍ: 99.000 /</strong> {bill.adults}
                    </Text>
                    <Text>
                        <strong>ເດັກນ້ອຍ: 49.000 /</strong> {bill.children} {/* ✅ แก้ไข */}
                    </Text>
                    <Text>
                        <strong>ຈຳນວນ:</strong> {bill.total_customer}
                    </Text>
                    <Text>
                        <strong>ລາຄາ :</strong> {bill.total_amount?.toLocaleString() || 0} ກີບ
                    </Text>
                </Stack>
                <Divider mb={2} />
                <Heading size="sm" mb={2} color="teal.600">
                    ລາຍລະອຽດ
                </Heading>
                <Table variant="striped" size="">
                    <Thead bg="gray.300">
                        <Tr>
                            <Th >ລາຍການ</Th>
                            <Th isNumeric>ລາຄາ</Th>
                            <Th isNumeric>ຈຳນວນ</Th>
                            <Th isNumeric>ລວມ</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {items.length === 0 ? (
                            <Tr>
                                <Td colSpan={4} textAlign="center" color="gray.500" fontStyle="italic">
=======================================
                                </Td>
                            </Tr>
                        ) : (
                            items.map((item: ItemBillData) => (
                                <Tr>
                                    <Td>{item.name}</Td>
                                    <Td isNumeric>{item.price?.toLocaleString() || 0}</Td>
                                    <Td isNumeric>{item.quantity}</Td>
                                    <Td isNumeric color="orange.600" fontWeight="semibold">
                                        {item.total_price?.toLocaleString() || 0}
                                    </Td>
                                </Tr>
                            ))
                        )}
                    </Tbody>
                </Table>

                <Flex justify="flex-end" mb={2}>
                    <Text fontSize="lg" fontWeight="bold" color="teal.600">
                        ລວມທັງໝົດ: {totalAmount.toLocaleString()} ກີບ
                    </Text>
                </Flex>
                <Box textAlign="center" mb={2}>
                    <Text fontWeight="semibold">ສະແກນ QR ເພື່ອຊຳລະເງິນ</Text>
                    <Box mt={2} bg="gray.100" p={2} borderRadius="md">
                        <img
                            src="/images/qr.jpg"
                            alt="QR Code"
                        />
                    </Box>
                </Box>

                <Divider mt={2} mb={2} />
                <Text
                    mt={2}
                    fontSize="md"
                    fontWeight="bold"
                    color="teal.600"
                    textAlign="center"
                >
                    ຂໍຂອບໃຈທີ່ໃຊ້ບໍລິການ❗️
                </Text>
            </Box>
            <Footer />
        </>
    );
};

export default BillResponse;