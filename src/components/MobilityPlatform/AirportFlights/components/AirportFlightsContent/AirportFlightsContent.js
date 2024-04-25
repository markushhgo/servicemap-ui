import React from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import { Typography } from '@mui/material';
import { css } from '@emotion/css';
import { format } from 'date-fns';
import { ReactSVG } from 'react-svg';
import styled from '@emotion/styled';
import planeIcon from 'servicemap-ui-turku/assets/icons/icons-icon_airplane-square.svg';
import { StyledContainer, StyledHeaderContainer, StyledTextContainer } from '../../../styled/styled';

const AirportFlightsContent = ({ arrivals, departees }) => {
  const intl = useIntl();

  const iconClass = css({
    fill: 'rgba(7, 44, 115, 255)',
    width: '18px',
    height: '18px',
  });

  const currentDate = new Date();
  const formatDate = dateValue => format(new Date(dateValue), 'MM-dd');
  const formatDateTime = dateTimeValue => format(new Date(dateTimeValue), 'dd.MM HH:mm');

  const filterArrivals = arrivals.filter(item => item.sdt.includes(formatDate(currentDate)));
  const filterDepartees = departees.filter(item => item.sdt.includes(formatDate(currentDate)));

  const getLocalizedCities = cityStr => {
    switch (cityStr) {
      case 'Stockholm':
        return intl.formatMessage({ id: 'mobilityPlatform.content.airport.cities.stockholm' });
      case 'Mariehamn':
        return intl.formatMessage({ id: 'mobilityPlatform.content.airport.cities.mariehamn' });
      case 'Riga':
        return intl.formatMessage({ id: 'mobilityPlatform.content.airport.cities.riga' });
      case 'Gdansk':
        return intl.formatMessage({ id: 'mobilityPlatform.content.airport.cities.gdansk' });
      default:
        return cityStr;
    }
  };

  return (
    <StyledContainer>
      <StyledHeaderContainer>
        <Typography variant="subtitle1" component="h3">
          {intl.formatMessage({ id: 'mobilityPlatform.content.airport.title' })}
        </Typography>
      </StyledHeaderContainer>
      <div>
        <StyledTextContainer>
          <Typography variant="subtitle1" component="p">
            {intl.formatMessage({ id: 'mobilityPlatform.content.airport.departees' })}
          </Typography>
        </StyledTextContainer>
        {filterDepartees.map(item => (
          <StyledFlexContainer key={item.sdt}>
            <StyledTextContainer>
              <ReactSVG src={planeIcon} className={iconClass} />
            </StyledTextContainer>
            <StyledTextContainer>
              <Typography variant="body2" component="p">
                {item.fltnr}
              </Typography>
            </StyledTextContainer>
            <StyledTextContainer>
              <Typography variant="body2" component="p">
                {getLocalizedCities(item.route_n_1)}
              </Typography>
            </StyledTextContainer>
            <StyledTextContainer>
              <Typography variant="body2" component="p">
                {formatDateTime(item.sdt)}
              </Typography>
            </StyledTextContainer>
          </StyledFlexContainer>
        ))}
      </div>
      <div>
        <StyledTextContainer>
          <Typography variant="subtitle1" component="p">
            {intl.formatMessage({ id: 'mobilityPlatform.content.airport.arrivals' })}
          </Typography>
        </StyledTextContainer>
        {filterArrivals.map(item => (
          <StyledFlexContainer key={item.sdt}>
            <StyledTextContainer>
              <ReactSVG src={planeIcon} className={iconClass} />
            </StyledTextContainer>
            <StyledTextContainer>
              <Typography variant="body2" component="p">
                {item.fltnr}
              </Typography>
            </StyledTextContainer>
            <StyledTextContainer>
              <Typography variant="body2" component="p">
                {intl.formatMessage({ id: 'mobilityPlatform.content.airport.cities.turku' })}
              </Typography>
            </StyledTextContainer>
            <StyledTextContainer>
              <Typography variant="body2" component="p">
                {formatDateTime(item.sdt)}
              </Typography>
            </StyledTextContainer>
          </StyledFlexContainer>
        ))}
      </div>
    </StyledContainer>
  );
};

const StyledFlexContainer = styled.div(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: theme.spacing(0.5),
  marginBottom: theme.spacing(0.75),
  width: '93%',
}));

AirportFlightsContent.propTypes = {
  arrivals: PropTypes.arrayOf(PropTypes.shape({
    sdt: PropTypes.string,
    fltnr: PropTypes.string,
    route_n_1: PropTypes.string,
  })),
  departees: PropTypes.arrayOf(PropTypes.shape({
    sdt: PropTypes.string,
    fltnr: PropTypes.string,
    route_n_1: PropTypes.string,
  })),
};

AirportFlightsContent.defaultProps = {
  arrivals: [],
  departees: [],
};

export default AirportFlightsContent;
