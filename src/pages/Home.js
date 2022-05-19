import { useState } from "react";

import MyHeader from "../components/MyHeader";
import MyButton from "../components/MyButton";

const Home = () => {
    const [curDate, setCurDate] = useState(new Date());
    const headerText = `${curDate.getFullYear()}년 ${curDate.getMonth() + 1}월`;

    const decreaseMonth = () => {
        setCurDate(
            new Date(
                curDate.getFullYear(),
                curDate.getMonth() - 1,
                curDate.getDate()
            )
        );
    };

    const increaseMonth = () => {
        setCurDate(
            new Date(
                curDate.getFullYear(),
                curDate.getMonth() + 1,
                curDate.getDate()
            )
        );
    };

    return (
        <div>
            <MyHeader
                headerText={headerText}
                leftChild={<MyButton text={"<"} onClick={decreaseMonth} />}
                rightChild={<MyButton text={">"} onClick={increaseMonth} />}
            />
        </div>
    );
};

export default Home;
