import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export function MedicineCard() {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component='img'
        alt='green iguana'
        height='140'
        image='/static/images/cards/contemplative-reptile.jpg'
      />
      <CardContent>
        <Typography gutterBottom variant='h5' component='div'>
          Medicine Title
        </Typography>
      </CardContent>
      <CardActions sx={{ alignSelf: 'flex-end' }}>
        <Button variant='outlined' size='small' sx={{ alignSelf: 'flex-end' }}>
          add to Cart
        </Button>
      </CardActions>
    </Card>
  );
}
