import PropTypes from 'prop-types';
import React from 'react';
import styled from '@emotion/styled';
import { Typography } from '@mui/material';
import { useIntl } from 'react-intl';

const AccessibilityAreasContent = ({ item }) => {
  const intl = useIntl();

  const contentInfo = (
    <StyledContainer>
      <StyledHeaderContainer>
        <Typography variant="subtitle1" component="h4">
          {item.name_fi}
        </Typography>
      </StyledHeaderContainer>
      <StyledTextContainer>
        <StyledMargin>
          <Typography variant="subtitle2" component="p">
            {intl.formatMessage({ id: 'unit.accessibilityAreas.content.subtitle' })}
          </Typography>
        </StyledMargin>
        <StyledMargin>
          <Typography variant="body2" component="p">
            {intl.formatMessage({ id: 'unit.accessibilityAreas.content.transport' }, { value: item.extra.Kulkumuoto })}
          </Typography>
          <Typography variant="body2" component="p">
            {intl.formatMessage({ id: 'unit.accessibilityAreas.content.duration' }, { value: item.extra.Minuutit })}
          </Typography>
        </StyledMargin>
      </StyledTextContainer>
    </StyledContainer>
  );

  return <StyledContainer>{contentInfo}</StyledContainer>;
};

const StyledContainer = styled.div(({ theme }) => ({
  margin: theme.spacing(1),
}));

const StyledHeaderContainer = styled.div(({ theme }) => ({
  width: '85%',
  borderBottom: '1px solid #000',
  paddingBottom: theme.spacing(0.5),
}));

const StyledTextContainer = styled.div(({ theme }) => ({
  marginTop: theme.spacing(0.5),
}));

const StyledMargin = styled.div(({ theme }) => ({
  margin: theme.spacing(0.4),
}));

AccessibilityAreasContent.propTypes = {
  item: PropTypes.shape({
    name_fi: PropTypes.string,
    extra: PropTypes.shape({
      Kulkumuoto: PropTypes.string,
      Minuutit: PropTypes.number,
    }),
  }),
};

AccessibilityAreasContent.defaultProps = {
  item: {},
};

export default AccessibilityAreasContent;
