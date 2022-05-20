import { useEffect } from "react";

import DiaryEditor from "../components/DiaryEditor";

const New = () => {
    useEffect(() => {
        const titleElem = document.getElementsByTagName("title")[0];
        titleElem.innerHTML = "감정 일기장 - 새 일기";
    }, []);

    return <DiaryEditor />;
};

export default New;
