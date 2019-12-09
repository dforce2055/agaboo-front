import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardContent,
  Grid,
  Typography,
  Avatar,
  LinearProgress
} from '@material-ui/core';
import InsertChartIcon from '@material-ui/icons/InsertChartOutlined';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%'
  },
  content: {
    alignItems: 'center',
    display: 'flex'
  },
  title: {
    fontWeight: 700
  },
  avatar: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    height: 56,
    width: 56
  },
  icon: {
    height: 32,
    width: 32
  },
  progress: {
    marginTop: theme.spacing(1)
  }
}));



const TotalProgress = props => {
  const { className, ...rest } = props;
  const {values} = props;

  const classes = useStyles();

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardContent>
        <Grid
          container
          display="row"
          justify="space-between"
          alignItems="baseline"
        >
          <Grid item>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
              variant="h5"
            >
              Porcentaje de dinero sin cobrar
            </Typography>
            <Typography variant="h4">{values}%</Typography>
          </Grid>
          <Grid item>
          </Grid>
        </Grid>
        <LinearProgress
          className={classes.progress}
          value={values}
          variant="determinate"
        />
      </CardContent>
    </Card>
  );
};

TotalProgress.propTypes = {
  className: PropTypes.string
};

export default TotalProgress;