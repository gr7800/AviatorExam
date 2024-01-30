import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Box, Button, Flex, Heading, useToast } from '@chakra-ui/react';
import imageloading from '../utills/images/loading/imageloading.gif';
import DisplayQuestion from '../Components/DisplayQuestion';
import timerbg from "../utills/images/timer/timer.png"
import { Navigate, useLocation, useNavigate } from 'react-router-dom';

const SpecialTest = () => {

  const location = useLocation()
  const Question = useSelector((store) => store.question.questions);
  const isLoading = useSelector((store) => store.question.loading);
  const isAuth = useSelector((store) => store.auth.isAuth);
  const speacial_access = useSelector((store) => store.auth.specialAccess);
  const [questionsUser, setQuestionsUser] = useState([]);
  const [elapsedTime, setElapsedTime] = useState(0);
  const totalTime = 2 * 60 * 60; // 2 hours in seconds
  const hours = Math.floor((totalTime - elapsedTime) / 3600);
  const minutes = Math.floor(((totalTime - elapsedTime) % 3600) / 60);
  const seconds = (totalTime - elapsedTime) % 60;
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    const intervalId = setInterval(() => {
      setElapsedTime(prevElapsedTime => prevElapsedTime + 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      const selectRandomQuestions = () => {
        const randomIndexes = [];
        while (randomIndexes.length < 50) {
          const randomIndex = Math.floor(Math.random() * Question.length);
          if (!randomIndexes.includes(randomIndex)) {
            randomIndexes.push(randomIndex);
          }
        }
        const randomQuestions = randomIndexes.map(index => Question[index]);
        setQuestionsUser(randomQuestions);
      };

      selectRandomQuestions();
    }
  }, [isLoading, Question]);

  if (isLoading || questionsUser.length !== 50) {
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

  if (!isAuth) {
    navigate("/login")
  }




  return (
    <Box>
      {speacial_access ? (
        <Box><Flex bg={"aqua"} p={"5px 25px 5px 25px"}>
          <Flex display={{ base: "none", md: "flex" }} >
            <Heading fontSize="40px" fontWeight={"semibold"} textShadow={'2px 2px 4px rgba(0, 0, 0, 0.5)'} transform={'perspective(500px) rotateX(0deg)'} cursor={'pointer'} >{'<'}</Heading>
            <Heading fontSize="40px" fontWeight={"semibold"} textShadow={'2px 2px 4px rgba(0, 0, 0, 0.5)'} transform={'perspective(500px) rotateX(0deg)'} >Test Started</Heading>
          </Flex>
          <Box fontSize={"20px"} fontWeight={"bold"} bgImage={timerbg} bgSize={"cover"} width={"148px"} display={"flex"} h={"50px"} m={"20px"} textAlign={"center"} justifyContent={"center"} p={"10px"} margin={"auto"}>
            <text>
              {hours < 10 ? `0${hours}` : hours}:{minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds}
            </text>
          </Box>
        </Flex>
          <DisplayQuestion questions={questionsUser} elapsedTime={elapsedTime} /></Box>
      ) : <Box padding={"20px"} color={"blue.800"}>
        <Heading>Your Payment Session expired please make payment and login again !</Heading>
        <Box w={"max-content"} m={"auto"} mt={"30px"} padding={"20px"} borderRadius={"15px"} bg={"aqua"} border={"2px dotted red"} display={"flex"} justifyContent={"center"}>
          <Button padding={"5px"} backgroundColor={"gray.200"} color={"blue.800"} onClick={() => navigate("/payment")} borderRadius={"md"} fontSize={"20px"} border={"2px solid blue.800"} shadow={"lg"}>Choose Plains !</Button>
        </Box>
      </Box>}
    </Box>
  )
};

export default SpecialTest;
