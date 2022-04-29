import { IconButton, Popover, PopoverBody, PopoverContent, PopoverHeader, Tooltip } from '@chakra-ui/react';
import { HiCog } from 'react-icons/hi';
import NotificationTabs from '../../../Notifications/NotificationTabs';
import NotificationsButton from './NotificationsButton';
import { useNotifications } from './useNotifications';

export default function Notifications() {
  const { uncheckedRequests, responses } = useNotifications();
  const hasUpdates = uncheckedRequests.length > 0 || responses.length > 0;
  return (
    <Popover placement="top-start" closeOnBlur={true}>
      <NotificationsButton hasUpdates={hasUpdates} />
      <PopoverContent width={{ base: 'auto', md: 400 }} maxHeight={'90vh'}>
        <PopoverHeader fontWeight="semibold" justifyContent={'space-between'} alignItems={'center'} display={'flex'}>
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
  );
}
