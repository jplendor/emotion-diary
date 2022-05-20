import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { DiaryStateContext } from "../App";

import MyButton from "../components/MyButton";
import MyHeader from "../components/MyHeader";

import { getStringDate } from "../utils/date";
import { emotionList } from "../utils/emotion";

const Diary = () => {
    const { id } = useParams();
    const diaryList = useContext(DiaryStateContext);
    const navigate = useNavigate();
    const [data, setData] = useState();

    useEffect(() => {
        if (diaryList.length >= 1) {
            const targetDiary = diaryList.find(
                (item) => parseInt(item.id) === parseInt(id)
            );

            if (targetDiary) {
                setData(targetDiary);
            } else {
                alert("없는 일기입니다.");
                navigate("/", { replace: true });
            }
        }
    }, [id, diaryList]);

    if (!data) {
        return <div className="DiaryPage">로딩중입니다...</div>;
    } else {
        const curEmotionData = emotionList.find(
            (item) => parseInt(item.emotion_id) === parseInt(data.emotion)
        );
        console.log(curEmotionData);

        return (
            <div className="DiaryPage">
                <MyHeader
                    headerText={`${getStringDate(new Date(data.date))} 기록`}
                    leftChild={
                        <MyButton
                            text={"< 뒤로가기"}
                            onClick={() => {
                                navigate(-1);
                            }}
                        />
                    }
                    rightChild={
                        <MyButton
                            text={"수정하기"}
                            onClick={() => {
                                navigate(`/edit/${data.id}`);
                            }}
                        />
                    }
                />
                <article>
                    <section>
                        <h4>오늘의 감정</h4>
                        <div
                            className={[
                                "diary_img_wrapper",
                                `diary_img_wrapper_${curEmotionData.emotion_id}`,
                            ].join(" ")}
                        >
                            <img
                                src={curEmotionData.emotion_img}
                                alt="감정 이미지"
                            />
                            <div className="emotion_descript">
                                {curEmotionData.emotion_descript}
                            </div>
                        </div>
                    </section>
                    <section>
                        <h4>오늘의 일기</h4>
                        <div className="diary_content_wrapper">
                            <p>{data.content}</p>
                        </div>
                    </section>
                </article>
            </div>
        );
    }
};

export default Diary;
