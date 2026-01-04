import React from "react";
import classes from "./Footer.module.css";
import { Link } from "react-router-dom";
// import logo from "../../image/evangadi-logo-footer.png";

function Footer() {
  return (
    <div className={`${classes["footer"]} d-lg-flex`}>
      <div className={`${classes["footer__left"]} mx-sm-5`}>
        <div className={classes["footer__logo"]}>
          {/* <img src={logo} alt="" /> */}
        </div>

        <div className={`${classes["footer__socialMedias"]} col-sm-12`}>
          <div className={`${classes["footer__facebook"]} mx-2`}>
            <Link to="https://www.facebook.com/Evangaditech">
              <i class="fa-brands fa-facebook" target="_blank"></i>
            </Link>
          </div>

          <div className={`${classes["footer__instagram"]} mx-3`}>
            <Link to="https://www.instagram.com/evangaditech/">
              <i class="fa-brands fa-instagram"></i>
            </Link>
          </div>

          <div className={classes["footer__youtube"]}>
            <Link to="https://www.youtube.com/c/evangaditech">
              <i class="fa-brands fa-youtube"></i>
            </Link>
          </div>
        </div>
      </div>

      <div className={`${classes["footer__middle"]} mx-sm-5`}>
        <div className={classes["footer__info"]}>Useful Link</div>
        <div className={classes["footer__infoText"]}>
          <div className="mb-2">How it works</div>
          <div className="mb-2">Terms of Service</div>
          <div className="mb-2">Privecy Policy</div>
        </div>
      </div>

      <div className={`${classes["footer__right"]} mx-sm-5`}>
        <div className={classes["footer__info"]}>Contact Info</div>
        <div className={classes["footer__infoText"]}>
          <div className="mb-2">Evangadi Network</div>
          <div className="mb-2">support@evangadi.com</div>
          <div className="mb-2">+1-202-386-2702</div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
