import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Box, Button, Checkbox, CheckboxGroup, Flex, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, Text, useToast } from '@chakra-ui/react';
import imageloading from '../utills/images/loading/imageloading.gif';
import { useLocation } from 'react-router-dom';
import { fetchChatGptExplanation } from '../Redux/Questions/question.action';
import { General_Navigation, Radio_Navigation, Principles_of_Flight, Airframes_Powerplants_And_Eletrics, Performance, Instrumentation } from "../utills/data/Question"

const DemoPreparation = () => {
  const isLoading = useSelector((store) => store.question.loading);
  const [loading, setLoading] = useState(false);
  const location = useLocation()
  const { subject } = location.state
  const [Question, setQuestion] = useState([]);
  const [explanation, setExplanation] = useState('');
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [userOptions, setUserOptions] = useState([]);
  const toast = useToast();

  const handleExplanationClick = async (question, answer) => {
    setLoading(true);

    // Make a request to the chat GPT API
    const response = await fetchChatGptExplanation(question, answer);
    console.log(response)
    setLoading(false);
    setExplanation(response);
  };
  useEffect(() => {
    const replacedsubject = subject.replace(/ /g, "_")
    if (replacedsubject === "General_Navigation") {
      setQuestion(General_Navigation);
    }
    if (replacedsubject === "Radio_Navigation") {
      setQuestion(Radio_Navigation)
    }
    if (replacedsubject === "Principles_of_Flight") {
      setQuestion(Principles_of_Flight);
    }
    if (replacedsubject === "Airframes_Powerplants_And_Eletrics") {
      setQuestion(Airframes_Powerplants_And_Eletrics);
    }
    if (replacedsubject === "Performance") {
      setQuestion(Performance)
    }
    if (replacedsubject === "Instrumentation") {
      setQuestion(Instrumentation)
    }
    console.log(Question)
  }, [])
  const handleCheckboxChange = (values, index, correctAnswer) => {
    setSelectedOptions(values);
    const updatedOptions = [...userOptions];
    updatedOptions[index] = values[values.length - 1];
    setUserOptions(updatedOptions);

    if (values[values.length - 1] === correctAnswer) {
      toast({
        title: "Correct Answer",
        description: "You are right😊",
        status: "success", // You can use "success", "info", "warning", or "error"
        duration: 3000, // Duration in milliseconds
        isClosable: true,
        position: "top-right"
      })
      return
    }
    if (values[values.length - 1] != correctAnswer) {
      toast({
        title: "Wrong Answer",
        description: "You are Wrong",
        status: "error", // You can use "success", "info", "warning", or "error"
        duration: 3000, // Duration in milliseconds
        isClosable: true,
        position: "top-right"
      })
      return
    }
  };

  useEffect(() => {
    let answerQuestion = new Array(50).fill("notAnswered")
    setUserOptions(answerQuestion)
  }, [Question])


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
      {Question && Question.length > 1 && Question.map((currentQuestion, index) => (
        <Box
          p={4}
          bg="white"
          boxShadow="lg"
          borderRadius="md"
          bgColor={"gray.300"}
          color={"blue.800"}
          flex={{ base: "1", md: "0.7" }}
        >
          <Box
            fontSize="lg"
            mb={4}
            textAlign={"left"}
            fontWeight={"semibold"}
            textShadow={"2px 2px 4px rgba(0, 0, 0, 0.5)"}
            transform={"perspective(500px) rotateX(0deg)"}
          >
            {`Q. ${index + 1} - ${currentQuestion.question}`}
          </Box>
          <CheckboxGroup value={selectedOptions} onChange={(value) => handleCheckboxChange(value, index, currentQuestion.correctAnswer)}>
            <Stack spacing={4}>
              {currentQuestion.options.map((option, index) => (
                <Checkbox
                  key={index}
                  value={option.text}
                  colorScheme="facebook"
                  isChecked={selectedOptions.includes(option.text)}
                >
                  {option.text}
                </Checkbox>
              ))}
            </Stack>
          </CheckboxGroup>
          <Flex justifyContent={"space-evenly"}>
            <Button
              mt={4}
              bgColor="blue.800"
              onClick={() => handleExplanationClick(currentQuestion.question, currentQuestion.correctAnswer)}
              color={"white"}
              _hover={{ bg: "blue", color: "red" }}
              fontWeight={"bold"}
              borderRadius={"15px"}
              boxShadow="0px 2px 4px rgba(0, 0, 0, 0.5)"
              w={"200px"}
            >
              {"See Explanation"}
            </Button>
          </Flex>
        </Box>
      ))}
      <Modal isOpen={loading} onClose={() => setLoading(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalBody display="flex" alignItems="center" justifyContent="center">
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              bg="blue.800"
              w={"100%"}
              borderRadius={"15px"}
            >
              <img src={imageloading} alt="Loading" />
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>

      <Modal isOpen={explanation !== ''} onClose={() => setExplanation('')} >
        <ModalOverlay />
        <ModalContent bg={"gray.300"} color={"red"} fontWeight={"semibold"}>
          <ModalHeader fontWeight={"semibold"} textShadow={'2px 2px 4px rgba(0, 0, 0, 0.5)'} transform={'perspective(500px) rotateX(0deg)'} color={"blue.800"} >Explanation</ModalHeader>
          <ModalBody>
            <Text>{explanation}</Text>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={() => setExplanation('')}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

    </Box>
  )
};

export default DemoPreparation;
