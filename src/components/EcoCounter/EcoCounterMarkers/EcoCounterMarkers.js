import React, { useEffect, useState } from 'react';
import { PropTypes } from 'prop-types';
import { DayPickerSingleDateController } from 'react-dates';
import { useIntl } from 'react-intl';
import moment from 'moment';
import 'react-dates/initialize';
import EcoCounterContent from '../EcoCounterContent';
// import { fetchEcoCounterStations } from '../EcoCounterRequests/ecoCounterRequests';
import markerIcon from '../../../../node_modules/servicemap-ui-turku/assets/icons/icons-icon_ecocounter.svg';
import ecoCounterDailyFile from '../../../assets/files/ecocounter_days.json';
import ecoCounterHourlyFile from '../../../assets/files/ecocounter_hours.json';
import ecoCounterWeeklyFile from '../../../assets/files/ecocounter_week.json';
import ecoCounterMonthlyFile from '../../../assets/files/ecocounter_month.json';
import locationsFile from '../../../assets/files/ecocounter_locations.json';

const EcoCounterMarkers = ({ classes }) => {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [ecoCounterStations, setEcoCounterStations] = useState([]);
  const [ecoCounterHour, setEcoCounterHour] = useState([]);
  const [ecoCounterDay, setEcoCounterDay] = useState([]);
  const [ecoCounterWeek, setEcoCounterWeek] = useState([]);
  const [ecoCounterMonth, setEcoCounterMonth] = useState([]);
  // const [errorMsg, setErrorMsg] = useState('');

  const { Marker, Popup } = global.rL;
  const { icon } = global.L;

  const ecoCounterIcon = icon({
    iconUrl: markerIcon,
    iconSize: [45, 45],
  });

  useEffect(() => {
    // fetchEcoCounterStations(setEcoCounterStations, setErrorMsg);
    setEcoCounterStations(locationsFile.results);
    setEcoCounterHour(ecoCounterHourlyFile.results);
    setEcoCounterDay(ecoCounterDailyFile.results);
    setEcoCounterWeek(ecoCounterWeeklyFile.results);
    setEcoCounterMonth(ecoCounterMonthlyFile.results);
  }, [ecoCounterStations, ecoCounterHour, ecoCounterDay, ecoCounterWeek, ecoCounterMonth]);

  const date = moment();

  const intl = useIntl();

  const changeDate = (newDate) => {
    setSelectedDate(newDate);
    // const formattedDate = newDate.format('YYYY-MM-DD');
    // const weekNumber = newDate.format('WW');
    // const year = newDate.format('YYYY');
  };

  // Set datepicker language
  useEffect(() => {
    // moment.locale('fi');
    if (intl.locale === 'en') {
      moment.locale('en');
    } else if (intl.locale === 'sv') {
      moment.locale('sv');
    } else moment.locale('fi');
  }, [intl.locale]);

  return (
    <>
      <div>
        <div>
          {ecoCounterStations.map(item => (
            <Marker key={item.id} icon={ecoCounterIcon} position={[item.lat, item.lon]}>
              <div className={classes.popupWrapper}>
                <Popup className="ecocounter-popup">
                  <div className={classes.popupInner}>
                    <div className={classes.ecoCounterHeader}>
                      <h2 className={classes.headerSubtitle}>{item.name}</h2>
                      <div className={classes.headerDate}>
                        {!isDatePickerOpen ? (
                          <button
                            type="button"
                            className={classes.buttonTransparent}
                            onClick={() => setIsDatePickerOpen(true)}
                          >
                            <h3 className={classes.headerSubtitle}>{date.format('DD.MM.YYYY')}</h3>
                          </button>
                        ) : (
                          <button
                            type="button"
                            className={classes.buttonTransparent}
                            onClick={() => setIsDatePickerOpen(false)}
                          >
                            <h3>{date.format('DD.MM.YYYY')}</h3>
                          </button>
                        )}
                      </div>
                      {isDatePickerOpen ? (
                        <div className={classes.ecocounterDatePicker}>
                          <DayPickerSingleDateController
                            date={selectedDate}
                            onDateChange={(newDate) => {
                              changeDate(newDate);
                              setIsDatePickerOpen(false);
                            }}
                            numberOfMonths={1}
                          />
                        </div>
                      ) : null}
                    </div>
                    <EcoCounterContent
                      stationId={item.id}
                      ecoCounterHour={ecoCounterHour}
                      ecoCounterDay={ecoCounterDay}
                      ecoCounterWeek={ecoCounterWeek}
                      ecoCounterMonth={ecoCounterMonth}
                      intl={intl}
                    />
                  </div>
                </Popup>
              </div>
            </Marker>
          ))}
        </div>
      </div>
    </>
  );
};

EcoCounterMarkers.propTypes = {
  classes: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default EcoCounterMarkers;
