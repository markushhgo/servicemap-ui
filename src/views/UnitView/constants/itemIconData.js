import HoursIcon from '@material-ui/icons/AccessTime';
import RouteIcon from '@material-ui/icons/DirectionsBus';
import EmailIcon from '@material-ui/icons/Email';
import AddressIcon from '@material-ui/icons/LocationOn';
import OpenLinkIcon from '@material-ui/icons/OpenInNew';
import PersonIcon from '@material-ui/icons/Person';
import PhoneIcon from '@material-ui/icons/Phone';
import InfoIcon from '@material-ui/icons/PriorityHigh';
import ServiceIcon from '@material-ui/icons/Reorder';
import WarningIcon from '@material-ui/icons/Warning';
import React from 'react';

const getItemIconData = (type, data) => {
  if (type === 'LINK' || type === 'ESERVICE_LINK' || (type === 'OPENING_HOURS' && data.www)) {
    return <OpenLinkIcon />;
  } if (type === 'ADDRESS') {
    return <AddressIcon />;
  } if (type === 'OPENING_HOURS') {
    return <HoursIcon />;
  } if (type === 'PHONE') {
    return <PhoneIcon />;
  } if (type === 'EMAIL') {
    return <EmailIcon />;
  } if (type === 'PHONE_OR_EMAIL') {
    return <PersonIcon />;
  } if (type === 'SERVICE') {
    return <ServiceIcon />;
  } if (type === 'OTHER_INFO') {
    return <InfoIcon />;
  } if (type === 'ROUTE') {
    return <RouteIcon />;
  }
  return <WarningIcon />;
};

export default getItemIconData;
