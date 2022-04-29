import { Tabs, TabList, Tab, TabPanels, TabPanel, Text } from '@chakra-ui/react';
import { HiOutlineArrowSmUp, HiOutlineArrowSmDown } from 'react-icons/hi';
import EnrollmentRequestCard from '../Layout/Header/Notifications/EnrollmentRequests/EnrollmentRequestCard';
import EnrollmentResponseCard from '../Layout/Header/Notifications/EnrollmentResponses/EnrollmentResponseCard';
import { useNotifications } from '../Layout/Header/Notifications/useNotifications';

export default function NotificationTabs() {
  const { uncheckedRequests, removeRequest, responses, removeResponse } = useNotifications();
  return (
    <Tabs size={'sm'} variant={'unstyled'} isFitted>
      <TabList>
        <Tab
          _selected={{ bg: 'gray.100' }}
          _active={{ bg: 'transparent' }}
          gap={1}
          border={'1px solid'}
          borderColor={'gray.200'}
          roundedLeft={'md'}
        >
          <HiOutlineArrowSmUp />
          Requests
          <Text fontWeight={'bold'}>{uncheckedRequests.length}</Text>
        </Tab>
        <Tab
          _selected={{ bg: 'gray.100' }}
          _active={{ bg: 'transparent' }}
          gap={1}
          border={'1px solid'}
          borderColor={'gray.200'}
          roundedRight={'md'}
        >
          <HiOutlineArrowSmDown />
          Responses
          <Text fontWeight={'bold'}>{responses.length}</Text>
        </Tab>
      </TabList>

      <TabPanels>
        <TabPanel>
          {uncheckedRequests.map((req, i) => (
            <EnrollmentRequestCard
              key={`${req.eventId}-${req.username}-${i}`}
              eventId={req.eventId}
              username={req.username}
              removeRequest={() => removeRequest(req)}
            />
          ))}
        </TabPanel>
        <TabPanel>
          {responses.map((res, i) => (
            <EnrollmentResponseCard
              key={`${res.eventId}-${res.username}-${i}`}
              eventId={res.eventId}
              state={res.state}
              removeResponse={() => removeResponse(res)}
            />
          ))}
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}
