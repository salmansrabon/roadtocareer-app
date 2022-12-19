import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { createWrapper, HYDRATE } from "next-redux-wrapper";
import { nextReduxCookieMiddleware, wrapMakeStore } from "next-redux-cookie-wrapper";
import {
  user,
  course,
  dashboard,
  studentApi,
  courseApi,
  paymentApi,
  modulesApi,
  packageApi,
  resetPasseordApi,
  assignmentApi,
  quizApi,
  teachersApi,
} from "./";

const middlewares = [
  studentApi.middleware,
  courseApi.middleware,
  paymentApi.middleware,
  packageApi.middleware,
  modulesApi.middleware,
  resetPasseordApi.middleware,
  assignmentApi.middleware,
  quizApi.middleware,
  teachersApi.middleware,
];

if (process.env.NODE_ENV === `development`) {
  const { logger } = require(`redux-logger`);
  middlewares.push(logger);
}

const rootReducer = combineReducers({
  userReducer: user.reducer,
  courseReducer: course.reducer,
  dashboardReducer: dashboard.reducer,
  [studentApi.reducerPath]: studentApi.reducer,
  [packageApi.reducerPath]: packageApi.reducer,
  [paymentApi.reducerPath]: paymentApi.reducer,
  [modulesApi.reducerPath]: modulesApi.reducer,
  [courseApi.reducerPath]: courseApi.reducer,
  [resetPasseordApi.reducerPath]: resetPasseordApi.reducer,
  [assignmentApi.reducerPath]: assignmentApi.reducer,
  [quizApi.reducerPath]: quizApi.reducer,
  [teachersApi.reducerPath]: teachersApi.reducer,
});

const masterReducer = (state, action) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state,
      ...action.payload,
    };
    return rootReducer(nextState, action);
  }
  return rootReducer(state, action);
};

const makeStore = wrapMakeStore(() =>
  configureStore({
    reducer: masterReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware()
        .prepend(
          nextReduxCookieMiddleware({
            subtrees: [
              "userReducer.token",
              "userReducer.isAuthenticated",
              "dashboardReducer.isDashboardOpen",
            ],
          })
        )
        .concat(...middlewares),
  })
);

export const wrapper = createWrapper(makeStore);
