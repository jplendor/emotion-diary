import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DiaryStateContext } from "../App";

import DiaryEditor from "../components/DiaryEditor";

const Edit = () => {
    const [originData, setOriginData] = useState();
    const diaryList = useContext(DiaryStateContext);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const titleElem = document.getElementsByTagName("title")[0];
        titleElem.innerHTML = `감정 일기장 - ${id}번 일기 수정`;
    }, []);

    useEffect(() => {
        if (diaryList.length >= 1) {
            const targetDiary = diaryList.find(
                (item) => parseInt(item.id) === parseInt(id)
            );
            if (targetDiary) {
                setOriginData(targetDiary);
            } else {
                alert("없는 일기입니다.");
                navigate("/", { replace: true });
            }
        }
    }, [id, diaryList]);

    return (
        <div>
            {originData && (
                <DiaryEditor isEdit={true} originData={originData} />
            )}
        </div>
    );
};

export default Edit;
