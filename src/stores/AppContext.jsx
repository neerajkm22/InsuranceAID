import React, { createContext, useReducer } from 'react';

// Initial state
const initialState = {
    isAuthenticated: false,
    userName: '',
    userEmail: '',
    userFirstName: '',
    aiName: 'AI',
    clearChat: false,
    showPreLoader: false,
    summaryText:{},
    userId: '',
    selectedHistoryResponse:[],
    updateHistory:false,
    activeSpeakerId: '',
    sessionTokenId: '',
    inactiveUserCount:0,
    roleId:0,
    roleName:'',
    userStatus:''
};

// Reducer function
const reducer = (state, action) => {
    switch (action.type) {
      case 'SET_ISAUTHENTICATED':
        return { ...state, isAuthenticated: action.payload };
      case 'SET_USERNAME':
        return { ...state, userName: action.payload };
      case 'SET_USER_EMAIL':
        return { ...state, userEmail: action.payload };
      case 'SET_USER_FIRST_NAME':
        return { ...state, userFirstName: action.payload };
      case 'SET_CLEARCHAT':
          return { ...state, clearChat: action.payload };
      case 'SET_SHOW_PRELOADER':
          return { ...state, showPreLoader: action.payload };
      case 'SET_SUMMARY_TEXT':
          return { ...state, summaryText: action.payload };
      case 'SET_USERID':
        return { ...state, userId: action.payload };    
      case 'SET_SELECTEDHISTORYREPSONSE':
        return { ...state, selectedHistoryResponse: action.payload };    
      case 'SET_UPDATEHISTORY':
        return { ...state, updateHistory: action.payload };
      case 'SET_ACTIVE_SPEAKER_ID':
        return { ...state, activeSpeakerId: action.payload };
      case 'SET_SESSION_TOKEN_ID':
        return { ...state, sessionTokenId: action.payload };
      case 'SET_INACTIVE_USER_COUNT':
        return { ...state, inactiveUserCount: action.payload };
      case 'SET_ROLE_ID':
          return { ...state, roleId: action.payload };
      case 'SET_ROLE_NAME':
            return { ...state, roleName: action.payload };
      case 'SET_USER_STATUS':
              return { ...state, userStatus: action.payload };
      default:
        return state;
    }
};

// Create a context
export const AppContext = createContext();

const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <AppContext.Provider value={{ state, dispatch }}>
            {children}
        </AppContext.Provider>
    )
}

export default AppProvider