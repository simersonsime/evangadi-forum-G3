import classes from "./About.module.css";
import personImg from "./person.png";

const About = () => {
  return (
    <section className={classes.about}>
      <div className={classes.content}>
        <span className={classes.label}>About</span>
        <h1>Evangadi Networks</h1>

        <p>
          No matter what stage of life you are in, whether you’re just starting
          elementary school or being promoted to CEO of a Fortune 500 company,
          you have much to offer to those who are trying to follow in your footsteps.
        </p>

        <p>
          Whether you are willing to share knowledge or you are just looking to
          meet mentors of your own, please start by joining the network here.
        </p>

        <button className={classes.btn}>HOW IT WORKS</button>
      </div>

      <div className={classes.image}>
        <img src={personImg} alt="About Evangadi" />
      </div>
    </section>
  );
};

export default About;
