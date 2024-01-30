import {
  ADD_QUESTION_ERROR,
  ADD_QUESTION_REQUEST,
  ADD_QUESTION_SUCCESS,
  DELETE_QUESTION_ERROR,
  DELETE_QUESTION_REQUEST,
  DELETE_QUESTION_SUCCESS,
  FETCH_QUESTIONS_ERROR,
  FETCH_QUESTIONS_REQUEST,
  FETCH_QUESTIONS_SUCCESS,
  UPDATE_QUESTION_ERROR,
  UPDATE_QUESTION_REQUEST,
  UPDATE_QUESTION_SUCCESS
} from "./question.type";
import axios from "axios"

import { QBaseUrl, OPENAI_API_KEY } from "../../utills/helper"
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export const fetchChatGptExplanation = async (question, answer) => {
  let object = {
    model: "text-davinci-003",
    prompt: `${question}\n\n:Correct answer :- ${answer}. \n : Explain it in details?`,
    temperature: 1,
    max_tokens: 256,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    // stop: ["\n"],
  }
  const response = await openai.createCompletion(object);

  return(response.data.choices[0].text);
};


// Example of fetchQuestions action
export const fetchQuestions = (subject) => async (dispatch) => {
  dispatch({ type: FETCH_QUESTIONS_REQUEST });
  let url = `${QBaseUrl}/questions`
  if(subject!='All Subjects'){
    url=`${QBaseUrl}/questions?subject=${subject}`
  }
  try {
    // Perform API request or database query to fetch questions
    const response = await axios.get(url);
    const questions = response.data;
    dispatch({ type: FETCH_QUESTIONS_SUCCESS, payload: questions });
  } catch (error) {
    dispatch({ type: FETCH_QUESTIONS_ERROR, payload: error.message });
  }
};

// Example of addQuestion action
export const addQuestion = (question) => async (dispatch) => {
  dispatch({ type: ADD_QUESTION_REQUEST });
  try {
    // Perform API request or database query to add question
    const response = await axios.post(`${QBaseUrl}/questions`, question);
    const addedQuestion = response.data;

    dispatch({ type: ADD_QUESTION_SUCCESS, payload: addedQuestion });
  } catch (error) {
    dispatch({ type: ADD_QUESTION_ERROR, payload: error.message });
  }
};

// Example of updateQuestion action
export const updateQuestion = (question,id) => async (dispatch) => {
  dispatch({ type: UPDATE_QUESTION_REQUEST });
  try {
    // Perform API request or database query to update question
    const response = await axios.put(`${QBaseUrl}/questions/${id}`, question);
    const updatedQuestion = response.data;
    console.log(response);
    dispatch({ type: UPDATE_QUESTION_SUCCESS, payload: updatedQuestion });
    return response.status
  } catch (error) {
    dispatch({ type: UPDATE_QUESTION_ERROR, payload: error.message });
  }
};

// Example of deleteQuestion action
export const deleteQuestion = (questionId) => async (dispatch) => {
  dispatch({ type: DELETE_QUESTION_REQUEST });
  try {
    // Perform API request or database query to delete question
    let res= await axios.delete(`${QBaseUrl}/questions/${questionId}`);

    // Simulating deleting a question from an API
    dispatch({ type: DELETE_QUESTION_SUCCESS, payload: questionId });
    return res;
  } catch (error) {
    dispatch({ type: DELETE_QUESTION_ERROR, payload: error.message });
  }
};






