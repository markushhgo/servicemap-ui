/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { ReactSVG } from 'react-svg';
import { DayPickerSingleDateController } from 'react-dates';
import { useIntl } from 'react-intl';
import 'react-dates/initialize';
import {
  fetchInitialHourData,
  fetchInitialDayDatas,
  fetchInitialWeekDatas,
  fetchInitialMonthDatas,
} from '../EcoCounterRequests/ecoCounterRequests';
import LineChart from '../LineChart';
import iconWalk from '../../../../node_modules/servicemap-ui-turku/assets/icons/icons-icon_walk.svg';
import iconBicycle from '../../../../node_modules/servicemap-ui-turku/assets/icons/icons-icon_bicycle.svg';
import iconCar from '../../../../node_modules/servicemap-ui-turku/assets/icons/icons-icon_car.svg';

const EcoCounterContent = ({
  classes, stationId, stationName,
}) => {
  const [ecoCounterHour, setEcoCounterHour] = useState(null);
  const [ecoCounterDay, setEcoCounterDay] = useState(null);
  const [ecoCounterWeek, setEcoCounterWeek] = useState(null);
  const [ecoCounterMonth, setEcoCounterMonth] = useState(null);
  const [channel1Counts, setChannel1Counts] = useState([]);
  const [channel2Counts, setChannel2Counts] = useState([]);
  const [channelTotals, setChannelTotals] = useState([]);
  const [ecoCounterLabels, setEcoCounterLabels] = useState([]);
  const [currentType, setCurrentType] = useState('bicycle');
  const [currentTime, setCurrentTime] = useState('hour');
  const [activeStep, setActiveStep] = useState(0);
  const [activeType, setActiveType] = useState(1);
  const [noCars, setNoCars] = useState(true);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(moment().add(-1, 'days'));

  const apiUrl = window.nodeEnvSettings.ECOCOUNTER_API;

  const intl = useIntl();

  // steps that determine which data is shown on the chart
  const buttonSteps = [
    {
      step: {
        type: 'hour',
        text: intl.formatMessage({ id: 'ecocounter.hour' }),
      },
    },
    {
      step: {
        type: 'day',
        text: intl.formatMessage({ id: 'ecocounter.day' }),
      },
    },
    {
      step: {
        type: 'week',
        text: intl.formatMessage({ id: 'ecocounter.week' }),
      },
    },
    {
      step: {
        type: 'month',
        text: intl.formatMessage({ id: 'ecocounter.month' }),
      },
    },
  ];

  // User types that include cars
  const userTypes = [
    {
      type: {
        user: 'walking',
        text: intl.formatMessage({ id: 'ecocounter.walk' }),
        icon: iconWalk,
      },
    },
    {
      type: {
        user: 'bicycle',
        text: intl.formatMessage({ id: 'ecocounter.bicycle' }),
        icon: iconBicycle,
      },
    },
    {
      type: {
        user: 'driving',
        text: intl.formatMessage({ id: 'ecocounter.car' }),
        icon: iconCar,
      },
    },
  ];

  // User types that doesn't include cars, because some stations do not include counts for cars
  const pedestrianTypes = [
    {
      type: {
        user: 'walking',
        text: intl.formatMessage({ id: 'ecocounter.walk' }),
        icon: iconWalk,
      },
    },
    {
      type: {
        user: 'bicycle',
        text: intl.formatMessage({ id: 'ecocounter.bicycle' }),
        icon: iconBicycle,
      },
    },
  ];

  const changeDate = (newDate) => {
    setSelectedDate(newDate);
  };

  // Set datepicker language
  useEffect(() => {
    if (intl.locale === 'en') {
      moment.locale('en');
    } else if (intl.locale === 'sv') {
      moment.locale('sv');
    } else moment.locale('fi');
  }, [intl.locale]);

  // momentjs
  // Initial values that are used to fetch data
  const currentDate = moment();
  const yesterDay = moment().add(-1, 'days');
  const yesterDayFormat = yesterDay.clone().format('YYYY-MM-DD');
  const initialDateStart = yesterDay.clone().startOf('week').format('YYYY-MM-DD');
  const initialDateEnd = yesterDay.clone().endOf('week').format('YYYY-MM-DD');
  const initialWeekStart = yesterDay.clone().startOf('month').week();
  const initialWeekEnd = yesterDay.clone().endOf('month').week();
  const initialMonth = yesterDay.clone().month() + 1;
  const initialYear = yesterDay.clone().year();

  // Values that change based on the datepicker value
  const selectedDateFormat = selectedDate.clone().format('YYYY-MM-DD');
  const selectedDateStart = selectedDate.clone().startOf('week').format('YYYY-MM-DD');
  const selectedDateEnd = selectedDate.clone().endOf('week').format('YYYY-MM-DD');
  let selectedWeekStart = selectedDate.clone().startOf('month').week();
  const selectedWeekEnd = selectedDate.clone().endOf('month').week();
  let selectedMonth = currentDate.clone().month() + 1;
  const selectedYear = selectedDate.clone().year();

  // This will show full year if available
  const checkYear = () => {
    if (selectedDate.clone().year() < moment().year()) {
      selectedMonth = 12;
    }
  };

  // API returns empty data if start_week_number parameter is higher number than end_week_number.
  // This will set it to 1 so that weekly graph in January won't be empty.
  const checkWeekNumber = () => {
    if (selectedWeekStart === 53) {
      selectedWeekStart = 1;
    }
  };

  // Reset selectedDate value when the new popup is opened.
  useEffect(() => {
    setSelectedDate(currentDate);
  }, [stationId]);

  useEffect(() => {
    checkYear();
  }, [selectedDate]);

  useEffect(() => {
    checkWeekNumber();
  }, [selectedWeekStart]);

  const labelsHour = [
    '1:00',
    '2:00',
    '3:00',
    '4:00',
    '5:00',
    '6:00',
    '7:00',
    '8:00',
    '9:00',
    '10:00',
    '11:00',
    '12:00',
    '13:00',
    '14:00',
    '15:00',
    '16:00',
    '17:00',
    '18:00',
    '19:00',
    '20:00',
    '21:00',
    '22:00',
    '23:00',
    '00:00',
  ];

  // Format dates for the chart
  const formatDates = (dateValue) => {
    const fields = dateValue.split('-');
    return `${fields[2]}.${fields[1]}`;
  };

  // Format weeks and display first day of each week in data
  const formatWeeks = weekValue => moment().day('Monday').year(selectedYear).week(weekValue)
    .format('DD.MM');

  const formatMonths = (monthValue) => {
    switch (monthValue) {
      case 1:
        return 'Tammi';
      case 2:
        return 'Helmi';
      case 3:
        return 'Maalis';
      case 4:
        return 'Huhti';
      case 5:
        return 'Touko';
      case 6:
        return 'Kesä';
      case 7:
        return 'Heinä';
      case 8:
        return 'Elo';
      case 9:
        return 'Syys';
      case 10:
        return 'Loka';
      case 11:
        return 'Marras';
      case 12:
        return 'Joulu';
      default:
        return monthValue;
    }
  };

  // Empties chart data so that old data won't persist on the chart
  const resetChannelData = () => {
    setChannel1Counts([]);
    setChannel2Counts([]);
    setChannelTotals([]);
    setEcoCounterLabels([]);
  };

  // Channel data is set inside this function to avoid duplicate code
  const setAllChannelCounts = (newValue1, newValue2, newValue3) => {
    setChannel1Counts(channel1Counts => [...channel1Counts, newValue1]);
    setChannel2Counts(channel2Counts => [...channel2Counts, newValue2]);
    setChannelTotals(channelTotals => [...channelTotals, newValue3]);
  };

  // Sets channel data into React state, so it can be displayed on the chart
  // States for user type(s) and step(s) are used to filter shown data
  const setChannelData = () => {
    resetChannelData();
    if (currentTime === 'hour') {
      setEcoCounterLabels(labelsHour);
      if (ecoCounterHour !== null) {
        if (ecoCounterHour.station === stationId && currentType === 'walking') {
          setChannel1Counts(ecoCounterHour.values_jk);
          setChannel2Counts(ecoCounterHour.values_jp);
          setChannelTotals(ecoCounterHour.values_jt);
        } else if (
          ecoCounterHour.station === stationId
          && currentType === 'bicycle'
        ) {
          setChannel1Counts(ecoCounterHour.values_pk);
          setChannel2Counts(ecoCounterHour.values_pp);
          setChannelTotals(ecoCounterHour.values_pt);
        } else if (
          ecoCounterHour.station === stationId
          && currentType === 'driving'
        ) {
          setChannel1Counts(ecoCounterHour.values_ak);
          setChannel2Counts(ecoCounterHour.values_ap);
          setChannelTotals(ecoCounterHour.values_at);
        }
      }
    } else if (currentTime === 'day') {
      ecoCounterDay.forEach((el) => {
        if (el.station === stationId && currentType === 'walking') {
          setChannel1Counts(channel1Counts => [
            ...channel1Counts,
            el.value_jk,
          ]);
          setChannel2Counts(channel2Counts => [
            ...channel2Counts,
            el.value_jp,
          ]);
          setChannelTotals(channelTotals => [...channelTotals, el.value_jt]);
          setEcoCounterLabels(ecoCounterLabels => [
            ...ecoCounterLabels,
            formatDates(el.day_info.date),
          ]);
        } else if (el.station === stationId && currentType === 'bicycle') {
          setChannel1Counts(channel1Counts => [
            ...channel1Counts,
            el.value_pk,
          ]);
          setChannel2Counts(channel2Counts => [
            ...channel2Counts,
            el.value_pp,
          ]);
          setChannelTotals(channelTotals => [...channelTotals, el.value_pt]);
          setEcoCounterLabels(ecoCounterLabels => [
            ...ecoCounterLabels,
            formatDates(el.day_info.date),
          ]);
        } else if (el.station === stationId && currentType === 'driving') {
          setChannel1Counts(channel1Counts => [
            ...channel1Counts,
            el.value_ak,
          ]);
          setChannel2Counts(channel2Counts => [
            ...channel2Counts,
            el.value_ap,
          ]);
          setChannelTotals(channelTotals => [...channelTotals, el.value_at]);
          setEcoCounterLabels(ecoCounterLabels => [
            ...ecoCounterLabels,
            formatDates(el.day_info.date),
          ]);
        }
      });
    } else if (currentTime === 'week') {
      ecoCounterWeek.forEach((el2) => {
        if (el2.station === stationId && currentType === 'walking') {
          setAllChannelCounts(el2.value_jk, el2.value_jp, el2.value_jt);
          setEcoCounterLabels(ecoCounterLabels => [
            ...ecoCounterLabels,
            formatWeeks(el2.week_info.week_number),
          ]);
        } else if (el2.station === stationId && currentType === 'bicycle') {
          setAllChannelCounts(el2.value_pk, el2.value_pp, el2.value_pt);
          setEcoCounterLabels(ecoCounterLabels => [
            ...ecoCounterLabels,
            formatWeeks(el2.week_info.week_number),
          ]);
        } else if (el2.station === stationId && currentType === 'driving') {
          setAllChannelCounts(el2.value_ak, el2.value_ap, el2.value_at);
          setEcoCounterLabels(ecoCounterLabels => [
            ...ecoCounterLabels,
            formatWeeks(el2.week_info.week_number),
          ]);
        }
      });
    } else if (currentTime === 'month') {
      ecoCounterMonth.forEach((el2) => {
        if (el2.station === stationId && currentType === 'walking') {
          setAllChannelCounts(el2.value_jk, el2.value_jp, el2.value_jt);
          setEcoCounterLabels(ecoCounterLabels => [
            ...ecoCounterLabels,
            formatMonths(el2.month_info.month_number),
          ]);
        } else if (el2.station === stationId && currentType === 'bicycle') {
          setAllChannelCounts(el2.value_pk, el2.value_pp, el2.value_pt);
          setEcoCounterLabels(ecoCounterLabels => [
            ...ecoCounterLabels,
            formatMonths(el2.month_info.month_number),
          ]);
        } else if (el2.station === stationId && currentType === 'driving') {
          setAllChannelCounts(el2.value_ak, el2.value_ap, el2.value_at);
          setEcoCounterLabels(ecoCounterLabels => [
            ...ecoCounterLabels,
            formatMonths(el2.month_info.month_number),
          ]);
        }
      });
    }
  };

  // Sets current user type and active button index
  const setWalkingState = (index) => {
    setActiveType(index);
    setCurrentType('walking');
  };

  const setBicycleState = (index) => {
    setActiveType(index);
    setCurrentType('bicycle');
  };

  const setDrivingState = (index) => {
    setActiveType(index);
    setCurrentType('driving');
  };

  const setUserTypes = (type, index) => {
    if (type === 'walking') setWalkingState(index);
    else if (type === 'bicycle') setBicycleState(index);
    else if (type === 'driving') setDrivingState(index);
  };

  // Sets current step and active button index
  const setStepHour = (i) => {
    setActiveStep(i);
    setCurrentTime('hour');
  };

  const setStepDay = (i) => {
    setActiveStep(i);
    setCurrentTime('day');
  };

  const setStepWeek = (i) => {
    setActiveStep(i);
    setCurrentTime('week');
  };

  const setStepMonth = (i) => {
    setActiveStep(i);
    setCurrentTime('month');
  };

  // Set active step
  const handleClick = (title, index) => {
    if (title === 'hour') {
      setStepHour(index);
    } else if (title === 'day') {
      setStepDay(index);
    } else if (title === 'week') {
      setStepWeek(index);
    } else if (title === 'month') {
      setStepMonth(index);
    }
  };

  // Fetch initial data based on the default date
  useEffect(() => {
    setEcoCounterLabels(labelsHour);
    fetchInitialHourData(apiUrl, yesterDayFormat, stationId, setEcoCounterHour);
  }, [stationId, setEcoCounterHour]);

  useEffect(() => {
    fetchInitialDayDatas(apiUrl, initialDateStart, initialDateEnd, stationId, setEcoCounterDay);
  }, [stationId, setEcoCounterDay]);

  useEffect(() => {
    // eslint-disable-next-line max-len
    fetchInitialWeekDatas(apiUrl, initialYear, initialWeekStart, initialWeekEnd, stationId, setEcoCounterWeek);
  }, [stationId, setEcoCounterWeek]);

  useEffect(() => {
    fetchInitialMonthDatas(apiUrl, initialYear, '1', initialMonth, stationId, setEcoCounterMonth);
  }, [stationId, setEcoCounterMonth]);

  // Fetch updated data when selected date is changed in datepicker.
  useEffect(() => {
    setEcoCounterLabels(labelsHour);
    fetchInitialHourData(apiUrl, selectedDateFormat, stationId, setEcoCounterHour);
    setActiveStep(0);
    setCurrentTime('hour');
  }, [selectedDate, stationId]);

  useEffect(() => {
    fetchInitialDayDatas(apiUrl, selectedDateStart, selectedDateEnd, stationId, setEcoCounterDay);
  }, [selectedDate, stationId]);

  useEffect(() => {
    // eslint-disable-next-line max-len
    fetchInitialWeekDatas(apiUrl, selectedYear, selectedWeekStart, selectedWeekEnd, stationId, setEcoCounterWeek);
  }, [selectedDate, stationId]);

  useEffect(() => {
    fetchInitialMonthDatas(apiUrl, selectedYear, '1', selectedMonth, stationId, setEcoCounterMonth);
  }, [selectedDate, stationId]);

  // useEffect is used to fill the chart with default data (default step is 'hourly')
  useEffect(() => {
    if (ecoCounterHour !== null) {
      if (ecoCounterHour.station === stationId && currentType === 'walking') {
        setChannel1Counts(ecoCounterHour.values_jk);
        setChannel2Counts(ecoCounterHour.values_jp);
        setChannelTotals(ecoCounterHour.values_jt);
      } else if (
        ecoCounterHour.station === stationId
        && currentType === 'bicycle'
      ) {
        setChannel1Counts(ecoCounterHour.values_pk);
        setChannel2Counts(ecoCounterHour.values_pp);
        setChannelTotals(ecoCounterHour.values_pt);
      } else if (
        ecoCounterHour.station === stationId
        && currentType === 'driving'
      ) {
        setChannel1Counts(ecoCounterHour.values_ak);
        setChannel2Counts(ecoCounterHour.values_ap);
        setChannelTotals(ecoCounterHour.values_at);
      }
    }
  }, [ecoCounterHour, stationId]);

  // When current user type or step changes, calls function to update the chart data
  useEffect(() => {
    setChannelData();
  }, [currentType, currentTime]);

  // Only one station includes data about cars
  // Sets noCars state to false for that one station only
  // Initially used id, but it changed few times, so it's not reliable.
  useEffect(() => {
    if (stationName === 'Auransilta') {
      setNoCars(false);
    }
  }, [stationId]);

  return (
    <>
      <div className={classes.ecoCounterHeader}>
        <h2 className={classes.headerSubtitle}>{stationName}</h2>
        <div className={classes.headerDate}>
          {!isDatePickerOpen ? (
            <button
              type="button"
              className={classes.buttonTransparent}
              onClick={() => setIsDatePickerOpen(true)}
            >
              <h3 className={classes.headerSubtitle}>{selectedDate.format('DD.MM.YYYY')}</h3>
            </button>
          ) : (
            <button
              type="button"
              className={classes.buttonTransparent}
              onClick={() => setIsDatePickerOpen(false)}
            >
              <h3>{selectedDate.format('DD.MM.YYYY')}</h3>
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
      <div className={classes.ecocounterContent}>
        <div className={classes.ecocounterUserTypes}>
          {!noCars
            ? userTypes.map((userType, i) => (
              <div
                key={userType.type.user}
                className={classes.buttonAndTextContainer}
              >
                <button
                  type="button"
                  aria-label={userType.type.ariaLabel}
                  className={
                    i === activeType
                      ? `${classes.buttonActive}`
                      : `${classes.buttonWhite}`
                  }
                  onClick={() => setUserTypes(userType.type.user, i)}
                >
                  <div>
                    <ReactSVG
                      className={
                        i === activeType
                          ? `${classes.iconActive}`
                          : `${classes.icon}`
                      }
                      src={userType.type.icon}
                    />
                  </div>
                </button>
                <p className={classes.userTypeText}>{userType.type.text}</p>
              </div>
            )) : pedestrianTypes.map((userType, i) => (
              <div
                key={userType.type.user}
                className={classes.buttonAndTextContainer}
              >
                <button
                  type="button"
                  className={
                    i === activeType
                      ? `${classes.buttonActive}`
                      : `${classes.buttonWhite}`
                  }
                  onClick={() => setUserTypes(userType.type.user, i)}
                >
                  <div>
                    <ReactSVG
                      className={
                        i === activeType
                          ? `${classes.iconActive}`
                          : `${classes.icon}`
                      }
                      src={userType.type.icon}
                    />
                  </div>
                </button>
                <p className={classes.userTypeText}>{userType.type.text}</p>
              </div>
            ))}
        </div>
        <div className={classes.ecocounterChart}>
          <LineChart
            labels={ecoCounterLabels}
            labelChannel1={intl.formatMessage({ id: 'ecocounter.chart.labelTo' })}
            labelChannel2={intl.formatMessage({
              id: 'ecocounter.chart.labelFrom',
            })}
            labelChannelTotal={intl.formatMessage({
              id: 'ecocounter.chart.labelTotal',
            })}
            channelTotalsData={channelTotals}
            channel1Data={channel1Counts}
            channel2Data={channel2Counts}
          />
        </div>
        <div className={classes.ecocounterSteps}>
          <>
            {buttonSteps.map((timing, i) => (
              <button
                key={timing.step.type}
                type="button"
                className={
                i === activeStep
                  ? `${classes.buttonActive}`
                  : `${classes.buttonWhite}`
              }
                onClick={() => handleClick(timing.step.type, i, stationId)}
              >
                {timing.step.text}
              </button>
            ))}
          </>
        </div>
      </div>
    </>
  );
};

EcoCounterContent.propTypes = {
  classes: PropTypes.objectOf(PropTypes.any).isRequired,
  stationId: PropTypes.number,
  stationName: PropTypes.string,
};

EcoCounterContent.defaultProps = {
  stationId: 0,
  stationName: '',
};

export default EcoCounterContent;
