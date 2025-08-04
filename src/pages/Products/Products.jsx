import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import api from "../../api/api";
import { useAuth } from "../../context/AuthContext";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row, Table } from "react-bootstrap";

function tableProducts(listProducts) {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nome</th>
          <th>Quantidade</th>
          <th>Preço</th>
        </tr>
      </thead>
      <tbody>
        {listProducts.map(prod => (
          <tr key={prod.id}>
            <td>{prod.id}</td>
            <td>{prod.nome}</td>
            <td>{prod.quantidade}</td>
            <td>R$ {prod.preco}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

const nomeValid = {
  required: {
    value: true,
    message: "Preencha o nome do produto."
  },
  maxLength: {
    value: 20,
    message: "O nome do produto deve ter no máximo 20 caracteres."
  }
}

const quantValid = {
  required: {
    value: true,
    message: "Preencha a quantidade de produtos."
  },
  min: {
    value: 1,
    message: "Quantidade minima de 1."
  }
}

const precoValid = {
  required: {
    value: true,
    message: "Preencha o preço do produtos."
  },
  min: {
    value: 0.0001,
    message: "O preço do produto não pode ser menor ou igual a 0."
  }
}

export default function Products() {
  const [listProducts, setListProducts] = useState([]);
  const [saving, setSaving] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  async function onSubmit(dados) {
    setSaving(true);
    try {
      await api.post("/produtos", dados);
      reset();
      buscarProdutos();
    } catch (error) {
      window.alert("Houve um erro.");
      console.error(error);
    }
    setSaving(false);
  }

  async function buscarProdutos() {
    try {
      const response = await api.get("/produtos");
      setListProducts(response.data);
    } catch (error) {
      window.alert("Houve um erro.");
      console.error(error);
    }
  }

  useEffect(async () => { buscarProdutos() }, []);

  if (!isAuthenticated) {
    return navigate("/login");
  }

  return (
    <>
      <Header />
      <Container className="py-5">
        <h1>Produtos</h1>

        <Form noValidate onSubmit={handleSubmit(onSubmit)}>
          <Row className="mb-3">
            <Form.Group as={Col} md="12" controlId="nome">
              <Form.Label>Nome do Produto</Form.Label>
              <Form.Control type="text" isInvalid={!!errors.nome} {...register("nome", nomeValid)} />
              <Form.Control.Feedback type="invalid">
                {errors.nome?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} md="6" controlId="quantidade">
              <Form.Label>Quantidade</Form.Label>
              <Form.Control type="number" isInvalid={!!errors.quantidade} {...register("quantidade", quantValid)} />
              <Form.Control.Feedback type="invalid">
                {errors.quantidade?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} md="6" controlId="preco">
              <Form.Label>Preço</Form.Label>
              <Form.Control type="number" isInvalid={!!errors.preco} {...register("preco", precoValid)} />
              <Form.Control.Feedback type="invalid">
                {errors.preco?.message}
              </Form.Control.Feedback>
            </Form.Group>
          </Row>

          <Button type="submit" disabled={saving}>
            {saving ? "Cadastrando..." : "Cadastrar"}
          </Button>
        </Form>
      </Container>

      <Container className="py-5">
        <h1>Lista de Produtos</h1>
        {
          listProducts.length > 0
            ? tableProducts(listProducts)
            : <h4 className="pt-3">Nenhum produto disponível no momento.</h4>
        }
      </Container>
      <Footer />
    </>
  );
}
