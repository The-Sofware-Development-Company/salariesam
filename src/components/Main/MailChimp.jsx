import { useState } from "react";
import { useTranslation } from "react-i18next";

const MailChimp = () => {
  const [email, setEmail] = useState("");

  function handleEmailChange(event) {
    setEmail(event.target.value);
  }
  const { t } = useTranslation();
  return (
    <>
      <div id="mc_embed_signup">
        <form
          action="https://salaries.us21.list-manage.com/subscribe/post?u=315f6b6ab7621788452a27aff&amp;id=69622839ba&amp;f_id=00bfb5e1f0"
          method="post"
          id="mc-embedded-subscribe-form"
          name="mc-embedded-subscribe-form"
          className="validate"
          target="_blank"
          novalidate
        >
          <div id="mc_embed_signup_scroll">
            <h2>
              {t(
                "Receive an email when new salary reports are available. Not more than once per week."
              )}
            </h2>
            <div className="indicates-required">
              <span className="asterisk">*</span> {t("indicates required")}
            </div>
            <div className="mc-field-group">
              <label for="mce-EMAIL">
                {t("Email Address")} <span className="asterisk">*</span>
              </label>
              <input
                type="email"
                value={email}
                name="EMAIL"
                className="required email"
                id="mce-EMAIL"
                required
                onChange={handleEmailChange}
              />

              <span id="mce-EMAIL-HELPERTEXT" className="helper_text"></span>
            </div>
            <div id="mce-responses" className="clear foot">
              <div
                className="response"
                id="mce-error-response"
                style={{ display: "none" }}
              ></div>
              <div
                className="response"
                id="mce-success-response"
                style={{ display: "none" }}
              ></div>
            </div>
            <div
              style={{ position: "absolute", left: "-5000px" }}
              aria-hidden="true"
            >
              <input
                type="text"
                name="b_315f6b6ab7621788452a27aff_69622839ba"
                tabindex="-1"
                value=""
              />
            </div>
            <div className="optionalParent">
              <div className="clear foot">
                <input
                  type="submit"
                  value={t("subscribe")}
                  name="subscribe"
                  id="mc-embedded-subscribe"
                  className="button"
                />
                <p className="brandingLogo">
                  <a
                    href="http://eepurl.com/ip7iH2"
                    title="Mailchimp - email marketing made easy and fun"
                  >
                    <img src="https://eep.io/mc-cdn-images/template_images/branding_logo_text_dark_dtp.svg" />
                  </a>
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default MailChimp;
