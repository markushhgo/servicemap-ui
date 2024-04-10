import React from 'react';
import { Typography } from '@mui/material';
import styled from '@emotion/styled';
import { useMobilityPlatformContext } from '../../../../context/MobilityPlatformContext';
import AccessibilityAreasToggle from './components/AccessibilityAreasToggle';
import { Container } from '../../../../components';

const AccessibilityAreasInfo = () => {
  const { showAccessibilityAreas, setShowAccessibilityAreas } = useMobilityPlatformContext();

  const accessibilityAreasToggle = () => {
    setShowAccessibilityAreas(current => !current);
  };

  const settingsData = [
    {
      type: 'allAccessibilityAreas',
      msgId: 'unit.accessibilityAreas.all.label',
      checkedValue: showAccessibilityAreas,
      onChangeValue: accessibilityAreasToggle,
    },
  ];

  const renderSettings = () => settingsData.map(item => (
    <StyledCheckBoxContainer key={item.type}>
      <AccessibilityAreasToggle
        msgId={item.msgId}
        checkedValue={item.checkedValue}
        onChangeValue={item.onChangeValue}
        selectionSize={settingsData.length}
      />
    </StyledCheckBoxContainer>
  ));

  return (
    <StyledContent>
      <Container>
        <Typography variant="title">
          Lähestymisalueet
        </Typography>
      </Container>
      <Container>
        <Typography variant="body2" component="p">
          Lähestymisalueet ovat...
        </Typography>
      </Container>
      <Container>
        {renderSettings()}
      </Container>
    </StyledContent>
  );
};

const StyledContent = styled.div(({ theme }) => ({
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
  paddingBottom: theme.spacing(2),
}));

const StyledCheckBoxContainer = styled.div(({ theme }) => ({
  width: '100%',
  paddingTop: theme.spacing(1.5),
  paddingBottom: theme.spacing(1.5),
}));

export default AccessibilityAreasInfo;
