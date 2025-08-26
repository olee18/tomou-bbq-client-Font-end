import {Box, ChakraProvider, Container, Flex, Grid, Link, Stack, Text, VStack} from '@chakra-ui/react';
import {FaFacebook, FaInstagram, FaMapMarkerAlt, FaPhoneAlt, FaTwitter, FaYoutube} from 'react-icons/fa';

const Footer = () => {
    return (
        <ChakraProvider>
            <Box
                color="white"
                py={10}
                px={4}
                bgGradient="linear(to-r, teal.300, gray.400)"
                _hover={{
                    bgGradient: "linear(to-r, teal.400, gray.500)"
                }}
            >
                <Container maxW="container.xl">
                    <Grid
                        templateColumns={{
                            base: "1fr",
                            sm: "repeat(2, 1fr)",
                            md: "repeat(4, 1fr)"
                        }}
                        gap={8}
                    >
                        <VStack align="flex-start" spacing={2}>
                            <Text fontWeight="extrabold" fontSize="lg">TOMOU BBQ</Text>
                            <Text><FaMapMarkerAlt style={{ display: 'inline', marginRight: '8px' }} />LAO ITECC</Text>
                            <Text><FaPhoneAlt style={{ display: 'inline', marginRight: '8px' }} />Tel : 2099777663</Text>
                        </VStack>
                        <VStack align="flex-start" spacing={2}>
                            <Text fontWeight="bold">Follow Us</Text>
                            <Stack direction="row" spacing={4}>
                                {[
                                    {Icon: FaFacebook, href: "https://www.facebook.com/TomouBBQ?locale=th_TH"},
                                    {Icon: FaInstagram, href: "https://www.instagram.com/"},
                                    {Icon: FaTwitter, href: "https://twitter.com/"},
                                    {Icon: FaYoutube, href: "https://www.youtube.com/"}
                                ].map(({Icon, href}) => (
                                    <Link key={href} href={href} isExternal>
                                        <Icon size={24}/>
                                    </Link>
                                ))}
                            </Stack>
                        </VStack>

                    </Grid>
                    <Flex
                        justify="center"
                        align="center"
                        borderTop="1px solid"
                        mt={10}
                        pt={4}
                        textAlign="center"
                        fontSize="sm"
                    >
                        <Text>&copy; {new Date().getFullYear()} ອີ່ມແຊບຈຸໃຈໄປກັບໂຕຫມູ</Text>
                    </Flex>
                </Container>
            </Box>
        </ChakraProvider>
    );
};

export default Footer;
