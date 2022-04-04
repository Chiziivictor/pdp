import styled from "styled-components";
import { MdAdd, MdRemove } from "react-icons/md";
import { useEffect, useState } from "react";
import swal from "sweetalert";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  min-height: 90vh;
`;

const Footer = styled.footer`
  opacity: 0.5;
`;
const Wrapper = styled.div`
  display: flex;
  padding: 50px;
  padding-bottom: 20px;
  display: flex;
  @media (max-width: 768px) {
    padding: 10px;
    flex-direction: column;
  }
`;
const ImgContainer = styled.div`
  flex: 1;
`;
const Image = styled.img`
  width: 100%;
  height: 80vh;
  object-fit: contain;
  @media (max-width: 768px) {
    height: 40vh;
  }
`;
const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
  @media (max-width: 768px) {
    flex: 2;
    align-items: center;
  }
`;
const Title = styled.h1``;
const Desc = styled.p`
  margin: 20px 0;
  font-weight: 200;
`;
const Price = styled.span`
  font-weight: 300;
  font-size: 20px;
`;

const SKUContainer = styled.div`
  width: 50%;
  margin: 30px 0px;
  font-weight: 100;
`;

const AddContainer = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 16px;
  @media (max-width: 768px) {
    width: auto;
    justify-content: flex-start;
  }
`;

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
`;

const Remove = styled.button`
  background: none;
  border: none;
  font-size: 16px;
`;
const Add = styled.button`
  background: none;
  border: none;
  font-size: 16px;
`;

const Amount = styled.span`
  font-size: 14px;
  width: 30px;
  height: 30px;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 12px;
`;

const Button = styled.button`
  margin-left: 10%;
  padding: 14px;
  border: 1px solid teal;
  background-color: white;
  cursor: pointer;
  font-weight: 400;
  &:hover {
    background-color: teal;
    color: white;
  }
`;

const Product = () => {
  const [count, setCount] = useState(1);
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);

  const addCart = () => {
    return swal("Item added to Cart");
  };

  const random = Math.floor(Math.random() * 20 + 1);

  useEffect(() => {
    setLoading(true);
    const getProduct = async () => {
      const response = await fetch(
        `https://fakestoreapi.com/products/${random}`
      );
      setProduct(await response.json());
      setLoading(false);
    };
    getProduct();
  }, []);

  return (
    <Container>
      {loading ? (
        <Title style={{ marginTop: "20%" }}>Loading....</Title>
      ) : (
        <Wrapper>
          <ImgContainer>
            <Image src={product.image} />
          </ImgContainer>
          <InfoContainer>
            <Title>{product.title}</Title>
            <Desc>{product.description}</Desc>
            <Price>$ {product.price}</Price>
            <AddContainer>
              <AmountContainer>
                <Remove
                  onClick={() => setCount(count - 1)}
                  disabled={count === 1}
                >
                  <MdRemove />
                </Remove>
                <Amount>{count}</Amount>
                <Add>
                  <MdAdd onClick={() => setCount(count + 1)} />
                </Add>
              </AmountContainer>
              <Button onClick={() => addCart()}>ADD TO CART</Button>
            </AddContainer>
            <SKUContainer>SKU [ 000SKU123</SKUContainer>
          </InfoContainer>
        </Wrapper>
      )}
      <Footer className="text-center text-muted">
        {" "}
        © {new Date().getFullYear()} Chizi Victor
      </Footer>
    </Container>
  );
};

export default Product;
