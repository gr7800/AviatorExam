import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Box, Flex, Heading } from '@chakra-ui/react';
import imageloading from '../utills/images/loading/imageloading.gif';
import DisplayQuestion from '../Components/DisplayQuestion';
import timerbg from "../utills/images/timer/timer.png"
import { General_Navigation, Radio_Navigation, Principles_of_Flight, Airframes_Powerplants_And_Eletrics, Performance, Instrumentation } from "../utills/data/Question"
import { Navigate, useLocation, useNavigate } from 'react-router-dom';

const PracticeTest = () => {
  const location = useLocation()
  const { subject } = location.state
  const isLoading = useSelector((store) => store.question.loading);
  const [questionsUser, setQuestionsUser] = useState([]);
  const [Question, setQuestion] = useState([]);
  const [elapsedTime, setElapsedTime] = useState(0);
  const totalTime = 1 * 60 * 60; // 2 hours in seconds
  const hours = Math.floor((totalTime - elapsedTime) / 3600);
  const minutes = Math.floor(((totalTime - elapsedTime) % 3600) / 60);
  const seconds = (totalTime - elapsedTime) % 60;
  const navigate = useNavigate();

  useEffect(() => {
    const intervalId = setInterval(() => {
      setElapsedTime(prevElapsedTime => prevElapsedTime + 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);
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

  useEffect(() => {
    console.log(Question)
    if (Question.length > 1) {
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
  }, [Question]);





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

  return (
    <Box>
      <Flex bg={"aqua"} p={"5px 25px 5px 25px"}>
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
      <DisplayQuestion questions={questionsUser} elapsedTime={elapsedTime} />
    </Box>
  )
};

export default PracticeTest;
