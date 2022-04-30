import {
  IconButton,
  Link,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverHeader,
  Tooltip,
  useMediaQuery,
} from '@chakra-ui/react';
import { HiBell, HiCog } from 'react-icons/hi';
import NotificationTabs from '../../../Notifications/NotificationTabs';
import NotificationsButton from './NotificationsButton';
import { useNotifications } from './useNotifications';
import NextLink from 'next/link';
import { useRouter } from 'next/router';

export default function Notifications() {
  const { uncheckedRequests, responses } = useNotifications();
  const hasUpdates = uncheckedRequests.length > 0 || responses.length > 0;
  const [isMobile] = useMediaQuery('(max-width: 600px)');
  const router = useRouter();
  return (
    <>
      {isMobile ? (
        <NextLink href={`${router.basePath}/notifications`} passHref>
          <Link
            variant={'button'}
            fontSize={'2xl'}
            position={'relative'}
            _before={
              hasUpdates
                ? {
                    content: "''",
                    width: 2.5,
                    height: 2.5,
                    position: 'absolute',
                    rounded: 'full',
                    bg: 'primary',
                    right: 0,
                  }
                : {}
            }
          >
            <HiBell />
          </Link>
        </NextLink>
      ) : (
        <Popover placement="top-start" closeOnBlur={true}>
          <NotificationsButton hasUpdates={hasUpdates} />
          <PopoverContent width={{ base: 'auto', md: 400 }} maxHeight={'90vh'}>
            <PopoverHeader
              fontWeight="semibold"
              justifyContent={'space-between'}
              alignItems={'center'}
              display={'flex'}
            >
              Notifications
              <Tooltip label="Not available yet" shouldWrapChildren mt="2" rounded={'md'} p={2}>
                <IconButton aria-label="Notification settings" icon={<HiCog />} variant={'ghost'} disabled />
              </Tooltip>
            </PopoverHeader>
            <PopoverBody overflowY={'auto'}>
              <NotificationTabs />
            </PopoverBody>
          </PopoverContent>
        </Popover>
      )}
    </>
  );
}
