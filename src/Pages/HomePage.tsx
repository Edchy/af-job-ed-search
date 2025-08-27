import "./HomePage.css";
import { Link } from "react-router";

export default function HomePage() {
  return (
    <>
      <div className="bg-homepage">
        <section className="section-bg-color">
          <h3>Sök efter ditt nästa karriärssteg:</h3>
          <div className="btn-group">
            <button className="btn-homepage">
              <Link to="/utbildningar">Hitta Utbildning</Link>
            </button>
            <button className="btn-homepage">
              <Link to="/utbildningar">Hitta Jobb</Link>
            </button>
          </div>
        </section>
      </div>
    </>
  );
}
