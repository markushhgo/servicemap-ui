import React from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import { Typography } from '@mui/material';
import { format } from 'date-fns';
import styled from '@emotion/styled';
import { StyledContainer, StyledHeaderContainer, StyledTextContainer } from '../../../styled/styled';

const AirportFlightsContent = ({ arrivals, departees }) => {
  const intl = useIntl();

  const currentDate = new Date();
  const formatDate = dateValue => format(new Date(dateValue), 'MM-dd');
  const formatDateTime = dateTimeValue => format(new Date(dateTimeValue), 'dd.MM HH:mm');

  const filterArrivals = arrivals.filter(item => item.sdt.includes(formatDate(currentDate)));
  const filterDepartees = departees.filter(item => item.sdt.includes(formatDate(currentDate)));

  return (
    <StyledContainer>
      <StyledHeaderContainer>
        <Typography variant="subtitle1" component="h3">
          {intl.formatMessage({ id: 'mobilityPlatform.content.airport.title' })}
        </Typography>
      </StyledHeaderContainer>
      <div>
        <StyledTextContainer>
          <Typography variant="subtitle2" component="p">
            {intl.formatMessage({ id: 'mobilityPlatform.content.airport.arrivals' })}
          </Typography>
        </StyledTextContainer>
        {filterArrivals.map(item => (
          <StyledFlexContainer key={item.sdt}>
            <StyledTextContainer>
              <Typography variant="body2" component="p">
                {item.fltnr}
              </Typography>
            </StyledTextContainer>
            <StyledTextContainer>
              <Typography variant="body2" component="p">
                {`${item.route_n_1} - Turku`}
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
          <Typography variant="subtitle2" component="p">
            {intl.formatMessage({ id: 'mobilityPlatform.content.airport.departees' })}
          </Typography>
        </StyledTextContainer>
        {filterDepartees.map(item => (
          <StyledFlexContainer key={item.sdt}>
            <StyledTextContainer>
              <Typography variant="body2" component="p">
                {item.fltnr}
              </Typography>
            </StyledTextContainer>
            <StyledTextContainer>
              <Typography variant="body2" component="p">
                {`Turku - ${item.route_n_1}`}
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
  marginBottom: theme.spacing(0.75),
  width: '99%',
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
