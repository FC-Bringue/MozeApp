import "../../../styles/settings/Parametres.css";
import Application from "./Application";

const Parametres = () => {
  return (
    <section id="parametres">
      <h4>PARAMETRES</h4>
      <h1>LE MACUMBA {/* Mettre un value pour le titre */}</h1>
      <div className="navigation">
        <div>
          <p>GENERAL</p>
        </div>
        <div>
          <p>APPLICATIONS</p>
        </div>
        <div className="param-nav-active">
          <p>SORTIE AUDIO</p>
        </div>
      </div>
      <Application />
    </section>
  );
};

export default Parametres;
