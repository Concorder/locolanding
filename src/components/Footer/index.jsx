import React from "react";
import "./style.scss";

export default function Footer() {
  return (
    <footer className="footer" data-scroll-section data-scroll-persistent aria-labelledby="contact-title">
      <div className="footer__intro">
        <p className="footer__eyebrow">The brewery & taproom</p>
        <h2 id="contact-title">Stay for<br /><span>another round.</span></h2>
        <p className="footer__welcome">Drop by for a beer, bring a few friends, or get in touch about stocking Burgbräu.</p>
      </div>
      <div className="footer__details">
        <div className="footer__detail">
          <h3>Find us</h3>
          <address>Burgbräu Brauhaus<br />Hopfengasse 18<br />80331 München, Germany</address>
        </div>
        <div className="footer__detail">
          <h3>Say hello</h3>
          <a href="mailto:hello@burgbraeu.example">hello@burgbraeu.example</a>
          <p>For visits, events & general enquiries</p>
          <a href="mailto:trade@burgbraeu.example">trade@burgbraeu.example</a>
          <p>For bars, shops & restaurants</p>
        </div>
        <div className="footer__detail footer__hours">
          <h3>Taproom hours</h3>
          <dl>
            <div><dt>Wednesday – Friday</dt><dd>16:00 – 22:00</dd></div>
            <div><dt>Saturday</dt><dd>12:00 – 23:00</dd></div>
            <div><dt>Sunday</dt><dd>12:00 – 20:00</dd></div>
            <div><dt>Monday & Tuesday</dt><dd>Closed</dd></div>
          </dl>
        </div>
      </div>
      <div className="footer__endnote">
        <span className="footer__wordmark">Burgbräu</span>
        <p>Fictional brewery concept. Address, opening hours and contacts are illustrative.</p>
        <span>© {new Date().getFullYear()} Burgbräu</span>
      </div>
    </footer>
  );
}
