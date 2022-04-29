import { Box, Button, CloseButton, Flex, Link, List, ListItem, Text, VStack } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { links } from '../links';
import MobileNavLink from './MobileNavLink';

type Props = {
  onClose: () => void;
};

export default function MobileNav({ onClose }: Props) {
  const router = useRouter();
  return (
    <Box
      transition="3s ease"
      borderRight="1px"
      borderRightColor={'gray.200'}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text bgGradient={'linear(to-r, red.400,pink.400)'} bgClip="text" fontSize="2xl" fontWeight="bold">
          Potka
        </Text>
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      <VStack height={'100%'} mx="8">
        {links.map((l) => (
          <MobileNavLink {...l} key={l.label} />
        ))}
        <MobileNavLink href={`${router.basePath}/notifications`} label={'Notifications'} />
      </VStack>
    </Box>
  );
}
