// import Image from "next/image";
'use client'
import { Container, Typography } from "@mui/material";

export default function Home() {
  return (
  <Container maxWidth="lg">
    <Typography variant="h1" align="center" sx={{marginBottom: '1vh'}}>
      Welcome to TOASTIES!
    </Typography>
    <Typography variant="body1" className="bodytext">
      The Trash Or Academic Singles Tournament Interface for Entering Scores (TOASTIES) is a website that facilitates the smooth running of a Buttered Toast or similarly formatted tournament. For any questions or issues with this product, please contact Will Hoover - williamhoover36@gmail.com.
    </Typography>
    <Typography variant="h3" align='center' sx={{marginTop: '3vh'}}>
      Getting Started
    </Typography>
  </Container>
  );
}
