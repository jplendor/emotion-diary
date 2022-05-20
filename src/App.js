import React, { useEffect, useReducer, useRef } from "react";

import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import New from "./pages/New";
import Edit from "./pages/Edit";
import Diary from "./pages/Diary";

const reducer = (state, action) => {
    let newState = [];
    switch (action.type) {
        case "INIT": {
            return action.data;
        }
        case "CREATE": {
            newState = [action.data, ...state];
            break;
        }
        case "REMOVE": {
            newState = state.filter((item) => item.id !== action.targetId);
            break;
        }
        case "EDIT": {
            newState = state.map((item) =>
                item.id === action.targetId ? action.data : item
            );
            break;
        }
        default:
            return state;
    }
    localStorage.setItem("diary", JSON.stringify(newState));
    return newState;
};

export const DiaryStateContext = React.createContext();
export const DiaryDispatchContext = React.createContext();

function App() {
    const [data, dispatch] = useReducer(reducer, []);
    // const [state, dispatch] = useReducer(reducer, state의 초기 값)
    // dispatch : 액션을 발생시키는 함수
    // reducer : 현재 상태와 액션 객체를 파라미터로 받아와서 새로운 상태를 반환해주는 함수

    const dataId = useRef(6);

    // CREATE
    const onCreate = (date, content, emotion) => {
        dispatch({
            type: "CREATE",
            data: {
                id: dataId.current,
                date: new Date(date).getTime(),
                content,
                emotion,
            },
        });
        dataId.current += 1;
    };
    // REMOVE
    const onRemove = (targetId) => {
        dispatch({ type: "REMOVE", targetId });
    };
    // EDIT
    const onEdit = (targetId, date, content, emotion) => {
        dispatch({
            type: "EDIT",
            targetId,
            data: {
                id: targetId,
                date: new Date(date).getTime(),
                content,
                emotion,
            },
        });
    };

    useEffect(() => {
        const localData = localStorage.getItem("diary");
        if (localData) {
            const diaryList = JSON.parse(localData).sort(
                (a, b) => parseInt(b.id) - parseInt(a.id)
            );
            if (diaryList.length >= 1) {
                dataId.current = parseInt(diaryList[0].id) + 1;
                dispatch({ type: "INIT", data: diaryList });
            }
        }
    }, []);

    return (
        <DiaryStateContext.Provider value={data}>
            <DiaryDispatchContext.Provider
                value={{ onCreate, onRemove, onEdit }}
            >
                <div className="App">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/new" element={<New />} />
                        <Route path="/edit/:id" element={<Edit />} />
                        <Route path="/diary/:id" element={<Diary />} />
                    </Routes>
                </div>
            </DiaryDispatchContext.Provider>
        </DiaryStateContext.Provider>
    );
}

export default App;
