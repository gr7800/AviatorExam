import { Box, Button, Flex, Heading, Text, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, Spinner } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { fetchChatGptExplanation } from "../Redux/Questions/question.action"
import imageloading from "../utills/images/loading/imageloading.gif"
const Result = () => {
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(false);
  const [explanation, setExplanation] = useState('');
  const location = useLocation();
  const { userOptions, questions } = location.state || {};

  useEffect(() => {
    let temp = 0;
    questions.forEach((el, index) => {
      if (el.correctAnswer === userOptions[index]) {
        temp++;
      }
    });
    setScore(temp);
  }, [questions, userOptions])

  const handleExplanationClick = async (question, answer) => {
    setLoading(true);

    // Make a request to the chat GPT API
    const response = await fetchChatGptExplanation(question, answer);
    console.log(response)
    setLoading(false);
    setExplanation(response);
  };

  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/")
  }

  return (
    <>
      <Box display={"flex"} flexDirection={"column"} gap={"5px"} margin={"auto"} bg="gray.200" alignContent={"center"}  >
        <Flex display={{ base: "block", md: "flex" }} bgColor={"aqua"} justifyContent={"space-between"} p={"0px 20px 0px 20px"} >
          <Flex>
            <Heading fontSize="40px" fontWeight={"semibold"} textShadow={'2px 2px 4px rgba(0, 0, 0, 0.5)'} transform={'perspective(500px) rotateX(0deg)'} cursor={'pointer'} >{'<'}</Heading>
            <Heading fontSize="40px" fontWeight={"semibold"} textShadow={'2px 2px 4px rgba(0, 0, 0, 0.5)'} transform={'perspective(500px) rotateX(0deg)'} >Result</Heading>
          </Flex>
          <Flex>
            <Heading fontSize="40px" fontWeight={"semibold"} textShadow={'2px 2px 4px rgba(0, 0, 0, 0.5)'} transform={'perspective(500px) rotateX(0deg)'} cursor={'pointer'} >{'Your Score:-'}</Heading>
            <Heading fontSize="40px" fontWeight={"semibold"} textShadow={'2px 2px 4px rgba(0, 0, 0, 0.5)'} transform={'perspective(500px) rotateX(0deg)'} >{score}</Heading>
          </Flex>
        </Flex>

        <Box bg={"aqua"} p={"20px"} fontSize={"20px"} color={"black"} display={"grid"} gridTemplateColumns="repeat(auto-fit, minmax(1, 1fr))" rowGap={"20px"}>
          {questions.map((el, index) => (
            <Box
              fontWeight={'semibold'}
              bgColor={"aqua"}
              padding={"20px"}
              bg={"gray.300"}
              borderRadius={"15px"}
            >
              <Text
                textAlign={"left"}
                fontWeight={"semibold"}
                textShadow={"2px 2px 4px rgba(0, 0, 0, 0.5)"}
                transform={"perspective(500px) rotateX(0deg)"}
              >{`Q. ${index + 1} - ${el.question}`} </Text>
              <Flex display={{ base: "block", md: "flex" }} justifyContent={"space-between"} >
                <Text color={"green"} textAlign={"left"}>
                  {`Correct answer :- ${el.correctAnswer}`}
                </Text>
                <Text textAlign={"left"} color={(el.correctAnswer === userOptions[index]) ? "green" : "red"}>
                  {`Your answer :- ${userOptions[index]}`}
                </Text>
                <Button
                  bg="red"
                  color="white"
                  fontWeight="bold"
                  borderRadius="15px"
                  _hover={{ bg: "aqua", color: "blue.800" }}
                  w="200px"
                  boxShadow="0px 2px 4px rgba(0, 0, 0, 0.5)"
                  onClick={() => handleExplanationClick(el.question, el.correctAnswer)}
                >
                  See Explanation
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
        <Box bg={"aqua"} p={"5px"} fontSize={"20px"} color={"black"}>
          <Button bg={"red"} color={"white"} _hover={{ bg: "white", color: "black" }} onClick={handleClick}>Retake Test</Button>
        </Box>
      </Box>
    </>
  );
};

export default Result
