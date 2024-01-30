import React, { useState } from 'react';
import { Box, Button, Flex, Heading, Text, useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux"
import { fetchQuestions } from '../Redux/Questions/question.action';

let leveldata = ['ATPL(A)', 'CPL (A)'];
let subjectdata = ['General Navigation', 'Radio Navigation', 'Principles of Flight', 'Instrumentation', 'Airframes Powerplants And Eletrics', 'Performance'];

const ChooseTest = () => {
  const [level, setLevel] = useState("");
  const [subject, setSubject] = useState("");

  const toast = useToast();
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const handleLevelChange = (selectedLevel) => {
    setLevel(selectedLevel);
  };

  const handleSubjectChange = (selectedSubject) => {
    setSubject(selectedSubject);
  };

  const handleSpecialTest = () => {
    if (level && subject) {
      dispatch(fetchQuestions(subject));
      navigate("/payment", { state: { path:"/exam/special"} });
    } else {
      toast({
        title: "Please select Exam level and subject first!",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "top",
        variant: "left-accent",
        backgroundColor: "red",
        color: "white",
      });
    }
  };

  const handlePracticeTest = () => {
    if (level && subject) {
      dispatch(fetchQuestions(subject));
      navigate("/exam/practice", { state: { subject } });
    } else {
      toast({
        title: "Please select Exam level and subject first!",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "top",
        variant: "left-accent",
        backgroundColor: "red",
        color: "white",
      });
    }
  };

  const handleDemoPrepairation = () => {
    if (level && subject) {
      navigate("/exam/demo/prepaire", { state: { subject } });
    } else {
      toast({
        title: "Please select Exam level and subject first!",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "top",
        variant: "left-accent",
        backgroundColor: "red",
        color: "white",
      });
    }
  }

  const handleGeneralTest = () => {
    if (level && subject) {
      dispatch(fetchQuestions(subject));
      navigate("/payment", { state: { path:"/exam/prepaire" } });
    } else {
      toast({
        title: "Please select Exam level and subject first!",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "top",
        variant: "left-accent",
        backgroundColor: "red",
        color: "white",
      });
    }
  };

  return (
    <Box mb={"50px"}>
      <Flex bg={"aqua"} p={"5px 25px 5px 25px"}>
        <Heading fontSize="40px" fontWeight={"semibold"} textShadow={'2px 2px 4px rgba(0, 0, 0, 0.5)'} transform={'perspective(500px) rotateX(0deg)'} cursor={'pointer'} >{'<'}</Heading>
        <Heading fontSize="40px" fontWeight={"semibold"} textShadow={'2px 2px 4px rgba(0, 0, 0, 0.5)'} transform={'perspective(500px) rotateX(0deg)'} >General Test</Heading>
      </Flex>
      <Flex direction={'column'} justifyContent={"center"}>
        <Heading fontSize="25px" fontWeight={"semibold"} textShadow={'2px 2px 4px rgba(0, 0, 0, 0.5)'} transform={'perspective(500px) rotateX(0deg)'} cursor={'pointer'} >Select Question Bank</Heading>
        <Flex
          justify={"space-evenly"}
          direction={{ base: "column", md: "row" }}
          wrap={{ base: "nowrap", md: "wrap" }}
          m={"5px"}
        >
          {level === "" && (<Flex
            direction={"column"}
            bgColor={"lightgray"}
            p={"20px"}
            h={{ base: "400px", md: "auto" }}
            mb={{ base: "20px", md: "0" }}
            borderRadius={"15px"}
            boxShadow="0px 2px 4px rgba(0, 0, 0, 0.5)"
          >
            <Heading
              fontSize="25px"
              fontWeight={"semibold"}
              textShadow={"2px 2px 4px rgba(0, 0, 0, 0.5)"}
              transform={"perspective(500px) rotateX(0deg)"}
              cursor={"pointer"}
            >
              Choose Exam Level
            </Heading>
            <Box h={"250px"} display={"flex"} flexDirection={"column"} overflow={"scroll"} overflowX={"hidden"} overflowY={"-moz-initial"}>
              {leveldata.map((levelItem) => (
                <Button
                  key={levelItem}
                  onClick={() => handleLevelChange(levelItem)}
                  variant={level === levelItem ? "solid" : "outline"}
                  m={1}
                  bg={level === levelItem ? "aqua" : "blue.800"}
                  color={level === levelItem ? "blue.800" : "white"}
                  p={"5px"}
                  fontWeight={"bold"}
                  _hover={{ color: "blue.800", bg: "white" }}
                >
                  {levelItem}
                </Button>
              ))}
            </Box>
          </Flex>)}
          {level.length > 2 && subject === "" && (
            <Flex
              direction={"column"}
              bgColor={"lightgray"}
              p={"20px"}
              h={{ base: "400px", md: "auto" }}
              mb={{ base: "20px", md: "0" }}
              borderRadius={"15px"}
              boxShadow="0px 2px 4px rgba(0, 0, 0, 0.5)"
            >
              <Heading
                fontSize="25px"
                fontWeight={"semibold"}
                textShadow={"2px 2px 4px rgba(0, 0, 0, 0.5)"}
                transform={"perspective(500px) rotateX(0deg)"}
                cursor={"pointer"}
              >
                Choose Subject
              </Heading>
              <Box h={"250px"} display={"flex"} flexDirection={"column"} overflow={"scroll"} overflowX={"hidden"} overflowY={"-moz-initial"}>
                {subjectdata.map((subjectItem) => (
                  <Button
                    key={subjectItem}
                    onClick={() => handleSubjectChange(subjectItem)}
                    variant={subject === subjectItem ? "solid" : "outline"}
                    m={1}
                    bg={subject === subjectItem ? "aqua" : "blue.800"}
                    color={subject === subjectItem ? "blue.800" : "white"}
                    fontWeight={"bold"}
                    p={"5px"}
                    _hover={{ color: "blue.800", bg: "white" }}
                  >
                    {subjectItem}
                  </Button>
                ))}
              </Box>
            </Flex>
          )}
        </Flex>

        {level.length > 2 && subject.length > 2 && (
          <Box
            p="20px"
            display={{ base: "block", md: "grid" }}
            gridTemplateColumns="repeat(auto-fit, minmax(300px, 1fr))"
            gap={{ base: "20px", md: "40px" }}/* Adjust the gap as needed */
          >
            <Box
              bg="aqua"
              padding={"20px"}
              borderRadius="15px"
              width="100%" /* Equal width for all boxes */
              textAlign="left" /* Center the content horizontally */
              boxShadow="0px 2px 4px rgba(0, 0, 0, 0.5)" /* Add shadow effect */
            >
              <Button
                onClick={handlePracticeTest}
                bg="green.500"
                color="white"
                _hover={{ bg: "teal.300", color: "blue.800" }}
                fontWeight="bold"
                borderRadius="15px"
                width={{ base: "100%", md: "200px" }}
                my="10px"
                mx={{ base: "0px", md: "10px" }}
              >
                Demo Test
              </Button>
              <Text
                fontWeight="semibold"
                textShadow="2px 2px 4px rgba(0, 0, 0, 0.5)"
                transform="perspective(500px) rotateX(0deg)"
              >
                Please note that this demo test only consists of 200 questions and is specifically designed for General Navigation purposes. If you're interested in accessing more questions, kindly consider opting for our Paid Plans. Thank you!
              </Text>
            </Box>

            <Box
              bg="aqua"
              padding={"20px"}
              borderRadius="15px"
              width="100%" /* Equal width for all boxes */
              textAlign="left" /* Center the content horizontally */
              boxShadow="0px 2px 4px rgba(0, 0, 0, 0.5)" /* Add shadow effect */
            >
              <Button
                onClick={handleDemoPrepairation}
                bg="green.500"
                color="white"
                _hover={{ bg: "teal.300", color: "blue.800" }}
                fontWeight="bold"
                borderRadius="15px"
                width={{ base: "100%", md: "200px" }}
                my="10px"
                mx={{ base: "0px", md: "10px" }}
              >
                Demo Preparation
              </Button>
              <Text
                fontWeight="semibold"
                textShadow="2px 2px 4px rgba(0, 0, 0, 0.5)"
                transform="perspective(500px) rotateX(0deg)"
              >
                Please note that this demo preparation only consists of 200 questions and is specifically designed for General Navigation purposes. If you're interested in accessing more questions, kindly consider opting for our Paid Plans. Thank you!
              </Text>
            </Box>

            <Box
              bg="aqua"
              padding={"20px"}
              borderRadius="15px"
              width="100%" /* Equal width for all boxes */
              textAlign="left" /* Center the content horizontally */
              boxShadow="0px 2px 4px rgba(0, 0, 0, 0.5)" /* Add shadow effect */
            >
              <Button
                onClick={handleGeneralTest}
                bg="green.500"
                color="white"
                _hover={{ bg: "teal.300", color: "blue.800" }}
                fontWeight="bold"
                borderRadius="15px"
                width={{ base: "100%", md: "200px" }}
                my="10px"
                mx={{ base: "0px", md: "10px" }}
              >
                Paid Preparation
              </Button>
              <Text
                fontWeight="semibold"
                textShadow="2px 2px 4px rgba(0, 0, 0, 0.5)"
                transform="perspective(500px) rotateX(0deg)"
              >
                Please note that this paid test has unlimited questions and is specifically designed for each exam and subject. Additionally, you will receive 100+ new questions for preparation each time. Thank you!
              </Text>
            </Box>

            <Box
              bg="aqua"
              padding={"20px"}
              borderRadius="15px"
              width="100%" /* Equal width for all boxes */
              textAlign="left" /* Center the content horizontally */
              boxShadow="0px 2px 4px rgba(0, 0, 0, 0.5)" /* Add shadow effect */
            >
              <Button
                onClick={handleSpecialTest}
                bg="green.500"
                color="white"
                _hover={{ bg: "teal.300", color: "blue.800" }}
                fontWeight="bold"
                borderRadius="15px"
                width={{ base: "100%", md: "200px" }}
                my="10px"
                mx={{ base: "0px", md: "10px" }}
              >
                Paid Test
              </Button>
              <Text
                fontWeight="semibold"
                textShadow="2px 2px 4px rgba(0, 0, 0, 0.5)"
                transform="perspective(500px) rotateX(0deg)"
              >
                Please note that this paid test has unlimited questions and is specifically designed for each exam and subject. Additionally, you will receive 50 new questions for the test each time. Thank you!
              </Text>
            </Box>
          </Box>

        )}
      </Flex>
    </Box>
  );
};

export default ChooseTest;
