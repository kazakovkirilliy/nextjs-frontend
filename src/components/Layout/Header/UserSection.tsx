import {
  Avatar,
  Button,
  Flex,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { HiBookmark, HiCollection, HiLogout } from 'react-icons/hi';

type Props = {
  name: string;
  username: string;
  imageUrl?: string | null;
};

export default function UserSection(props: Props) {
  const { name, username, imageUrl } = props;
  const [isOpen, setIsOpen] = useState(false);
  const open = () => setIsOpen(!isOpen);
  const close = () => setIsOpen(false);

  const router = useRouter();

  return (
    <>
      <Popover placement="top-start" isOpen={isOpen} onClose={close}>
        <PopoverTrigger>
          <Avatar size={'sm'} src={props.imageUrl ?? ''} cursor={'pointer'} onClick={open} />
        </PopoverTrigger>
        <PopoverContent width={{ base: 'auto', md: 300 }} maxHeight={'90vh'}>
          <PopoverHeader>
            <Flex justifyContent={'space-around'} flexDirection={'column'} alignItems={'center'} p={3} gap={2}>
              <Avatar size={'md'} src={imageUrl || ''} />
              <Text fontWeight={'bold'}>
                {name}
                <span style={{ fontSize: 'sm' }}>@{username}</span>
              </Text>
            </Flex>
          </PopoverHeader>
          <PopoverBody overflowY={'auto'} display={'flex'} gap={2}>
            <Button
              flex={1}
              display={'flex'}
              flexDirection={'column'}
              gap={2}
              variant={'outline'}
              p={2}
              height={'max-content'}
              _hover={{ bg: 'green.100' }}
              onClick={() => {
                router.push(`${router.basePath}/events/saved`);
                close();
              }}
            >
              <HiBookmark />
              Saved events
            </Button>
            <Button
              flex={1}
              display={'flex'}
              flexDirection={'column'}
              gap={2}
              variant={'outline'}
              p={2}
              height={'max-content'}
              _hover={{ bg: 'yellow.100' }}
              onClick={() => {
                router.push(`${router.basePath}/events/manage`);
                close();
              }}
            >
              <HiCollection />
              Manage events
            </Button>
          </PopoverBody>
          <PopoverFooter>
            <Button
              variant={'outline'}
              width={'100%'}
              display={'flex'}
              gap={2}
              fontWeight={'normal'}
              onClick={async () => {
                const setCookie = (await import('../../../lib/utils/setCookie')).default;
                setCookie('uid', '', 0);
                router.reload();
              }}
            >
              <HiLogout />
              Log out
            </Button>
          </PopoverFooter>
        </PopoverContent>
      </Popover>
    </>
  );
}
