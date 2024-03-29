import {
  Button,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  Flex,
  IconButton,
  Link,
  Stack,
  useDisclosure,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { HiOutlineMenuAlt2 } from 'react-icons/hi';
import { useMeQuery } from '../../../generated/graphql';
import DesktopNav from './DesktopNav';
import SidebarContent from './MobileNav';
import Notifications from './Notifications';
import UserSection from './UserSection';

export default function Header() {
  const { isOpen, onToggle, onClose } = useDisclosure();
  const { data } = useMeQuery();
  const router = useRouter();

  return (
    <>
      <Flex
        bg={'white'}
        color={'gray.600'}
        height={'8vh'}
        py={{ base: 2 }}
        px={{ base: 4, md: 10 }}
        borderBottom={1}
        borderStyle={'solid'}
        borderColor={'gray.200'}
        align={'center'}
      >
        <Flex flex={{ base: 1, md: 'auto' }} ml={{ base: -2 }} display={{ base: 'flex', md: 'none' }}>
          <IconButton
            onClick={onToggle}
            icon={<HiOutlineMenuAlt2 />}
            variant={'ghost'}
            aria-label={'Toggle navigation menu'}
            size={'lg'}
          />
        </Flex>
        <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }} alignItems={'center'}>
          <NextLink href={'/events'} passHref>
            <Link bgGradient={'linear(to-r, red.400,pink.400)'} bgClip="text" fontWeight={'bold'}>
              Potka
            </Link>
          </NextLink>

          <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
            <DesktopNav />
          </Flex>
        </Flex>

        {/* Right section */}
        <Stack flex={{ base: 1, md: 0 }} justify={'flex-end'} direction={'row'} spacing={6} alignItems={'center'}>
          {data && data.me ? (
            <>
              <Notifications />
              <UserSection name={data.me.name} username={data.me.username} imageUrl={data.me.imageUrl} />
              <NextLink href={'/events/create/general'} passHref>
                <Link
                  as={Button}
                  display={{
                    base: 'none',
                    md: router.pathname.includes('/events/create/') ? 'none' : 'inline-flex',
                  }}
                  fontSize={'sm'}
                  fontWeight={600}
                  color={'white'}
                  bg={'primary'}
                  _hover={{
                    bg: 'hprimary',
                  }}
                >
                  Create event
                </Link>
              </NextLink>
            </>
          ) : (
            <>
              <NextLink href={'/login'} passHref>
                <Button variant={'link'} fontSize={'sm'} fontWeight={400}>
                  Sign In
                </Button>
              </NextLink>
              <NextLink href={'/register'} passHref>
                <Link
                  as={Button}
                  display={{ base: 'none', md: 'inline-flex' }}
                  fontSize={'sm'}
                  fontWeight={600}
                  color={'white'}
                  bg={'primary'}
                  _hover={{
                    bg: 'hprimary',
                  }}
                >
                  Sign up
                </Link>
              </NextLink>
            </>
          )}
        </Stack>
      </Flex>

      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size={'xs'}
      >
        <DrawerOverlay />
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
    </>
  );
}
