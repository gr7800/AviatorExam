import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Checkbox,
  CheckboxGroup,
  Flex,
  Stack,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const answerquestion = new Array(50).fill("notAnswered");

const DisplayQuestion = ({ questions, elapsedTime }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [userOptions, setUserOptions] = useState(answerquestion);

  const navigate = useNavigate();

  const handleCheckboxChange = (values) => {
    setSelectedOptions(values);
    const updatedOptions = [...userOptions];
    updatedOptions[currentQuestionIndex] = values[values.length - 1];
    setUserOptions(updatedOptions);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOptions([]);
    } else {
      navigate('/result', { state: { userOptions: userOptions, questions: questions } }); // Replace '/result' with the actual route for the result page
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setSelectedOptions([]);
    }
  }

  useEffect(() => {
    if (elapsedTime >= 1 * 60 * 60) {
      // Timer is up, redirect to result page
      navigate('/result', { state: { userOptions: userOptions, questions: questions } }); // Replace '/result' with the actual route for the result page
    }
  }, [elapsedTime]);

  const currentQuestion = questions[currentQuestionIndex];



  return (
    <Flex
      direction={{ md: "row", base: "column" }}
      gap={"20px"}
      rowGap={"20px"}
      padding={"20px"}
    >
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
          {`Q. ${currentQuestionIndex + 1} - ${currentQuestion.question}`}
        </Box>
        <CheckboxGroup value={selectedOptions} onChange={handleCheckboxChange}>
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
            onClick={handlePreviousQuestion}
            disabled={selectedOptions.length === 0||currentQuestionIndex===0}
            color={"white"}
            _hover={{ bg: "blue", color: "red" }}
            fontWeight={"bold"}
            borderRadius={"15px"}
            boxShadow="0px 2px 4px rgba(0, 0, 0, 0.5)"
            w={"100px"}
          >
            {"Previous"}
          </Button>
          <Button
            mt={4}
            bgColor="blue.800"
            onClick={handleNextQuestion}
            disabled={selectedOptions.length === 0}
            color={"white"}
            _hover={{ bg: "blue", color: "red" }}
            fontWeight={"bold"}
            borderRadius={"15px"}
            w={"100px"}
            boxShadow="0px 2px 4px rgba(0, 0, 0, 0.5)"
          >
            {currentQuestionIndex === 49 ? "Submit" : "Next"}
          </Button>
        </Flex>
      </Box>

      {/* Question Boxes  */}
      <Box
        p={4}
        bg="white"
        boxShadow="lg"
        borderRadius="md"
        display="grid"
        gridTemplateColumns="repeat(auto-fit, minmax(30px, 1fr))"
        gap={2}
        bgColor={"gray.300"}
        flex={{ base: "1", md: "0.3" }}
      >
        {questions.map((el, index) => (
          <Box
            key={el.id}
            p={2}
            bgColor={
              userOptions[index] !== "notAnswered" ? "blue.800" : "gray.200"
            }
            boxShadow="sm"
            borderRadius="md"
            display="flex"
            alignItems="center"
            justifyContent="center"
            fontSize="sm"
            fontWeight="bold"
            color={
              userOptions[index] !== "notAnswered" ? "white" : "blue.800"
            }
            cursor={"pointer"}
            onClick={() => setCurrentQuestionIndex(index)}
          >
            {index + 1}
          </Box>
        ))}
      </Box>
    </Flex>
  );
};

export default DisplayQuestion;
