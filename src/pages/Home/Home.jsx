import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      <Header />
      <Container className="py-5">
        <h1>Página Inicial</h1>
        <Link to="/products">Acesse a página de produtos</Link>
      </Container>
      <Footer />
    </>
  );
}
