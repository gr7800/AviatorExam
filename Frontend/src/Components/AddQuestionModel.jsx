import { useState } from 'react';
import { Box, Button, Flex, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Textarea, useToast } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import imageloading from "../utills/images/loading/imageloading.gif"

let subjectdata = ['General Navigation', 'Radio Navigation', 'Principles of Flight', 'Instrumentation', 'Airframes Powerplants And Eletrics', 'Performance'];

const AddQuestionModal = ({ isOpen, onClose, onSubmit }) => {
  const [subject, setSubject] = useState('General Navigation');
  const [difficulty, setDifficulty] = useState('Easy');
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState([
    { text: '', correct: false },
    { text: '', correct: false },
    { text: '', correct: false },
    { text: '', correct: false }
  ]);
  const [correctAnswer, setCorrectAnswer] = useState('');

  const isLoading = useSelector((store) => store.question.loading);
  const toast = useToast();

  const handleSubjectChange = (event) => {
    setSubject(event.target.value);
  };

  const handleOptionChange = (index, event) => {
    const updatedOptions = [...options];
    updatedOptions[index].text = event.target.value;
    setOptions(updatedOptions);
  };

  const handleCorrectAnswerChange = (event) => {
    const correctOptionIndex = options.findIndex((option) => option.text === event.target.value);
    const updatedOptions = options.map((option, index) => ({
      ...option,
      correct: index === correctOptionIndex
    }));
    setOptions(updatedOptions);
    setCorrectAnswer(event.target.value);
  };

  const handleSubmit = () => {
    // Perform form validation
    if (subject === '' || difficulty === '' || question === '' || correctAnswer === '' || options.some((option) => option.text === '')) {
      toast({
        title: 'Incomplete Form',
        description: 'Please fill out all fields.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    // Continue with form submission
    const newQuestion = {
      subject,
      difficulty,
      question,
      options,
      correctAnswer,
    };
    onSubmit(newQuestion);
  };


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
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader color='blue.800' textShadow={'2px 2px 4px rgba(0, 0, 0, 0.5)'} transform={'perspective(500px) rotateX(0deg)'}>Add Question</ModalHeader>
        <ModalCloseButton color='blue.800' textShadow={'2px 2px 4px rgba(0, 0, 0, 0.5)'} transform={'perspective(500px) rotateX(0deg)'} />
        <ModalBody>
          <Flex direction="column" gap={4} >
            <Select value={subject} onChange={handleSubjectChange} bg={"gray.300"} _hover={{ bg: "white" }} cursor="pointer" color='blue.800' textShadow={'2px 2px 4px rgba(0, 0, 0, 0.5)'} transform={'perspective(500px) rotateX(0deg)'}>
              {subjectdata.map((subject) => (
                <option key={subject} value={subject} >
                  {subject}
                </option>
              ))}
            </Select>
            <Select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              bg="gray.300"
              _hover={{ bg: 'white' }}
              color="blue.800"
              textShadow="2px 2px 4px rgba(0, 0, 0, 0.5)"
              transform="perspective(500px) rotateX(0deg)"
            >
              <option value="">Select Difficulty</option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </Select>
            <Textarea placeholder="Question" bg={"gray.300"} _hover={{ bg: "white" }} value={question} onChange={(e) => setQuestion(e.target.value)} color='blue.800' textShadow={'2px 2px 4px rgba(0, 0, 0, 0.5)'} transform={'perspective(500px) rotateX(0deg)'} />
            {options.map((option, index) => (
              <Input key={index} placeholder={`Option ${index + 1}`} bg={"gray.300"} _hover={{ bg: "white" }} value={option.text} onChange={(e) => handleOptionChange(index, e)} color='blue.800' textShadow={'2px 2px 4px rgba(0, 0, 0, 0.5)'} transform={'perspective(500px) rotateX(0deg)'} />
            ))}
            <Input placeholder="Correct Answer" bg={"gray.300"} _hover={{ bg: "white" }} value={correctAnswer} onChange={handleCorrectAnswerChange} color='blue.800' textShadow={'2px 2px 4px rgba(0, 0, 0, 0.5)'} transform={'perspective(500px) rotateX(0deg)'} />
          </Flex>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" onClick={handleSubmit} color='blue.800' textShadow={'2px 2px 4px rgba(0, 0, 0, 0.5)'} transform={'perspective(500px) rotateX(0deg)'}>
            Submit
          </Button>
          <Button variant="ghost" onClick={onClose} color='blue.800' textShadow={'2px 2px 4px rgba(0, 0, 0, 0.5)'} transform={'perspective(500px) rotateX(0deg)'}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddQuestionModal;
