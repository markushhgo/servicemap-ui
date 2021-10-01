import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import LineChart from '../LineChart';
import iconWalking from '../../../assets/images/icon-icon_walking.svg';
import iconCycling from '../../../assets/images/icon-icon_cycling.svg';
import iconCar from '../../../assets/images/icon-icon_car.svg';

const EcoCounterContent = ({
  classes,
  stationId,
  ecoCounterHour,
  ecoCounterDay,
  ecoCounterWeek,
  ecoCounterMonth,
}) => {
  const [channel1Counts, setChannel1Counts] = useState([]);
  const [channel2Counts, setChannel2Counts] = useState([]);
  const [channelTotals, setChannelTotals] = useState([]);
  const [ecoCounterLabels, setEcoCounterLabels] = useState([]);
  const [currentType, setCurrentType] = useState('walking');
  const [currentTime, setCurrentTime] = useState('hour');
  const [activeStep, setActiveStep] = useState(0);
  const [activeType, setActiveType] = useState(0);

  const buttonSteps = [
    {
      step: {
        type: 'hour',
        text: 'Tunneittain',
      },
    },
    {
      step: {
        type: 'day',
        text: 'Päivittäin',
      },
    },
    {
      step: {
        type: 'week',
        text: 'Viikoittain',
      },
    },
    {
      step: {
        type: 'month',
        text: 'Kuukausittain',
      },
    },
  ];

  const userTypes = [
    {
      type: {
        user: 'walking',
        text: 'Kävely',
        icon: iconWalking,
      },
    },
    {
      type: {
        user: 'cycling',
        text: 'Pyörä',
        icon: iconCycling,
      },
    },
    {
      type: {
        user: 'driving',
        text: 'Auto',
        icon: iconCar,
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

  const resetChannelData = () => {
    setChannelTotals([]);
    setEcoCounterLabels([]);
  };

  const setAllChannelCounts = (newValue1, newValue2, newValue3) => {
    setChannel1Counts(channel1Counts => [...channel1Counts, newValue1]);
    setChannel2Counts(channel2Counts => [...channel2Counts, newValue2]);
    setChannelTotals(channelTotals => [...channelTotals, newValue3]);
  };

  const setChannelData = () => {
    resetChannelData();
    if (currentTime === 'hour') {
      setEcoCounterLabels(labelsHour);
      ecoCounterHour.forEach((el3) => {
        if (el3.location === stationId && currentType === 'walking') {
          setChannel1Counts(el3.values_jk);
          setChannel2Counts(el3.values_jp);
          setChannelTotals(el3.values_jt);
        } else if (el3.location === stationId && currentType === 'cycling') {
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
        } else if (el.location === stationId && currentType === 'cycling') {
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
        } else if (el2.location === stationId && currentType === 'cycling') {
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
        } else if (el2.location === stationId && currentType === 'cycling') {
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

  const setWalkingState = (index) => {
    setActiveType(index);
    setCurrentType('walking');
  };

  const setCyclingState = (index) => {
    setActiveType(index);
    setCurrentType('cycling');
  };

  const setDrivingState = (index) => {
    setActiveType(index);
    setCurrentType('driving');
  };

  const setUserTypes = (type, index) => {
    if (type === 'walking') setWalkingState(index);
    else if (type === 'cycling') setCyclingState(index);
    else if (type === 'driving') setDrivingState(index);
  };

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

  useEffect(() => {
    setEcoCounterLabels(labelsHour);
    ecoCounterHour.forEach((el3) => {
      if (el3.location === stationId && currentType === 'walking') {
        setChannel1Counts(el3.values_jk);
        setChannel2Counts(el3.values_jp);
        setChannelTotals(el3.values_jt);
      } else if (el3.location === stationId && currentType === 'cycling') {
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

  useEffect(() => {
    setChannelData();
  }, [currentType, currentTime]);

  return (
    <div className={classes.ecocounterContent}>
      <div className={classes.ecocounterUserTypes}>
        {userTypes.map((userType, i) => (
          <div key={userType.type.user}>
            <button
              type="button"
              className={i === activeType ? `${classes.buttonActive}` : `${classes.buttonWhite}`}
              onClick={() => setUserTypes(userType.type.user, i)}
            >
              <img src={userType.type.icon} width="30px" height="30px" alt="user type" />
            </button>
            <p className={classes.usertypeText}>{userType.type.text}</p>
          </div>
        ))}
      </div>
      <div className={classes.ecocounterChart}>
        <LineChart
          labels={ecoCounterLabels}
          labelChannel1="Keskustaan"
          labelChannel2="Keskustasta"
          labelChannelTotal="Yhteensä"
          channelTotalsData={channelTotals}
          channel1Data={channel1Counts}
          channel2Data={channel2Counts}
        />
      </div>
      <div className={classes.ecocounterSteps}>
        <div>
          {buttonSteps.map((timing, i) => (
            <button
              key={timing.step.type}
              type="button"
              className={i === activeStep ? `${classes.buttonActive}` : `${classes.buttonWhite}`}
              onClick={() => handleClick(timing.step.type, i, stationId)}
            >
              {timing.step.text}
            </button>
          ))}
        </div>
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
};

EcoCounterContent.defaultProps = {
  stationId: 0,
  ecoCounterHour: [],
  ecoCounterDay: [],
  ecoCounterWeek: [],
  ecoCounterMonth: [],
};

export default EcoCounterContent;
