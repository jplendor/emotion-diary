import DiaryItem from "./DiaryItem";

const DiaryList = ({ diaryList }) => {
    return (
        <div>
            {diaryList.map((item) => (
                <DiaryItem key={item.id} {...item} />
            ))}
        </div>
    );
};

DiaryList.defaultProps = {
    diaryList: [],
};

export default DiaryList;
