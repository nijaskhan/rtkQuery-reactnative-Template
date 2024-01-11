import {Animated, Pressable, ScrollView, StyleSheet, Text} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import Container from '../../components/Container';
import Header from '../../components/Header';
import {WINDOW_HEIGHT, WINDOW_WIDTH, scaleFont, scaleSize} from '../../utils';
import {PARALAX_LIST, Spacing} from '../../constants/Layout';
import {FontSize} from '../../constants/Fonts';
import Colors from '../../constants/Colors';
import NormalText from '../../components/Text/NormalText';
import Carousel from 'react-native-reanimated-carousel';
import {useSharedValue} from 'react-native-reanimated';
import {useDispatch, useSelector} from 'react-redux';
import {
  setBookingClick,
  setJobClick,
  setTheme,
  userSelector,
} from '../../features/Auth/AuthSlice';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {
  clearHomeState,
  getHomeData,
  homeSelector,
} from '../../features/Home/HomeSlice';
import HomePageSkeleton from '../../components/Skeletons/HomePageSkeleton';
import JobSmallItem from '../../components/Card/JobSmallItem';
import EmptyElement from '../../components/Empty';
import BookingItem from '../../components/Card/BookingItem';
import Screens from '../../navigators';
import View from '../../components/View';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useListHomeQuery} from '../../rtk/api/homeApi';

const HEADER_HEIGHT = scaleFont(100);

const Home = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const offset = useRef(new Animated.Value(0)).current;
  const progressValue = useSharedValue(0);
  const {userName, userId, userAgencyDomain} = useSelector(userSelector);
  const [jobData, setJobData] = useState([]);
  const [bookingData, setBookingData] = useState([]);
  const [feedData, setFeedData] = useState([]);

  const baseOptions = {
    vertical: false,
    width: WINDOW_WIDTH,
    height: WINDOW_WIDTH * 0.6,
  };

  const {data, isSuccess, isError, isFetching, error, isLoading, refetch} =
    useListHomeQuery({
      baseUrl: userAgencyDomain,
      userId: userId,
    });

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, []),
  );

  useEffect(() => {
    if (data) {
      let homeListing = data.data;
      setJobData(homeListing.jobs);
      setBookingData(homeListing.booking);
      setFeedData(homeListing.feeds);
    }
  }, [data]);

  const header = () => {
    const scaleInterpolate = offset.interpolate({
      inputRange: [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
      outputRange: [1, 1, 0.8],
    });
    return (
      <Animated.View style={[styles.headerStyle]}>
        <NormalText
          text={'Hi ' + userName + ',\nWelcome'}
          fontSize={scaleFont(26)}
          colorLight={Colors.black}
          fontWeight={600}
          letterSpacing={0.5}
          noOfLines={2}
        />
      </Animated.View>
    );
  };

  const renderImageSlider = () => {
    return (
      <View
        style={{
          alignItems: 'center',
        }}>
        <Carousel
          {...baseOptions}
          loop
          pagingEnabled={true}
          snapEnabled={true}
          autoPlay={true}
          autoPlayInterval={1500}
          mode="parallax"
          modeConfig={{
            parallaxScrollingScale: 0.89,
            parallaxScrollingOffset: 50,
          }}
          data={feedData}
          renderItem={({item, index}) => {
            return (
              <View key={item.id} style={styles.sliderContainer}>
                <Pressable style={[styles.itemContainer]}>
                  <Animated.Image
                    source={{
                      uri: item.feedImage,
                    }}
                    style={styles.imageSlider}
                    alt="image"
                  />
                </Pressable>
              </View>
            );
          }}
          style={{
            width: WINDOW_WIDTH,
          }}
          onProgressChange={(_, absoluteProgress) =>
            (progressValue.value = absoluteProgress)
          }
        />
      </View>
    );
  };

  const onJobItemClick = () => {
    dispatch(setJobClick());
    navigation.navigate(Screens.JOBS);
  };

  const onBookingItemClick = () => {
    dispatch(setBookingClick());
    navigation.navigate(Screens.BOOKINGS);
  };

  return (
    <Container statusBar={true}>
      <Header title="Staragent" />
      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: scaleSize(40),
        }}>
        {header()}
        {renderImageSlider()}
        {isLoading ? (
          <HomePageSkeleton />
        ) : (
          <View style={{paddingHorizontal: scaleSize(20)}}>
            <View style={{paddingTop: Spacing.small}}>
              <NormalText
                colorLight={Colors.primaryColor}
                fontSize={FontSize.large}
                text={'My Jobs'}
                fontWeight={600}
                props={{marginTop: scaleSize(15), marginBottom: scaleSize(10)}}
              />
              {jobData.length > 0 ? (
                jobData.map((item, index) => (
                  <JobSmallItem
                    index={index}
                    item={item}
                    key={'jobs_' + index}
                    onPress={() => onJobItemClick()}
                  />
                ))
              ) : (
                <EmptyElement page={'home_job'} />
              )}
            </View>
            <View
              style={{
                paddingTop: Spacing.small,
                marginTop: Spacing.small,
              }}>
              <NormalText
                colorLight={Colors.primaryColor}
                fontSize={FontSize.large}
                text={'My Bookings'}
                fontWeight={600}
                props={{marginTop: scaleSize(15), marginBottom: scaleSize(10)}}
              />
              {bookingData.length > 0 ? (
                bookingData.map((item, index) => (
                  <BookingItem
                    index={index}
                    item={item}
                    key={'booking_' + index}
                    onPress={() => onBookingItemClick()}
                  />
                ))
              ) : (
                <EmptyElement page={'home_job'} />
              )}
            </View>
          </View>
        )}
      </Animated.ScrollView>
    </Container>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0492F2',
    flex: 1,
    alignItems: 'center',
  },
  logo: {
    height: 100,
    width: 100,
    marginTop: WINDOW_HEIGHT / 2 - 100,
  },
  shadow: {
    backgroundColor: '#fff',
    width: '100%',
    height: 1,
    shadowColor: '#000',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 5,
  },
  itemContainer: {
    width: WINDOW_WIDTH,
    height: WINDOW_WIDTH * 0.6,
    // marginLeft: PARALAX_LIST.SPACING,
    borderRadius: 5,
    overflow: 'hidden',
  },
  mainText: {
    color: 'white',
    fontSize: FontSize.large,
    fontFamily: 'Rubik-SemiBold',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
  },
  headerStyle: {
    height: HEADER_HEIGHT,
    justifyContent: 'center',
    alignItems: 'flex-start',
    alignContent: 'flex-start',
    paddingHorizontal: scaleSize(20),
  },
  sliderContainer: {
    paddingVertical: Spacing.medium,
  },
  imageSlider: {
    width: WINDOW_WIDTH,
    height: WINDOW_WIDTH * 0.7,
    backgroundColor: Colors.acceptedColor,
  },
});
