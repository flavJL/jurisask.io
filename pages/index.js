import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [animalInput, setAnimalInput] = useState("");
  const [result, setResult] = useState();

  async function onSubmit(event) {
    event.preventDefault();
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ animal: animalInput }),
    });
    const data = await response.json();
    setResult(data.result);
    setAnimalInput("");
  }

  return (
    <div>
      <Head>
        <title>OpenAI Quickstart</title>
        <link rel="icon" href="/icone.png" />
      </Head>

      <main className={styles.main}>
        <img src="/icone.png" className={styles.icon} />
        <h3>JurisAsk.io</h3>
        <h4>Générer des idées de problématique et de plan pour vos copies, automatiquement</h4>
        <p>Un outil créé par <a href ="https://jurislogic.fr/">JurisLogic.fr</a>, la plateforme la plus complète pour réussir tes études de droit 🤓</p>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="animal"
            placeholder="Entrer le sujet de ta dissertation (ou autre devoir)"
            value={animalInput}
            onChange={(e) => setAnimalInput(e.target.value)}
          />
          <input type="submit" value="Génerer des idées" />
        </form>
        <div><p className={styles.result}>{result}</p></div>
      </main>
    </div>
  );
}