import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import EmptySearch from '../../assets/icons/empty_search.svg';
import Info from '../../assets/icons/info.svg';
import Username from '../../assets/icons/username.svg';
import Password from '../../assets/icons/password.svg';
import Home from '../../assets/icons/home.svg';
import Job from '../../assets/icons/job.svg';
import Booking from '../../assets/icons/booking.svg';
import Calendar from '../../assets/icons/calendar.svg';
import Settings from '../../assets/icons/setting.svg';
import Menu from '../../assets/icons/menu.svg';
import ArrowForward from '../../assets/icons/arrow-forward.svg';
import Back from '../../assets/icons/back.svg';
import Edit from '../../assets/icons/edit.svg';
import Clock from '../../assets/icons/clock.svg';
import Location from '../../assets/icons/location.svg';
import CalendarOutline from '../../assets/icons/calendar-outline.svg';
import Close from '../../assets/icons/close.svg';
import Tick from '../../assets/icons/tick_.svg';
import Colors from '../../constants/Colors';

const Icon = ({name, size, color = Colors.error}) => {
  switch (name) {
    case 'username':
      return <Username width={size} height={size} fill={color} />;
    case 'home':
      return <Home width={size} height={size} fill={color} />;
    case 'Jobs':
      return <Job width={size} height={size} fill={color} />;
    case 'Settings':
      return <Settings width={size} height={size} fill={color} />;
    case 'Bookings':
      return <Booking width={size} height={size} fill={color} />;
    case 'calendar':
      return <Calendar width={size} height={size} fill={color} />;
    case 'password':
      return <Password width={size} height={size} fill={color} />;
    case 'info':
      return <Info width={size} height={size} fill={color} />;
    case 'menu':
      return <Menu width={size} height={size} fill={color} />;
    case 'back':
      return <Back width={size} height={size} fill={color} />;
    case 'edit':
      return <Edit width={size} height={size} />;
    case 'arrow-forward':
      return <ArrowForward width={size} height={size} fill={color} />;
    case 'clock':
      return <Clock width={size} height={size} />;
    case 'calendar-outline':
      return <CalendarOutline width={size} height={size} fill={color} />;
    case 'map':
      return <Location width={size} height={size} />;
    case 'tick':
      return <Tick width={size} height={size} />;
    case 'cross':
      return <Close width={size} height={size} />;
    default:
      return <EmptySearch width={size} height={size} />;
  }
};

export default Icon;

const styles = StyleSheet.create({});
