import { Popover, PopoverBody, PopoverCloseButton, PopoverContent, PopoverHeader } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import NotificationTabs from '../../../Notifications/NotificationTabs';
import NotificationsButton from './NotificationsButton';
import { useNotifications } from './useNotifications';

export default function Notifications() {
  const { uncheckedRequests, responses } = useNotifications();
  const hasUpdates = uncheckedRequests.length > 0 || responses.length > 0;
  const router = useRouter();
  return (
    <Popover>
      <NotificationsButton hasUpdates={hasUpdates} />
      <PopoverContent width={{ base: '100vw', md: 400 }} maxHeight={'90vh'}>
        <PopoverHeader fontWeight="semibold" justifyContent={'space-between'} alignItems={'center'} display={'flex'}>
          Notifications
        </PopoverHeader>
        <PopoverCloseButton size={'md'} />
        <PopoverBody overflowY={'auto'}>
          <NotificationTabs />
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}
