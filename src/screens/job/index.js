import {
  FlatList,
  SectionList,
  StyleSheet,
  RefreshControl,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import Container from '../../components/Container';
import {useDispatch, useSelector} from 'react-redux';
import {clearJobClick, userSelector} from '../../features/Auth/AuthSlice';
import {
  clearJobState,
  getJobList,
  jobSelector,
  updateJobStatus,
} from '../../features/Jobs/JobSlice';
import {useFocusEffect} from '@react-navigation/native';
import NormalText from '../../components/Text/NormalText';
import moment from 'moment';
import Colors from '../../constants/Colors';
import {FontSize} from '../../constants/Fonts';
import JobItem from '../../components/Card/JobItem';
import {HeaderHeight} from '../../styles';
import InnerHeader from '../../components/Header/innerHeader';
import {scaleSize} from '../../utils';
import EmptyElement from '../../components/Empty';
import JobSkeleton from '../../components/Skeletons/JobSkeleton';
import {FlashList} from '@shopify/flash-list';
import {
  useListJobsQuery,
  useUpdateJobStatusMutation,
} from '../../rtk/api/jobApi';

const Jobs = () => {
  const dispatch = useDispatch();
  const [jobData, setJobData] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const {userId, userAgencyDomain} = useSelector(userSelector);
  const [selectedJobMainIndex, setSelectedJobMainIndex] = useState(0);
  const [selectedJobIndex, setSelectedJobIndex] = useState(0);
  const [selectedJobStatus, setSelectedJobStatus] = useState('');
  const [isJobCancelled, setIsJobCancelled] = useState(false);
  const [isJobAccepted, setIsJobAccepted] = useState(false);
  const [isExtraDataChanged, setIsExtraDataChanged] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const {data, isSuccess, isError, isFetching, error, isLoading, refetch} =
    useListJobsQuery({
      baseUrl: userAgencyDomain,
      modelid: userId,
      pageno: pageNo,
    });

  const [updateJobStatus, {isFetching: jobStatusSubmitting, data: updateData}] =
    useUpdateJobStatusMutation();

  const loadData = () => {
    refetch();
  };

  useFocusEffect(
    useCallback(() => {
      dispatch(clearJobClick());
    }, []),
  );

  useEffect(() => {
    if (data) {
      console.log('dataa', data);
      setJobData(data);
      setIsJobCancelled(false);
      setIsJobAccepted(false);
      setIsExtraDataChanged(!isExtraDataChanged);
    }
  }, [data, isSuccess, refetch]);

  useEffect(() => {
    if (updateData) {
      // loadData();
      // setIsJobCancelled(false);
      // setIsJobAccepted(false);
      // let temData = JSON.parse(JSON.stringify(jobData));
      // let dataToBeUpdated =
      //   temData[selectedJobMainIndex].data[selectedJobIndex];
      // if (selectedJobStatus === 'A') {
      //   dataToBeUpdated.jobAccept = 'A';
      //   setIsJobAccepted(false);
      // } else {
      //   dataToBeUpdated.jobAccept = 'R';
      //   setIsJobCancelled(false);
      // }
      // setJobData(temData);
      // setIsExtraDataChanged(!isExtraDataChanged);
    }
  }, [updateData]);

  const onAcceptClick = async (itemId, index, mainIndex) => {
    setIsExtraDataChanged(!isExtraDataChanged);
    setSelectedJobIndex(index);
    setSelectedJobMainIndex(mainIndex);
    setSelectedJobStatus('A');
    setIsJobAccepted(true);
    await updateJobStatus({
      baseUrl: userAgencyDomain,
      jobId: itemId,
      status: 'A',
      userId: userId,
    });
  };

  const onCancelClick = async (itemId, index, mainIndex) => {
    setIsExtraDataChanged(!isExtraDataChanged);
    setSelectedJobIndex(index);
    setSelectedJobMainIndex(mainIndex);
    setSelectedJobStatus('N');
    setIsJobCancelled(true);
    await updateJobStatus({
      baseUrl: userAgencyDomain,
      jobId: itemId,
      status: 'R',
      userId: userId,
    });
  };

  const onRefresh = () => {
    setRefreshing(true);

    setTimeout(() => {
      loadData();
      setRefreshing(false);
    }, 2000);
  };

  const renderHeader = title => {
    let formattedDate = moment(title, 'MM-YYYY').format('MMM YYYY');
    return (
      <NormalText
        colorLight={Colors.primaryColor}
        fontSize={FontSize.large}
        text={formattedDate}
        fontWeight={600}
      />
    );
  };

  const renderList = ({section, index}) => {
    let i = index;
    if (index !== 0) return null;
    return (
      <View style={{height: '100%', width: '100%'}}>
        <FlashList
          estimatedItemSize={100}
          showsVerticalScrollIndicator={false}
          data={section.data}
          renderItem={({item, index}) => {
            return (
              <JobItem
                key={item.id}
                item={item}
                index={index}
                onAcceptClick={() => onAcceptClick(item.jobId, index, i)}
                onCancelClick={() => onCancelClick(item.jobId, index, i)}
                isJobStatusUpdating={isJobAccepted}
                isJobCancelled={isJobCancelled}
              />
            );
          }}
          keyExtractor={item => String(item.id)}
          extraData={isExtraDataChanged}
        />
      </View>
    );
  };

  return (
    <Container statusBar={true} paddingBottom={false}>
      <View style={{flex: 1}}>
        <View style={{height: HeaderHeight}}>
          <InnerHeader title={'Jobs'} />
        </View>
        <View flex={1}>
          {isLoading ? (
            <JobSkeleton />
          ) : jobData.length > 0 ? (
            <SectionList
              contentContainerStyle={{
                paddingHorizontal: scaleSize(20),
                paddingTop: scaleSize(20),
                paddingBottom: scaleSize(60),
              }}
              sections={jobData}
              keyExtractor={(item, index) => item + index}
              renderItem={renderList}
              stickySectionHeadersEnabled={false}
              renderSectionHeader={({section: {title}}) => renderHeader(title)}
              showsVerticalScrollIndicator={false}
              extraData={isExtraDataChanged}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
            />
          ) : (
            <EmptyElement page={'job'} />
          )}
        </View>
      </View>
    </Container>
  );
};

export default Jobs;

const styles = StyleSheet.create({});
