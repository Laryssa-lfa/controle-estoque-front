import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

let intervalId = null;

export default function Home() {
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    startTime();

    return () => {
      stopTime(intervalId);
    }
  }, []);

  function startTime() {
    if (intervalId) return;

    intervalId = setInterval(() => {
      const timeCurrent = new Date().toLocaleTimeString();
      setTime(timeCurrent);
    }, 1000);
  }

  function stopTime() {
    clearInterval(intervalId);
    intervalId = null;
  }

  return (
    <>
      <Header />
      <Container className="my-5">
        <h1>Página Inicial</h1>
        <Link to="/products">Acesse a página de produtos</Link>
      </Container>

      <Container className="my-5">
        <p>{time}</p>

        <Button onClick={startTime}>Iniciar</Button>
        <Button onClick={stopTime}>Parar</Button>
      </Container>
      <Footer />
    </>
  );
}
