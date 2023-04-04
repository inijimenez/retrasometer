import React from 'react';
import {
  Box,
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material';

const TrainList = ({ trains }) => {
  return (
    <Container maxWidth="sm">
      <Box my={4}>
        <Typography variant="h5" component="h2" align="center" gutterBottom>
          Trenes encontrados
        </Typography>
        <List>
          {trains.map((train, index) => (
            <React.Fragment key={train.cdgoTren}>
              <ListItem>
                <ListItemText
                  primary={`${train.linea} - ${train.destination}`}
                  secondary={`Retraso: ${train.delay} minutos`}
                />
              </ListItem>
              {index < trains.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </List>
      </Box>
    </Container>
  );
};

export default TrainList;
