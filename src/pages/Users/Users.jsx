import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { Container } from "react-bootstrap";

export default function Users() {
  return (
    <>
      <Header />
      <Container className="py-5">
        <h1>Página de Usuários</h1>
      </Container>
      <Footer />
    </>
  );
}
