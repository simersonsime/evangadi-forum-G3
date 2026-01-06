import axios from "axios";
import styles from "./Home.module.css";
import React, { useContext, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import AccountCircleTwoToneIcon from "@material-ui/icons/AccountCircleTwoTone";
import ArrowForwardIosTwoToneIcon from "@material-ui/icons/ArrowForwardIosTwoTone";

function Home() {
  const [userData, setUserData] = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userData.user) navigate("/login");

    const fetch = async () => {
      const response = await axios.get("http://localhost:4000/api/questions");

      setUserData({
        ...userData,
        questions: response.data.questions,
      });
    };
    fetch();
  }, [userData.user, navigate]);

  const handleClick = (item) => {
    setUserData({
      ...userData,
      singleQuestion: {
        post_id: item.post_id,
        question_id: item.question_id,
      },
    });
    navigate("/answer");
  };

  return (
    <div className={styles["home"]}>
      <hr />

      <div className={styles["home__top"]}>
        <div className={styles["home__qbtn"]}>
          <button className="mb-5">
            <Link to="/question">Ask Question</Link>
          </button>
        </div>

        <div className={styles["home__welcome"]}>
          <h6>Welcome: {userData.user?.display_name}</h6>
        </div>
      </div>

      <div className={styles["home__container"]}>
        <h3>Questions</h3>
        <hr className="mt-4" />

        {userData.questions?.map((item) => (
          <div key={item.question_id}>
            <div
              className={styles["home__questions"]}
              onClick={() => handleClick(item)}
            >
              <div>
                <AccountCircleTwoToneIcon style={{ fontSize: "60px" }} />
                <div className={`${styles["home__user"]} mx-3`}>
                  {item.user_name}
                </div>
              </div>

              <div className={styles["home__question"]}>{item.question}</div>

              <ArrowForwardIosTwoToneIcon
                className={`${styles["home__questionsArrow"]} mt-4`}
              />
            </div>
            <hr />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
