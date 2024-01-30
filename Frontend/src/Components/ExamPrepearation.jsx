import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Box, Button, Checkbox, CheckboxGroup, Flex, Heading, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, Text, useToast } from '@chakra-ui/react';
import imageloading from '../utills/images/loading/imageloading.gif';
import { useNavigate } from 'react-router-dom';
import { fetchChatGptExplanation } from '../Redux/Questions/question.action';

const ExamPrepearation = () => {
  const Question = useSelector((store) => store.question.questions);
  const isLoading = useSelector((store) => store.question.loading);
  const speacial_access = useSelector((store) => store.auth.specialAccess);
  const isAuth = useSelector((store) => store.auth.isAuth);
  const [loading, setLoading] = useState(false);
  const [explanation, setExplanation] = useState('');
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [userOptions, setUserOptions] = useState([]);
  const navigate = useNavigate();
  const toast = useToast();

  const handleExplanationClick = async (question, answer) => {
    setLoading(true);

    // Make a request to the chat GPT API
    const response = await fetchChatGptExplanation(question, answer);
    console.log(response)
    setLoading(false);
    setExplanation(response);
  };

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

  if (!isAuth) {
    navigate("/login")
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
      {speacial_access ? (<Box>
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
      ) : (
        <Box padding={"20px"} color={"blue.800"}>
          <Heading>Your Payment Session expired please make payment and login again !</Heading>
          <Box w={"max-content"} m={"auto"} mt={"30px"} padding={"20px"} borderRadius={"15px"} bg={"aqua"} border={"2px dotted red"} display={"flex"} justifyContent={"center"}>
            <Button padding={"5px"} backgroundColor={"gray.200"} color={"blue.800"} onClick={() => navigate("/payment")} borderRadius={"md"} fontSize={"20px"} border={"2px solid blue.800"} shadow={"lg"}>Choose Plains !</Button>
          </Box>
        </Box>
      )}
    </Box>
  )
};

export default ExamPrepearation;
