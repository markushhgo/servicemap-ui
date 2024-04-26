import React from 'react';
import { PropTypes } from 'prop-types';
import { StyledPopupWrapper, StyledPopupInner } from '../styled/styled';

const PolygonComponent = ({
  item, useContrast, pathOptions, isTransparent, children,
}) => {
  const { Polygon, Popup } = global.rL;

  const opacityValue = isTransparent ? '0' : '0.2';

  return (
    <Polygon
      key={item.id}
      pathOptions={pathOptions}
      positions={item.geometry_coords}
      eventHandlers={{
        mouseover: e => {
          e.target.setStyle({ fillOpacity: useContrast ? '0.6' : opacityValue });
        },
        mouseout: e => {
          e.target.setStyle({ fillOpacity: useContrast ? '0.3' : opacityValue });
        },
      }}
    >
      <StyledPopupWrapper>
        <Popup>
          <StyledPopupInner>{children}</StyledPopupInner>
        </Popup>
      </StyledPopupWrapper>
    </Polygon>
  );
};

PolygonComponent.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string,
    geometry_coords: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number))),
  }).isRequired,
  useContrast: PropTypes.bool,
  pathOptions: PropTypes.shape({
    color: PropTypes.string,
    weight: PropTypes.number,
  }).isRequired,
  isTransparent: PropTypes.bool,
  children: PropTypes.node,
};

PolygonComponent.defaultProps = {
  useContrast: false,
  isTransparent: false,
  children: null,
};

export default PolygonComponent;
