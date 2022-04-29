import { Avatar, Box, Flex, Text, VStack } from '@chakra-ui/react';
import { format } from 'date-fns';
import dynamic from 'next/dynamic';
import NextImage from 'next/image';
import { HiOutlineCalendar } from 'react-icons/hi';
import { Event, useUserOneQuery } from '../../../../generated/graphql';

const StaticMap = dynamic(() => import('./StaticMap'), { ssr: false });

type Props = Pick<Event, 'longitude' | 'latitude' | 'address' | 'dateFrom' | 'dateTo' | 'authorUsername'> & {
  isSticky?: boolean;
};

export default function EventSideInfo({
  dateFrom,
  dateTo,
  authorUsername,
  address,
  longitude,
  latitude,
  isSticky,
}: Props) {
  const { data } = useUserOneQuery({ variables: { username: authorUsername } });

  return (
    <Flex
      flex={1}
      ml={{ xl: 20 }}
      direction={'column'}
      gap={5}
      position={isSticky ? { md: 'sticky' } : {}}
      height={'min-content'}
    >
      <Box>
        <Text fontSize={'lg'} fontWeight={'bold'} mb={2}>
          Host
        </Text>
        <Flex>
          {data?.user.imageUrl ? (
            <Box position={'relative'} width={'50px'} height={'50px'} rounded={'full'} overflow={'hidden'}>
              <NextImage src={'data?.user.imageUrl'} layout={'fill'} objectFit={'cover'} />
            </Box>
          ) : (
            <Avatar size={'md'} />
          )}
          <Box ml="3">
            <Text fontSize={'lg'}>{data?.user.name}</Text>
            <Text fontSize="sm">@{authorUsername}</Text>
          </Box>
        </Flex>
      </Box>

      <Box p={3} bg={'white'} shadow={'md'} rounded={'lg'}>
        <Text fontSize={'lg'} fontWeight={'bold'} mb={2} display={'flex'} gap={2} alignItems={'center'}>
          <HiOutlineCalendar />
          Date & time
        </Text>
        <VStack spacing={4}>
          <Flex width={'100%'} alignItems={'flex-start'} gap={3}>
            <Box>
              <Text>Start:</Text>
              {dateTo && <Text>End:</Text>}
            </Box>
            <Box>
              <Text>{format(new Date(dateFrom), 'PPpp')}</Text>
              {dateTo && <Text>{format(new Date(dateTo), 'PPpp')}</Text>}
            </Box>
          </Flex>
        </VStack>
      </Box>

      <StaticMap address={address} longitude={longitude} latitude={latitude} />
    </Flex>
  );
}
