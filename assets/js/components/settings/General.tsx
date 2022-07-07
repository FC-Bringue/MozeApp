import "../../../styles/settings/General.css";

const General = () => {
    return (
        <section id="general">
            <form className="generalLog">
                <div>
                    <p>Nom</p>
                    <input 
                        type="text"
                        placeholder="Nom"
                    />
                    <a>E-mail</a>
                    <input 
                        type="email"
                        placeholder="Mail"
                    />
                    <button className="btn">Appliquer</button>
                </div>
            </form>
            <form className="generalReinit">
                <div>
                    <a>Réinitialiser l'adresse mail</a>
                    <input 
                        type="text"
                    />
                    <a>Confirmation</a>
                    <input 
                        type="email"
                    />
                    <a>Réinitialiser le mot de passe</a>
                    <input 
                        type="text"
                    />
                    <a>Confirmation</a>
                    <input 
                        type="email"
                    />
                    <button className="btn">Confirmer</button>
                </div>
            </form>
        </section>
    )
}

export default General;