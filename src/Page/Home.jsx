import { Container, Typography } from "@mui/material";
import Categories from "../component/Categories/Categories";
import Footer from '../component/Footer'
import Products from '../component/Products/Products'

export default function Home() {
  return (
    <Container sx={{ mt: 4 }}>
 

    
      <Categories />
      <Products/>
     
    </Container>
    
  );
}
