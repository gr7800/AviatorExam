import { Box, Flex, Heading, Text, Image, Button, Link, useToast, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, FormControl, FormLabel, Input, ModalFooter, useDisclosure } from "@chakra-ui/react";
import React, { useState } from 'react'
import paymentpagebg from "../utills/images/paymentInfo/paymentpagebg.jpg"
import PlatinumImage from "../utills/images/paymentPlane/PlatinumImage.jpg"
import goldImage from "../utills/images/paymentPlane/goldImage.jpg"
import SilvarImage from "../utills/images/paymentPlane/SilvarImage.jpg"
import aviatorcloudlogo from "../utills/images/home/aviatorcloudlogo.jpg"
import { useDispatch, useSelector } from "react-redux"
import { getPaymentInfo, paymentRequest } from "../Redux/Payment/payment.action";
import { useLocation, useNavigate } from "react-router-dom";
import { SpecialAcess, singleuser } from "../Redux/Auth/auth.action";
import imageloading from '../utills/images/loading/imageloading.gif';


function addDays(dateString, days) {
    const currentDate = new Date(dateString);
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + days);

    // Formatting the new date to match the original format
    const formattedDate = newDate.toISOString();
    return formattedDate;
}

function formatDate(date) {
    return date.toISOString().slice(0, 23) + "Z";
}

function compareDates(receivedDateString) {
    const currentDate = new Date();
    const receivedDate = new Date(receivedDateString);

    const formattedCurrentDate = formatDate(currentDate);
    const formattedReceivedDate = formatDate(receivedDate);

    console.log(formattedCurrentDate, formattedReceivedDate);

    if (formattedCurrentDate <= formattedReceivedDate) {
        return true; // Current date is greater than or equal to the received date
    } else {
        return false; // Current date is earlier than the received date
    }
}


