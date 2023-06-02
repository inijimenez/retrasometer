import React from 'react';
import { Container, Typography, Grid, Box } from "@mui/material";

function Header() {
  return (
   <Container>
      <Typography variant="h3" component="h1" align="center" gutterBottom>
        Retrasometer
      </Typography>
      <Typography variant="subtitle1" align="center" gutterBottom>
        Versión: 1.0.0
      </Typography>
    </Container>
  );
}

export default Header;