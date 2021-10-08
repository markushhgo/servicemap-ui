import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { ReactSVG } from 'react-svg';
import LineChart from '../LineChart';
import iconWalk from '../../../assets/icons/icon-icon_walking.svg';
import iconBicycle from '../../../assets/icons/icon-icon_bicycle.svg';
import iconCar from '../../../assets/icons/icon-icon_car.svg';

const EcoCounterContent = ({
  classes,
  stationId,
  ecoCounterHour,
  ecoCounterDay,
  ecoCounterWeek,
  ecoCounterMonth,
  intl,
}) => {
  const [channel1Counts, setChannel1Counts] = useState([]);
  const [channel2Counts, setChannel2Counts] = useState([]);
  const [channelTotals, setChannelTotals] = useState([]);
  const [ecoCounterLabels, setEcoCounterLabels] = useState([]);
  const [currentType, setCurrentType] = useState('walking');
  const [currentTime, setCurrentTime] = useState('hour');
  const [activeStep, setActiveStep] = useState(0);
  const [activeType, setActiveType] = useState(0);
  const [isPedestriansOnly, setIsPedestriansOnly] = useState(true);
  // const [errorMsg, setErrorMsg] = useState('');

  // steps that determine which data is shown on the chart
  const buttonSteps = [
    {
      step: {
        type: 'hour',
        text: intl.formatMessage({ id: 'ecocounter.hour' }),
        ariaLabel: intl.formatMessage({ id: 'ecocounter.hour' }),
      },
    },
    {
      step: {
        type: 'day',
        text: intl.formatMessage({ id: 'ecocounter.day' }),
        ariaLabel: intl.formatMessage({ id: 'ecocounter.day' }),
      },
    },
    {
      step: {
        type: 'week',
        text: intl.formatMessage({ id: 'ecocounter.week' }),
        ariaLabel: intl.formatMessage({ id: 'ecocounter.week' }),
      },
    },
    {
      step: {
        type: 'month',
        text: intl.formatMessage({ id: 'ecocounter.month' }),
        ariaLabel: intl.formatMessage({ id: 'ecocounter.month' }),
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
        ariaLabel: intl.formatMessage({ id: 'ecocounter.walk' }),
      },
    },
    {
      type: {
        user: 'bicycle',
        text: intl.formatMessage({ id: 'ecocounter.bicycle' }),
        icon: iconBicycle,
        ariaLabel: intl.formatMessage({ id: 'ecocounter.bicycle' }),
      },
    },
    {
      type: {
        user: 'driving',
        text: intl.formatMessage({ id: 'ecocounter.car' }),
        icon: iconCar,
        ariaLabel: intl.formatMessage({ id: 'ecocounter.car' }),
      },
    },
  ];

  // User types that doesn't include cars, because some stations do not include counts for cars
  const pedestrianTypes = [
    {
      type: {
        user: 'walking',
        text: intl.formatMessage({ id: 'ecocounter.walk' }),
        icon: iconWalk2,
        ariaLabel: intl.formatMessage({ id: 'ecocounter.walk' }),
      },
    },
    {
      type: {
        user: 'bicycle',
        text: intl.formatMessage({ id: 'ecocounter.bicycle' }),
        icon: iconBicycle,
        ariaLabel: intl.formatMessage({ id: 'ecocounter.bicycle' }),
      },
    },
  ];

  const labelsHour = [
    '0:00',
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
  ];

  // const yesterday = moment().add(-1, 'days');

  // Format dates for the chart
  const formatDates = dateValue => moment(dateValue).format('DD.MM');

  const formatWeeks = weekValue => `Viikko ${weekValue}`;

  const formatMonths = (monthValue) => {
    switch (monthValue) {
      case 1:
        return 'Tammikuu';
      case 2:
        return 'Helmikuu';
      case 3:
        return 'Maaliskuu';
      case 4:
        return 'Huhtikuu';
      case 5:
        return 'Toukokuu';
      case 6:
        return 'Kesäkuu';
      case 7:
        return 'Heinäkuu';
      case 8:
        return 'Elokuu';
      case 9:
        return 'Syyskuu';
      case 10:
        return 'Lokakuu';
      case 11:
        return 'Marraskuu';
      case 12:
        return 'Joulukuu';
      default:
        return monthValue;
    }
  };

  // Empties chart data so that old data won't persist on the chart
  const resetChannelData = () => {
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
      ecoCounterHour.forEach((el3) => {
        if (el3.location === stationId && currentType === 'walking') {
          setChannel1Counts(el3.values_jk);
          setChannel2Counts(el3.values_jp);
          setChannelTotals(el3.values_jt);
        } else if (el3.location === stationId && currentType === 'bicycle') {
          setChannel1Counts(el3.values_pk);
          setChannel2Counts(el3.values_pp);
          setChannelTotals(el3.values_pt);
        } else if (el3.location === stationId && currentType === 'driving') {
          setChannel1Counts(el3.values_ak);
          setChannel2Counts(el3.values_ap);
          setChannelTotals(el3.values_at);
        }
      });
    } else if (currentTime === 'day') {
      ecoCounterDay.forEach((el) => {
        if (el.location === stationId && currentType === 'walking') {
          setChannel1Counts(channel1Counts => [...channel1Counts, el.values_jk]);
          setChannel2Counts(channel2Counts => [...channel2Counts, el.values_jp]);
          setChannelTotals(channelTotals => [...channelTotals, el.values_jt]);
          setEcoCounterLabels(ecoCounterLabels => [...ecoCounterLabels, formatDates(el.date)]);
        } else if (el.location === stationId && currentType === 'bicycle') {
          setChannel1Counts(channel1Counts => [...channel1Counts, el.values_pk]);
          setChannel2Counts(channel2Counts => [...channel2Counts, el.values_pp]);
          setChannelTotals(channelTotals => [...channelTotals, el.values_pt]);
          setEcoCounterLabels(ecoCounterLabels => [...ecoCounterLabels, formatDates(el.date)]);
        } else if (el.location === stationId && currentType === 'driving') {
          setChannel1Counts(channel1Counts => [...channel1Counts, el.values_ak]);
          setChannel2Counts(channel2Counts => [...channel2Counts, el.values_ap]);
          setChannelTotals(channelTotals => [...channelTotals, el.values_at]);
          setEcoCounterLabels(ecoCounterLabels => [...ecoCounterLabels, formatDates(el.date)]);
        }
      });
    } else if (currentTime === 'week') {
      ecoCounterWeek.forEach((el2) => {
        if (el2.location === stationId && currentType === 'walking') {
          setAllChannelCounts(el2.value_jk, el2.value_jp, el2.value_jt);
          setEcoCounterLabels(ecoCounterLabels => [
            ...ecoCounterLabels,
            formatWeeks(el2.week_info.week_number),
          ]);
        } else if (el2.location === stationId && currentType === 'bicycle') {
          setAllChannelCounts(el2.value_pk, el2.value_pp, el2.value_pt);
          setEcoCounterLabels(ecoCounterLabels => [
            ...ecoCounterLabels,
            formatWeeks(el2.week_info.week_number),
          ]);
        } else if (el2.location === stationId && currentType === 'driving') {
          setAllChannelCounts(el2.value_ak, el2.value_ap, el2.value_at);
          setEcoCounterLabels(ecoCounterLabels => [
            ...ecoCounterLabels,
            formatWeeks(el2.week_info.week_number),
          ]);
        }
      });
    } else if (currentTime === 'month') {
      ecoCounterMonth.forEach((el2) => {
        if (el2.location === stationId && currentType === 'walking') {
          setAllChannelCounts(el2.value_jk, el2.value_jp, el2.value_jt);
          setEcoCounterLabels(ecoCounterLabels => [
            ...ecoCounterLabels,
            formatMonths(el2.month_info.month_number),
          ]);
        } else if (el2.location === stationId && currentType === 'bicycle') {
          setAllChannelCounts(el2.value_pk, el2.value_pp, el2.value_pt);
          setEcoCounterLabels(ecoCounterLabels => [
            ...ecoCounterLabels,
            formatMonths(el2.month_info.month_number),
          ]);
        } else if (el2.location === stationId && currentType === 'driving') {
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

  const handleClick = (title, index) => {
    if (title === 'hour') setStepHour(index);
    else if (title === 'day') setStepDay(index);
    else if (title === 'week') setStepWeek(index);
    else if (title === 'month') setStepMonth(index);
  };

  // useEffect is used to fill the chart with default data (default step is 'hourly')
  useEffect(() => {
    setEcoCounterLabels(labelsHour);
    ecoCounterHour.forEach((el3) => {
      if (el3.location === stationId && currentType === 'walking') {
        setChannel1Counts(el3.values_jk);
        setChannel2Counts(el3.values_jp);
        setChannelTotals(el3.values_jt);
      } else if (el3.location === stationId && currentType === 'bicycle') {
        setChannel1Counts(el3.values_pk);
        setChannel2Counts(el3.values_pp);
        setChannelTotals(el3.values_pt);
      } else if (el3.location === stationId && currentType === 'driving') {
        setChannel1Counts(el3.values_ak);
        setChannel2Counts(el3.values_ap);
        setChannelTotals(el3.values_at);
      }
    });
  }, []);

  // When current user type or step changes, calls function to update the chart data
  useEffect(() => {
    setChannelData();
  }, [currentType, currentTime]);

  // Only one station includes data about cars
  // Sets isPedestriansOnly state to false for that one station only
  useEffect(() => {
    if (stationId === 24) {
      setIsPedestriansOnly(false);
    }
  }, [stationId]);

  return (
    <div className={classes.ecocounterContent}>
      <div className={classes.ecocounterUserTypes}>
        {!isPedestriansOnly
          ? userTypes.map((userType, i) => (
            <div key={userType.type.user} className={classes.buttonAndTextContainer}>
              <button
                type="button"
                aria-label={userType.type.ariaLabel}
                className={
                    i === activeType ? `${classes.buttonActive}` : `${classes.buttonWhite}`
                  }
                onClick={() => setUserTypes(userType.type.user, i)}
              >
                {/* <img src={userType.type.icon} width="30px" height="30px" alt="user type" /> */}
                <div>
                  <ReactSVG
                    className={i === activeType ? `${classes.iconActive}` : `${classes.icon}`}
                    src={userType.type.icon}
                  />
                </div>
              </button>
              <p className={classes.userTypeText}>{userType.type.text}</p>
            </div>
          ))
          : pedestrianTypes.map((userType, i) => (
            <div key={userType.type.user} className={classes.buttonAndTextContainer}>
              <button
                type="button"
                aria-label={userType.type.ariaLabel}
                className={
                    i === activeType ? `${classes.buttonActive}` : `${classes.buttonWhite}`
                  }
                onClick={() => setUserTypes(userType.type.user, i)}
              >
                {/* <img src={userType.type.icon} width="30px" height="30px" alt="user type" /> */}
                <div>
                  <ReactSVG
                    className={i === activeType ? `${classes.iconActive}` : `${classes.icon}`}
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
          labelChannel2={intl.formatMessage({ id: 'ecocounter.chart.labelFrom' })}
          labelChannelTotal={intl.formatMessage({ id: 'ecocounter.chart.labelTotal' })}
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
              aria-label={timing.step.ariaLabel}
              className={i === activeStep ? `${classes.buttonActive}` : `${classes.buttonWhite}`}
              onClick={() => handleClick(timing.step.type, i, stationId)}
            >
              {timing.step.text}
            </button>
          ))}
        </>
      </div>
    </div>
  );
};

EcoCounterContent.propTypes = {
  classes: PropTypes.objectOf(PropTypes.any).isRequired,
  stationId: PropTypes.number,
  ecoCounterHour: PropTypes.arrayOf(PropTypes.any),
  ecoCounterDay: PropTypes.arrayOf(PropTypes.any),
  ecoCounterWeek: PropTypes.arrayOf(PropTypes.any),
  ecoCounterMonth: PropTypes.arrayOf(PropTypes.any),
  intl: PropTypes.objectOf(PropTypes.any).isRequired,
};

EcoCounterContent.defaultProps = {
  stationId: 0,
  ecoCounterHour: [],
  ecoCounterDay: [],
  ecoCounterWeek: [],
  ecoCounterMonth: [],
};

export default EcoCounterContent;
