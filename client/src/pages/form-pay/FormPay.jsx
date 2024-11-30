import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Stack,
  Heading,
  Divider,
  useToast,
} from "@chakra-ui/react";
import { useFormAuth } from "../../hooks/useFormAuth";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useCart } from "../../context/CartProvider";

const initial = {
  fullName: "",
  address: "",
  city: "",
  pais: "",
  zipCode: "",
  cardNumber: "",
  expiryDate: "",
  cvv: "",
};
export const FormPay = () => {
  const { id } = useParams();
  const { fields, handlerChange, validateErrors } = useFormAuth(initial);
  const toast = useToast();
  const navigate = useNavigate();
  const { buyProduct, carrito } = useCart();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateErrors()) {
      return toast({
        title: "error",
        description: "todos los campos son obligatorios",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
    buyProduct(id);
  };

  useEffect(() => {
    const productPay = carrito.find((product) => product._id === id);
    if (!productPay) {
      navigate("/");
    }
  }, [id]);

  return (
    <Box
      maxW="500px"
      mx="auto"
      mt={10}
      p={5}
      boxShadow="md"
      borderRadius="md"
      bg="white"
    >
      <Heading as="h2" size="lg" mb={5} textAlign="center">
        Formulario de Pago
      </Heading>
      <form onSubmit={handleSubmit}>
        <Stack spacing={4}>
          <FormControl>
            <FormLabel>Nombre Completo</FormLabel>
            <Input
              name="fullName"
              placeholder="Tu nombre completo"
              value={fields.fullName}
              onChange={handlerChange}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Dirección</FormLabel>
            <Input
              name="address"
              placeholder="Dirección completa"
              value={fields.address}
              onChange={handlerChange}
            />
          </FormControl>

          <Stack direction={["column", "row"]} spacing={4}>
            <FormControl>
              <FormLabel>Pais</FormLabel>
              <Input
                name="pais"
                placeholder="Pais"
                value={fields.pais}
                onChange={handlerChange}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Ciudad</FormLabel>
              <Input
                name="city"
                placeholder="Ciudad"
                value={fields.city}
                onChange={handlerChange}
              />
            </FormControl>
          </Stack>

          <FormControl>
            <FormLabel>Código Postal</FormLabel>
            <Input
              name="zipCode"
              placeholder="Código postal"
              value={fields.zipCode}
              onChange={handlerChange}
            />
          </FormControl>

          <Divider />

          <Heading as="h3" size="md" mt={4}>
            Información de la Tarjeta
          </Heading>

          <FormControl>
            <FormLabel>Número de Tarjeta</FormLabel>
            <Input
              name="cardNumber"
              placeholder="1234 5678 9012 3456"
              value={fields.cardNumber}
              onChange={handlerChange}
            />
          </FormControl>

          <Stack direction={["column", "row"]} spacing={4}>
            <FormControl>
              <FormLabel>Fecha de Expiración</FormLabel>
              <Input
                name="expiryDate"
                placeholder="MM/AA"
                value={fields.expiryDate}
                onChange={handlerChange}
              />
            </FormControl>

            <FormControl>
              <FormLabel>CVV</FormLabel>
              <Input
                name="cvv"
                placeholder="123"
                value={fields.cvv}
                onChange={handlerChange}
              />
            </FormControl>
          </Stack>

          <Button colorScheme="teal" size="lg" type="submit" mt={4}>
            Procesar Pago
          </Button>
        </Stack>
      </form>
    </Box>
  );
};
