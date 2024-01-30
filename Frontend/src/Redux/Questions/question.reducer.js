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

const initialState = {
    questions: [],
    loading: false,
    error: false,
    errorMessage: ""
};

export const questionReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case FETCH_QUESTIONS_REQUEST: {
            return {
                ...state,
                loading: true,
                error: false
            };
        }
        case FETCH_QUESTIONS_SUCCESS: {
            return {
                ...state,
                questions: payload,
                loading: false,
                error: false
            };
        }
        case FETCH_QUESTIONS_ERROR: {
            return {
                ...state,
                loading: false,
                error: true,
                errorMessage: payload
            };
        }
        case ADD_QUESTION_REQUEST: {
            return {
                ...state,
                loading: true,
                error: false
            };
        }
        case ADD_QUESTION_SUCCESS: {
            return {
                ...state,
                questions: [...state.questions, payload],
                loading: false,
                error: false
            };
        }
        case ADD_QUESTION_ERROR: {
            return {
                ...state,
                loading: false,
                error: true,
                errorMessage: payload
            };
        }
        case UPDATE_QUESTION_REQUEST: {
            return {
                ...state,
                loading: true,
                error: false
            };
        }
        case UPDATE_QUESTION_SUCCESS: {
            const updatedQuestions = state.questions.map(question => {
                if (question._id === payload._id) {
                    return { ...question, ...payload };
                }
                return question;
            });

            return {
                ...state,
                questions: updatedQuestions,
                loading: false,
                error: false
            };
        }
        case UPDATE_QUESTION_ERROR: {
            return {
                ...state,
                loading: false,
                error: true,
                errorMessage: payload
            };
        }
        case DELETE_QUESTION_REQUEST: {
            return {
                ...state,
                loading: true,
                error: false
            };
        }
        case DELETE_QUESTION_SUCCESS: {
            const filteredQuestions = state.questions.filter(
                question => question._id !== payload
            );

            return {
                ...state,
                questions: filteredQuestions,
                loading: false,
                error: false
            };
        }
        case DELETE_QUESTION_ERROR: {
            return {
                ...state,
                loading: false,
                error: true,
                errorMessage: payload
            };
        }
        default: {
            return state;
        }
    }
};