const PaymentCard = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const location = useLocation();
    const { path } = location.state || "/";
    const [paymentInfo, setPaymentInfo] = useState({
        purpose: "",
        amount: 0,
        buyer_name: "",
        email: "",
        phone: "",
        redirect_url: "http://aviatorexam.in/paymentstatus"
    })
    const [validationErrors, setValidationErrors] = useState({
        email: '',
        buyer_name: '',
        phone: '',
    });

    const user = JSON.parse(localStorage.getItem("useraviaton"))
    const isAuth = useSelector((store) => store.auth.isAuth);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    // const [score, setScore] = useState({})
    const dispatch = useDispatch()
    const params = window.location.search
    const toast = useToast()

    const handleOpen = (purpose, price) => {
        onOpen();
        setPaymentInfo(prevPaymentInfo => ({
            ...prevPaymentInfo,
            purpose: purpose,
            amount: price
        }));
    }
    const handleEmailName = (e) => {
        e.preventDefault();
        const { name, value } = e.target;

        // Validation
        let errorMessage = '';
        let storedValue = value;

        if (name === 'email') {
            if (!value.match(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/)) {
                errorMessage = 'Please enter a valid email address';
            }
        } else if (name === 'buyer_name') {
            if (value.trim() === '') {
                errorMessage = 'Please enter your full name';
            }
        } else if (name === 'phone') {
            // Remove non-numeric characters from the value
            storedValue = value.replace(/\D/g, '');

            if (!storedValue.match(/^\d{10}$/)) {
                errorMessage = 'Please enter a valid 10-digit phone number';
            }
        }

        setValidationErrors((prev) => ({ ...prev, [name]: errorMessage }));
        setPaymentInfo((prev) => ({ ...prev, [name]: storedValue }));
    };



    const handlePaymentChange = async (e) => {
        e.preventDefault();
        // Check if all fields are valid and not empty
        if (paymentInfo.buyer_name && paymentInfo.phone && paymentInfo.email && !validationErrors.buyer_name && !validationErrors.phone && !validationErrors.email) {
            try {
                const res = await dispatch(paymentRequest(paymentInfo))
                console.log(res);
                if (res.success) {
                    window.location.href = res.data?.longurl;
                }
            } catch (error) {
                console.error(error);
                // Show error toast for API request failure
                toast({
                    title: 'Payment Error',
                    description: 'An error occurred while processing your payment.',
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                });
            }
        } else {
            // Not all fields are valid and not empty
            // Show error toast
            toast({
                title: 'Invalid Fields',
                description: 'Please fill in all fields correctly.',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        }
    };


    const checkLogin = () => {
        if (!isAuth) {
            const token = JSON.parse(localStorage.getItem("token"));
            if (token) {
                dispatch(singleuser())
                    .then(() => console.log("res"))
                    .catch(() => console.log("Token Expire"))
                return true
            } else {
                toast({
                    title: 'Login Please',
                    description: 'Please Login first before Taking Test',
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                });
                navigate("/login");
                return false;
            }
        } else {
            return true
        }
    }

    const CheckSubscription = async (email) => {
        try {
            const res = await getPaymentInfo(email);
            if (res && res.message === "Payment information not found") {
                toast({
                    title: 'No Active Plan',
                    description: 'Please Choose A Subscription Plan!',
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                });
                return false
            }
            if (res.email === "cto.aviatorcloud@gmail.com") {
                return true;
            }
            let formateddates;
            if (res?.status === 'Completed') {
                const created_at = res.created_at;

                if (res?.purpose === 'Buying aviation special Exam Platinum Plane') {
                    formateddates = addDays(created_at, 30);
                }
                if (res?.purpose === 'Buying aviation special Exam Silvar Plane') {
                    formateddates = addDays(created_at, 3);
                }
                if (res?.purpose === 'Buying aviation special Exam Gold Plane') {
                    formateddates = addDays(created_at, 15);
                }
            }
            const result = await compareDates(formateddates);
            console.log(result, formateddates);
            return result;
        } catch (error) {
            console.error('Error fetching payment info:', error);
            return false;
        }
    }

    const handleProceed = async () => {
        setIsLoading(true)
        if (checkLogin()) {
            const user = JSON.parse(localStorage.getItem('useraviaton'));
            let res = await CheckSubscription(user.email);
            if (res) {
                setIsLoading(false);
                dispatch(SpecialAcess(res));
                navigate(path);
            } else {
                setIsLoading(false);
                toast({
                    title: 'No Active Plan',
                    description: 'Your Choosen Plane is expired',
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                });
            }
        }
        setIsLoading(false);
    }

    if (isLoading) {
        return (
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                h="100vh"
                bg="blue.800"
            >
                <img src={imageloading} alt="Loading" />
            </Box>
        );
    }

    return (
        <Box>
            <Flex
                direction="column"
                justifyContent="center"
                width="100%"
                height="70vh"
                bgImage={`linear-gradient(rgba(128, 128, 128, 0.5), rgba(128, 128, 128, 0.5)), url(${paymentpagebg})`}
                bgSize="cover"
                bgRepeat="no-repeat"
                bgPos="center"
                color="white"
                tabIndex={-1}
            >
                <Flex width="100%" padding="15%" direction={"column"} rowGap={"20px"} fontWeight={"bold"} >
                    <Heading fontSize="50px" fontWeight={"semibold"} textShadow={'2px 2px 4px rgba(0, 0, 0, 0.5)'} transform={'perspective(500px) rotateX(0deg)'} >AVIATOR EXAM</Heading>
                    <Text>DGCA Test Preparation for Pilots</Text>
                    <Text>If you have already taken the subscription plan, proceed to the test.</Text>
                    <Button w={"200px"} bg={"yellow.500"} onClick={handleProceed} borderRadius={"20px"} m={"auto"} color={"blue"} fontWeight={"bold"} style={{ boxShadow: 'rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset' }}>
                        PROCEED
                    </Button>
                </Flex>

            </Flex>
            <Flex direction={"column"} rowGap={"20px"} textAlign={"left"} padding={"5% 10% 5% 10%"} >
                <Box>Welcome to Aviator Cloud, your one-stop solution for achieving your dream of becoming a pilot. We are dedicated to providing top-notch online courses that will prepare you for the different cadet pilot program entrance exams, pilot training, airline selection, and much more.</Box>
                <Box>Our team of experienced instructors and aviation experts have designed comprehensive courses that cover everything you need to know to succeed in the highly competitive world of aviation. From basic aviation knowledge to cadet pilot preparation, we've got you covered.</Box>
                <Box>Our courses are interactive, engaging, and tailored to suit your learning style. We understand that each student has unique needs, and we strive to provide personalized attention to help you achieve your goals. Our courses are available 24/7, so you can learn at your own pace and convenience.</Box>
                <Box>We are confident that our courses will equip you with the knowledge and skills you need to succeed in your pilot entrance exam. Our students have a high success rate in passing their exams, and many have gone on to become successful pilots with top airlines.</Box>
                <Box>Join the Aviator Cloud community today and take the first step towards achieving your dreams. Start your journey to becoming a pilot with us, and we'll be with you every step of the way.</Box>
            </Flex>
            <Box>
                <Heading as={"h3"} color={"blue.800"} fontWeight={"semibold"} textShadow={'2px 2px 4px rgba(0, 0, 0, 0.5)'} transform={'perspective(500px) rotateX(0deg)'}>Choose Plans For Special General Exam</Heading>
                <Box padding={"5% 10% 5% 10%"} display={"grid"} gridTemplateColumns={"repeat(auto-fit, minmax(300px, 1fr))"} gap={"20px"} rowGap={"20px"} >
                    <Flex bgColor={"gray.200"} direction={"column"} color={"red"} fontWeight={"semibold"} boxShadow={"0px 4px 8px rgba(0, 0, 0, 0.2)"} borderRadius={8} paddingBottom={"20px"} _hover={{ border: "1px solid #ffbe58" }} onClick={() => handleOpen("Aviator Exam Silvar Plane - Aviator Cloud", 500)}>
                        <Image src={SilvarImage} alt="SilvarImage" borderRadius={8} />
                        <Heading cursor={"pointer"} fontSize={"20px"} color={"black"} fontWeight={"bold"} p={"10px"} _hover={{ color: "#ffbe58" }}>Aviator Exam Silvar Plan - Test + Preparation </Heading>
                        <Text p={"10px"} color={"gray"}>If you want to accesse only for 3 day choose this plan.</Text>
                        <Flex justify={"space-between"} p={"0px 20px 0px 20px"} fontWeight={"bold"}>
                            <Image src={aviatorcloudlogo} alt="aviatorcloudlogo" w={"50px"} height={"50px"} borderRadius={"50%"} />
                            <Text color={"blue.800"} cursor={"pointer"} _hover={{ color: "#ffbe58" }} textAlign={"right"} mt={"20px"}>500 INR</Text>
                        </Flex>
                    </Flex>
                    <Flex bgColor={"gray.200"} direction={"column"} color={"red"} fontWeight={"semibold"} boxShadow={"0px 4px 8px rgba(0, 0, 0, 0.2)"} borderRadius={8} paddingBottom={"20px"} _hover={{ border: "1px solid #ffbe58" }} onClick={() => handleOpen("Aviator Exam Gold Plane -Aviator Cloud", 1200)}>
                        <Image src={goldImage} alt="goldImage" borderRadius={8} />
                        <Heading cursor={"pointer"} fontSize={"20px"} color={"black"} fontWeight={"bold"} p={"10px"} _hover={{ color: "#ffbe58" }}>Aviator Exam Gold Plan - Test + Preparation</Heading>
                        <Text p={"10px"} color={"gray"}>Join the Intermediate Program it is valid for 15 days</Text>
                        <Flex justify={"space-between"} p={"0px 20px 0px 20px"} fontWeight={"bold"}>
                            <Image src={aviatorcloudlogo} alt="aviatorcloudlogo" w={"50px"} height={"50px"} borderRadius={"50%"} />
                            <Text color={"blue.800"} cursor={"pointer"} _hover={{ color: "#ffbe58" }} textAlign={"right"} mt={"20px"}>1200 INR </Text>
                        </Flex>
                    </Flex>
                    <Flex bgColor={"gray.200"} direction={"column"} color={"red"} fontWeight={"semibold"} boxShadow={"0px 4px 8px rgba(0, 0, 0, 0.2)"} borderRadius={8} paddingBottom={"20px"} _hover={{ border: "1px solid #ffbe58" }} onClick={() => handleOpen("Aviator Exam Platinum Plane - Aviator Cloud", 2000)}>
                        <Image src={PlatinumImage} alt="PlatinumImage" borderRadius={8} />
                        <Heading cursor={"pointer"} fontSize={"20px"} color={"black"} fontWeight={"bold"} p={"10px"} _hover={{ color: "#ffbe58" }}>Aviator Exam Platinum Plan - Test + Preparation </Heading>
                        <Text p={"10px"} color={"gray"}>Join the special program it is valid for 1 month</Text>
                        <Flex justify={"space-between"} p={"0px 20px 0px 20px"} fontWeight={"bold"}>
                            <Image src={aviatorcloudlogo} alt="aviatorcloudlogo" w={"50px"} height={"50px"} borderRadius={"50%"} />
                            <Text color={"blue.800"} cursor={"pointer"} _hover={{ color: "#ffbe58" }} textAlign={"right"} mt={"20px"}>2000 INR</Text>
                        </Flex>
                    </Flex>
                </Box>
            </Box>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>User Info</ModalHeader>
                    <ModalBody>
                        <form onSubmit={handlePaymentChange}>
                            <FormControl id="fullname" mb={4}>
                                <FormLabel>Full Name</FormLabel>
                                <Input
                                    type="text"
                                    name="buyer_name"
                                    value={paymentInfo.buyer_name}
                                    onChange={handleEmailName}
                                />
                                {validationErrors.buyer_name && (
                                    <Text color="red" fontSize="sm">
                                        {validationErrors.buyer_name}
                                    </Text>
                                )}
                            </FormControl>
                            <FormControl id="mobileNumber" mb={4}>
                                <FormLabel>Mobile</FormLabel>
                                <Input
                                    type="tel"
                                    name="phone"
                                    value={paymentInfo.phone}
                                    onChange={handleEmailName}
                                    maxLength={10}
                                />
                                {validationErrors.phone && (
                                    <Text color="red" fontSize="sm">
                                        {validationErrors.phone}
                                    </Text>
                                )}
                            </FormControl>
                            <FormControl id="forgotPasswordEmail" mb={4}>
                                <FormLabel>Email</FormLabel>
                                <Input
                                    type="text"
                                    name="email"
                                    value={paymentInfo.email}
                                    onChange={handleEmailName}
                                />
                                {validationErrors.email && (
                                    <Text color="red" fontSize="sm">
                                        {validationErrors.email}
                                    </Text>
                                )}
                            </FormControl>
                            <Button type="submit" colorScheme="blue" width="100%" mb={6}>
                                Proceed for Payment
                            </Button>
                        </form>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="gray" mr={3} onClick={onClose}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

        </Box>
    );
}

export default PaymentCard;
