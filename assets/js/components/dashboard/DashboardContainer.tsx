import "../../../styles/dashboard/resume.scss";

const DashboardContainer = () => {
  return (
    <section id="resume">
      <h4>Nom du bar</h4>
      <h1>Nom session en cours</h1>
      <section className="session-list">
        <div className="playlistDetails"></div>
        <div className="lights_events">
          <div className="lights"></div>
          {/*  <div className="events"></div> */}
        </div>
      </section>
    </section>
  );
};

export default DashboardContainer;
