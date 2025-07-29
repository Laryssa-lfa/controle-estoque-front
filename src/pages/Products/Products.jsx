import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { Container } from "react-bootstrap";

export default function Products() {
  return (
    <>
      <Header />
      <Container className="py-5">
        <h1>Lista de Produtos</h1>
      </Container>
      <Footer />
    </>
  );
}
