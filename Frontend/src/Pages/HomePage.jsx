import { Box, Flex, Heading, Text, Image, Button, Link } from "@chakra-ui/react";
import React, { useEffect } from 'react'
import homebg from "../utills/images/home/homebg.jpg"
import homebgm from "../utills/images/home/homebg.png"
import homebg1 from "../utills/images/home/homebg1.jpg"
import homebg2 from "../utills/images/home/homebg2.jpg"
import homebg3 from "../utills/images/home/homebg3.jpg"
import homebg4 from "../utills/images/home/homebg4.jpg"
import CadetPilotPrep from "../utills/images/home/CadetPilotPrep.png"
import IGRUA from "../utills/images/home/IGRUA.png"
import A320 from "../utills/images/home/A320.png"
import E6 from "../utills/images/home/E6.png"
import AirlinePsychometric from "../utills/images/home/Airline Psychometric.png"
import aviatorntro from "../utills/images/home/aviatorntro.png"
import FuturePilotFoundationCourse from "../utills/images/home/FuturePilotFoundationCourse.png"
import INDIGOCADETPILOT from "../utills/images/home/INDIGOCADETPILOT.png"
import sms1 from "../utills/images/home/sms1.png"
import aviatorcloudlogo from "../utills/images/home/aviatorcloudlogo.jpg"
import onlinepilotexamp from "../utills/images/home/onlinepilotexamp.png"
import { useNavigate } from "react-router-dom";
const HomePage = () => {
    const user = JSON.parse(localStorage.getItem("afscore")) || {}
    const navigate = useNavigate()
    // const [score, setScore] = useState({})
    useEffect(() => {
        if (user.length === 0) {
            localStorage.setItem("afscore", JSON.stringify({
                "easy": 0,
                "medium": 0,
                "hard": 0,
            }))
        }
    }, []);


    return (
        <Box>
            <Flex
                direction="column"
                justifyContent="center"
                width="100%"
                height="100vh"
                bgImage={`linear-gradient(rgba(128, 0, 0, 1.7), rgba(255, 255, 0, 1.7)), url(${homebg})`}
                bgSize="fit"
                bgRepeat="no-repeat"
                bgPos="center"
                color="white"
                tabIndex={-1}
            >
                <Flex width="100%" direction={"column"} rowGap={"20px"} fontWeight={"bold"} display={"flex"} flexDirection={"column"} justifyContent={"center"} align={"center"} >
                    <Heading fontSize="40px" fontWeight={"semibold"} textShadow={'2px 2px 4px rgba(0, 0, 0, 0.5)'} transform={'perspective(500px) rotateX(0deg)'} >Pass your ATPL exams</Heading>
                    <Text fontSize="20px" fontWeight={"semibold"} textShadow={'2px 2px 4px rgba(0, 0, 0, 0.5)'} transform={'perspective(500px) rotateX(0deg)'}>with real exam-based questions</Text>
                    <Image src={homebgm} alt="homebgm" />
                </Flex>
            </Flex>
            <Flex direction={"column"} rowGap={"20px"} textAlign={"left"} padding={"5% 10% 5% 10%"} bgImage={`linear-gradient(rgba(255, 255, 0, 1.7),rgba(139, 0, 0, 1.7))`}
                bgSize="fit"
                bgRepeat="no-repeat"
                bgPos="center"
                color={"white"}>
                <Box>Welcome to Aviator Cloud, your one-stop solution for achieving your dream of becoming a pilot. We are dedicated to providing top-notch online courses that will prepare you for the different cadet pilot program entrance exams, pilot training, airline selection, and much more.</Box>
                <Box>Our team of experienced instructors and aviation experts have designed comprehensive courses that cover everything you need to know to succeed in the highly competitive world of aviation. From basic aviation knowledge to cadet pilot preparation, we've got you covered.</Box>
                <Box>Our courses are interactive, engaging, and tailored to suit your learning style. We understand that each student has unique needs, and we strive to provide personalized attention to help you achieve your goals. Our courses are available 24/7, so you can learn at your own pace and convenience.</Box>
                <Box>We are confident that our courses will equip you with the knowledge and skills you need to succeed in your pilot entrance exam. Our students have a high success rate in passing their exams, and many have gone on to become successful pilots with top airlines.</Box>
                <Box>Join the Aviator Cloud community today and take the first step towards achieving your dreams. Start your journey to becoming a pilot with us, and we'll be with you every step of the way.</Box>
                <Box display={"flex"} justifyContent={"center"}> <Button
                    bg="blue.900"
                    color="white"
                    boxShadow="0px 4px 6px rgba(0, 0, 0, 0.1)"
                    _hover={{ boxShadow: "0px 6px 8px rgba(0, 0, 0, 0.2)" }}
                    onClick={()=>navigate("/exam")}
                >
                    Free Test
                </Button></Box>
            </Flex>

            <Box w={"100%"} textAlign={"left"} color={"white"} display="flex" flexWrap="wrap">
                <Box w={"50%"} maxWidth="50%" padding="10px" boxShadow="0px 4px 8px rgba(0, 0, 0, 0.1)">
                    <Image src={homebg3} alt="homebg3" w={"100%"} />
                </Box>
                <Box w={"50%"} maxWidth="100%" padding="10px" boxShadow="0px 4px 8px rgba(0, 0, 0, 0.1)">
                    <Image src={homebg1} alt="homebg1" w={"100%"} />
                </Box>
                <Box w={"50%"} maxWidth="50%" padding="10px" boxShadow="0px 4px 8px rgba(0, 0, 0, 0.1)">
                    <Image src={homebg2} alt="homebg2" w={"100%"} />
                </Box>
                <Box w={"50%"} maxWidth="100%" padding="10px" boxShadow="0px 4px 8px rgba(0, 0, 0, 0.1)">
                    <Image src={homebg4} alt="homebg4" w={"100%"} />
                </Box>
            </Box>



            <Flex justifyContent={"center"} padding={"0%"}>
                <Image src={onlinepilotexamp} alt="onlineexamprep" />
            </Flex>
            <Flex direction={"column"} rowGap={"20px"} textAlign={"left"} padding={"0% 10% 5% 10%"}>
                <Box fontSize="40px" textAlign={"center"} fontWeight={"semibold"} textShadow={'2px 2px 4px rgba(0, 0, 0, 0.5)'} transform={'perspective(500px) rotateX(0deg)'}> You don't need to hesitate any longer<br></br> We offer up to 1600 questions absolutely for free</Box>
                <Flex w={"100%"} justifyContent={"center"}>
                    <Button bg="blue.900"
                        color="white"
                        boxShadow="0px 4px 6px rgba(0, 0, 0, 0.1)"
                        shadow={"dark-lg"}
                        _hover={{ boxShadow: "0px 6px 8px rgba(0, 0, 0, 0.2)", backgroundColor: "green" }} onClick={()=>navigate("/exam")}>TRY FOR FREE</Button>
                </Flex>
                <Box mt={"20px"} color={"gray"} textAlign={"center"} textShadow={"2xl"} fontSize={"20px"}>Check out <Link color={"blue.900"} href="https://aviatorcloud.com">AviatorCloud</Link> for more courses and features.</Box>

            </Flex >

        </Box>
    );
}

export default HomePage;
