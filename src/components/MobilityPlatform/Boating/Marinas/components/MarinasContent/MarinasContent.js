import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Link } from '@mui/material';

const MarinasContent = ({
  classes, intl, name, berths,
}) => {
  const renderTypePrice = (price, berthType) => {
    const alvTax = 1.24;
    const fullPrice = price * alvTax;
    return (
      <>
        <Typography variant="body2" className={classes.margin}>
          <strong>
            {intl.formatMessage({ id: 'mobilityPlatform.content.marinas.typeTitle' })}
          </strong>
        </Typography>
        <Typography variant="body2" className={classes.margin}>
          {intl.formatMessage({ id: 'mobilityPlatform.content.marinas.type' })}
          :
          {' '}
          {berthType}
        </Typography>
        <Typography variant="body2" className={classes.margin}>
          {intl.formatMessage({ id: 'mobilityPlatform.content.marinas.price' })}
          :
          {' '}
          {Math.round(fullPrice)}
          {' '}
          €
        </Typography>
      </>
    );
  };

  const countVacant = (berthsData) => {
    let count = 0;
    berthsData.forEach((item) => {
      if (item.Varattavissa === 'Kylla - julkisesti') {
        count += 1;
      }
    });
    return `${intl.formatMessage({ id: 'mobilityPlatform.content.marinas.vacantSpaces' })}: ${count}`;
  };

  const renderWinterStorage = (berthsData) => {
    let count = 0;
    berthsData.forEach((item) => {
      if (item.Varaustyyppi === 'Soutuveneiden talvisäilytyspaikat' || item.Varaustyyppi === 'Talvisäilytyspaikat') {
        count += 1;
      }
    });
    return (
      <Typography variant="body2" className={classes.margin}>
        {intl.formatMessage({ id: 'mobilityPlatform.content.marinas.winterStorage' })}
        :
        {' '}
        {count}
      </Typography>
    );
  };

  const renderLink = () => (
    <Link target="_blank" href="https://opaskartta.turku.fi/ePermit/fi/Reservation/">
      <Typography className={classes.link} variant="body2">
        {intl.formatMessage({
          id: 'mobilityPlatform.info.marinas.link',
        })}
      </Typography>
    </Link>
  );

  return (
    <div className={classes.container}>
      <div className={classes.headerContainer}>
        <Typography variant="subtitle1">
          {name}
        </Typography>
      </div>
      <div className={classes.textContainer}>
        <Typography variant="body2" className={classes.margin}>
          {countVacant(berths)}
        </Typography>
        {name === 'Satama: Lauttaranta' ? renderWinterStorage(berths) : null}
        {renderTypePrice(berths[0].HintaAlv0, berths[0].Kohdetyyppi)}
        {renderLink()}
      </div>
    </div>
  );
};

MarinasContent.propTypes = {
  classes: PropTypes.objectOf(PropTypes.any).isRequired,
  intl: PropTypes.objectOf(PropTypes.any).isRequired,
  name: PropTypes.string,
  berths: PropTypes.arrayOf(PropTypes.any),
};

MarinasContent.defaultProps = {
  name: '',
  berths: [],
};

export default MarinasContent;
