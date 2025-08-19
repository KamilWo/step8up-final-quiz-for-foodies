import "./Footer.css";

function Footer() {
  return (
    <footer>
      <div>© {new Date().getFullYear()} Taste Trivia</div>
      <div>
        <a href="/privacy">Privacy</a> | <a href="/terms">Terms</a>
      </div>
      <div>
        Powered by{" "}
        <a href="#" target="_blank" rel="noopener noreferrer">
          Front End Inc
        </a>
      </div>
    </footer>
  );
}

export default Footer;
