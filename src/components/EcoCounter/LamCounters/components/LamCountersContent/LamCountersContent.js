/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ButtonBase, Typography } from '@material-ui/core';
import DateRangeIcon from '@material-ui/icons/DateRange';
import moment from 'moment';
import PropTypes from 'prop-types';
import { DayPickerSingleDateController } from 'react-dates';
import 'react-dates/initialize';
import { ReactSVG } from 'react-svg';
import iconCar from 'servicemap-ui-turku/assets/icons/icons-icon_car.svg';
import {
  fetchInitialDayDatas, fetchInitialHourData, fetchInitialMonthDatas, fetchInitialWeekDatas,
} from '../../../EcoCounterRequests/ecoCounterRequests';
import LineChart from '../../../LineChart';

const LamCountersContent = ({
  classes, intl, stationId, stationName,
}) => {
  const [lamCounterHour, setLamCounterHour] = useState([]);
  const [lamCounterDay, setLamCounterDay] = useState([]);
  const [lamCounterWeek, setLamCounterWeek] = useState([]);
  const [lamCounterMonth, setLamCounterMonth] = useState([]);
  const [channel1Counts, setChannel1Counts] = useState([]);
  const [channel2Counts, setChannel2Counts] = useState([]);
  const [channelTotals, setChannelTotals] = useState([]);
  const [lamCounterLabels, setLamCounterLabels] = useState([]);
  const [currentTime, setCurrentTime] = useState('hour');
  const [activeStep, setActiveStep] = useState(0);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(moment().clone().add(-1, 'days'));

  const locale = useSelector(state => state.user.locale);

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

  const userTypes = [
    {
      type: {
        user: 'driving',
        text: intl.formatMessage({ id: 'ecocounter.car' }),
        icon: iconCar,
      },
    },
  ];

  const changeDate = (newDate) => {
    setSelectedDate(newDate);
  };

  // Set datepicker language
  useEffect(() => {
    if (locale === 'en') {
      moment.locale('en');
    } else if (locale === 'sv') {
      moment.locale('sv');
    } else moment.locale('fi');
  }, [locale]);

  // API returns empty data if start_week_number parameter is higher number than end_week_number.
  // This will set it to 1 so that weekly graph in January won't be empty in case week number of 1.1 is 52 or 53.
  const checkWeekNumber = (dateValue) => {
    const start = dateValue.clone().startOf('month').week();
    const end = dateValue.clone().endOf('month').week();
    if (start > end) {
      return 1;
    }
    return start;
  };

  // momentjs
  // Initial values that are used to fetch data
  const currentDate = moment();
  const lastMonth = currentDate.clone().subtract(1, 'months').endOf('month');
  const yesterDay = lastMonth.clone().add(-1, 'days');
  const yesterDayFormat = yesterDay.clone().format('YYYY-MM-DD');
  const initialDateStart = yesterDay.clone().startOf('week').format('YYYY-MM-DD');
  const initialDateEnd = yesterDay.clone().endOf('week').format('YYYY-MM-DD');
  const initialWeekStart = checkWeekNumber(yesterDay);
  const initialWeekEnd = yesterDay.clone().endOf('month').week();
  const initialMonth = yesterDay.clone().month() + 1;
  const initialYear = yesterDay.clone().year();

  // Values that change based on the datepicker value
  const selectedDateFormat = selectedDate.clone().format('YYYY-MM-DD');
  const selectedDateStart = selectedDate.clone().startOf('week').format('YYYY-MM-DD');
  const selectedDateEnd = selectedDate.clone().endOf('week').format('YYYY-MM-DD');
  const selectedWeekStart = checkWeekNumber(selectedDate);
  const selectedWeekEnd = selectedDate.clone().endOf('month').week();
  let selectedMonth = currentDate.clone().month() + 1;
  const selectedYear = selectedDate.clone().year();

  // This will show full year if available
  const checkYear = () => {
    if (selectedDate.clone().year() < moment().year()) {
      selectedMonth = 12;
    }
  };

  // Reset selectedDate value when the new popup is opened.
  useEffect(() => {
    setSelectedDate(moment().clone().subtract(1, 'months').endOf('month'));
  }, [stationId]);

  useEffect(() => {
    checkYear();
  }, [selectedDate]);

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
        return intl.formatMessage({ id: 'ecocounter.jan' });
      case 2:
        return intl.formatMessage({ id: 'ecocounter.feb' });
      case 3:
        return intl.formatMessage({ id: 'ecocounter.march' });
      case 4:
        return intl.formatMessage({ id: 'ecocounter.april' });
      case 5:
        return intl.formatMessage({ id: 'ecocounter.may' });
      case 6:
        return intl.formatMessage({ id: 'ecocounter.june' });
      case 7:
        return intl.formatMessage({ id: 'ecocounter.july' });
      case 8:
        return intl.formatMessage({ id: 'ecocounter.aug' });
      case 9:
        return intl.formatMessage({ id: 'ecocounter.sep' });
      case 10:
        return intl.formatMessage({ id: 'ecocounter.oct' });
      case 11:
        return intl.formatMessage({ id: 'ecocounter.nov' });
      case 12:
        return intl.formatMessage({ id: 'ecocounter.dec' });
      default:
        return monthValue;
    }
  };

  // Empties chart data so that old data won't persist on the chart
  const resetChannelData = () => {
    setChannel1Counts([]);
    setChannel2Counts([]);
    setChannelTotals([]);
    setLamCounterLabels([]);
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
      setLamCounterLabels(labelsHour);
      if (lamCounterHour !== null && lamCounterHour.station === stationId) {
        const countsArr = [];
        countsArr.push(lamCounterHour.values_ak, lamCounterHour.values_ap, lamCounterHour.values_at);
        setChannel1Counts(countsArr[0]);
        setChannel2Counts(countsArr[1]);
        setChannelTotals(countsArr[2]);
      }
    } else if (currentTime === 'day') {
      lamCounterDay.forEach((el) => {
        const countsArr = [];
        if (el.station === stationId) {
          countsArr.push(el.value_ak, el.value_ap, el.value_at, el.day_info.date);
        }
        setChannel1Counts(channel1Counts => [...channel1Counts, countsArr[0]]);
        setChannel2Counts(channel2Counts => [...channel2Counts, countsArr[1]]);
        setChannelTotals(channelTotals => [...channelTotals, countsArr[2]]);
        setLamCounterLabels(lamCounterLabels => [...lamCounterLabels, formatDates(countsArr[3])]);
      });
    } else if (currentTime === 'week') {
      lamCounterWeek.forEach((el) => {
        const countsArr = [];
        if (el.station === stationId) {
          countsArr.push(el.value_ak, el.value_ap, el.value_at, el.week_info.week_number);
        }
        setAllChannelCounts(countsArr[0], countsArr[1], countsArr[2]);
        setLamCounterLabels(lamCounterLabels => [...lamCounterLabels, formatWeeks(countsArr[3])]);
      });
    } else if (currentTime === 'month') {
      lamCounterMonth.forEach((el) => {
        const countsArr = [];
        if (el.station === stationId) {
          countsArr.push(el.value_ak, el.value_ap, el.value_at, el.month_info.month_number);
        }
        setAllChannelCounts(countsArr[0], countsArr[1], countsArr[2]);
        setLamCounterLabels(lamCounterLabels => [...lamCounterLabels, formatMonths(countsArr[3])]);
      });
    }
  };

  // Sets current step and active button index
  const setStepState = (index, timeValue) => {
    setActiveStep(index);
    setCurrentTime(timeValue);
  };

  // Set active step
  const handleClick = (title, index) => {
    if (title === 'hour') {
      setStepState(index, 'hour');
    } else if (title === 'day') {
      setStepState(index, 'day');
    } else if (title === 'week') {
      setStepState(index, 'week');
    } else if (title === 'month') {
      setStepState(index, 'month');
    }
  };

  // Fetch initial data based on the default date
  useEffect(() => {
    setLamCounterLabels(labelsHour);
    fetchInitialHourData(yesterDayFormat, stationId, setLamCounterHour);
  }, [stationId, setLamCounterHour]);

  useEffect(() => {
    fetchInitialDayDatas(initialDateStart, initialDateEnd, stationId, setLamCounterDay);
  }, [stationId, setLamCounterDay]);

  useEffect(() => {
    fetchInitialWeekDatas(initialYear, initialWeekStart, initialWeekEnd, stationId, setLamCounterWeek);
  }, [stationId, setLamCounterWeek]);

  useEffect(() => {
    fetchInitialMonthDatas(initialYear, '1', initialMonth, stationId, setLamCounterMonth);
  }, [stationId, setLamCounterMonth]);

  // Fetch updated data when selected date is changed in datepicker.
  useEffect(() => {
    setLamCounterLabels(labelsHour);
    fetchInitialHourData(selectedDateFormat, stationId, setLamCounterHour);
    setActiveStep(0);
    setCurrentTime('hour');
  }, [selectedDate, stationId]);

  useEffect(() => {
    fetchInitialDayDatas(selectedDateStart, selectedDateEnd, stationId, setLamCounterDay);
  }, [selectedDate, stationId]);

  useEffect(() => {
    fetchInitialWeekDatas(selectedYear, selectedWeekStart, selectedWeekEnd, stationId, setLamCounterWeek);
  }, [selectedDate, stationId]);

  useEffect(() => {
    fetchInitialMonthDatas(selectedYear, '1', selectedMonth, stationId, setLamCounterMonth);
  }, [selectedDate, stationId]);

  // useEffect is used to fill the chart with default data (default step is 'hourly')
  useEffect(() => {
    if (lamCounterHour !== null && lamCounterHour.station === stationId) {
      const countsArr = [];
      countsArr.push(lamCounterHour.values_ak, lamCounterHour.values_ap, lamCounterHour.values_at);
      setChannel1Counts(countsArr[0]);
      setChannel2Counts(countsArr[1]);
      setChannelTotals(countsArr[2]);
    }
  }, [lamCounterHour, stationId]);

  // When current user type or step changes, calls function to update the chart data
  useEffect(() => {
    setChannelData();
  }, [currentTime]);

  return (
    <>
      <div className={classes.lamCounterHeader}>
        <Typography component="h4" className={classes.headerSubtitle}>
          {stationName}
        </Typography>
        <div className={classes.headerDate}>
          <div className={classes.iconContainer}>
            <DateRangeIcon />
          </div>
          {!isDatePickerOpen ? (
            <ButtonBase className={classes.buttonTransparent} onClick={() => setIsDatePickerOpen(true)}>
              <Typography component="h5" className={classes.headerSubtitle}>
                {selectedDate.clone().format('DD.MM.YYYY')}
              </Typography>
            </ButtonBase>
          ) : (
            <ButtonBase className={classes.buttonTransparent} onClick={() => setIsDatePickerOpen(false)}>
              <Typography component="h5" className={classes.headerSubtitle}>
                {selectedDate.clone().format('DD.MM.YYYY')}
              </Typography>
            </ButtonBase>
          )}
        </div>
        {isDatePickerOpen ? (
          <div className={classes.lamCounterDatePicker}>
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
      <div className={classes.lamCounterContent}>
        <div className={classes.lamCounterUserTypes}>
          {userTypes
            && userTypes.map(userType => (
              <div key={userType.type.user} className={classes.container}>
                <div className={classes.iconWrapper}>
                  <ReactSVG
                    className={classes.iconActive}
                    src={userType.type.icon}
                  />
                </div>
                <div className={classes.textContainer}>
                  <Typography variant="body2" className={classes.userTypeText}>
                    {userType.type.text}
                  </Typography>
                </div>
              </div>
            ))}
        </div>
        <div className={classes.lamCounterChart}>
          <LineChart
            labels={lamCounterLabels}
            labelChannel1={intl.formatMessage({
              id: 'ecocounter.chart.labelTo',
            })}
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
        <div className={classes.lamCounterSteps}>
          <>
            {buttonSteps.map((timing, i) => (
              <ButtonBase
                key={timing.step.type}
                type="button"
                className={i === activeStep ? `${classes.buttonActive}` : `${classes.buttonWhite}`}
                onClick={() => handleClick(timing.step.type, i)}
              >
                <Typography variant="body2" className={classes.buttonText}>
                  {timing.step.text}
                </Typography>
              </ButtonBase>
            ))}
          </>
        </div>
      </div>
    </>
  );
};

LamCountersContent.propTypes = {
  classes: PropTypes.objectOf(PropTypes.any).isRequired,
  intl: PropTypes.objectOf(PropTypes.any).isRequired,
  stationId: PropTypes.number,
  stationName: PropTypes.string,
};

LamCountersContent.defaultProps = {
  stationId: 0,
  stationName: '',
};

export default LamCountersContent;