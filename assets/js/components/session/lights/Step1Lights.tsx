import applogo from "../../../../img/logos/mozeyeelightcontrol.png";

const Step1Lights = () => {
  return (
    <>
      <p className="stp1P">
        Merci de télecharger et d'installer l'application Moze Yeelight Control
        (windows uniquement)
      </p>
      <div>
        <img src={applogo} alt="" />
      </div>

      <div className="btn">TÉLÉCHARGER</div>
      <p className="stp1P">
        Une fois installé, vous pouvez cliquer sur suivant.
      </p>
    </>
  );
};

export default Step1Lights;
