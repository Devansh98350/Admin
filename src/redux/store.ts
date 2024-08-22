
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import profileReducer from './slices/profileSlice';
import boardReducer from './slices/boardSlice';
import classReducer from './slices/classSlice';
import subjectReducer from './slices/subjectSlice';
import chapterReducer from './slices/chapterSlice';
import chapterContentReducer from './slices/chapterContentSlice';
import testReducer from './slices/testSlice';
import testResultReducer from './slices/testResultSlice';
import certificateReducer from './slices/certificateSlice';
import languageReducer from './slices/languageSlice';
import countryReducer from './slices/countrySlice';
import stateReducer from './slices/stateSlice';
import chapterProgressReducer from './slices/chapterProgressSlice';
import topicProgressReducer from './slices/topicProgressSlice';
import userProgressReducer from './slices/userProgressSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    profile: profileReducer,
    board: boardReducer,
    class: classReducer,
    subject: subjectReducer,
    chapter: chapterReducer,
    chapterContent: chapterContentReducer,
    test: testReducer,
    testResult: testResultReducer,
    certificate: certificateReducer,
    language: languageReducer,
    country: countryReducer,
    state: stateReducer,
    chapterProgress: chapterProgressReducer,
    topicProgress: topicProgressReducer,
    userProgress: userProgressReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
