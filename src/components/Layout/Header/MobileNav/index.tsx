import { Box, CloseButton, Flex, Link, Text, VStack } from '@chakra-ui/react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { MdAddCircle } from 'react-icons/md';
import { links } from '../links';
import MobileNavLink from './MobileNavLink';

type Props = {
  onClose: () => void;
};

export default function MobileNav({ onClose }: Props) {
  const router = useRouter();
  return (
    <Box transition="3s ease" borderRight="1px" borderRightColor={'gray.200'} pos="fixed" h="full" w="full">
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text bgGradient={'linear(to-r, red.400,pink.400)'} bgClip="text" fontSize="2xl" fontWeight="bold">
          Potka
        </Text>
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      <VStack height={'100%'} mx="8" spacing={4}>
        <NextLink href={`${router.basePath}/events/create/general`} passHref>
          <Link
            display={'flex'}
            alignItems={'center'}
            justifyContent={'center'}
            gap={2}
            rounded={'md'}
            bgGradient={'linear(to-r, red.400,pink.400)'}
            _hover={{
              shadow: 'md',
              opacity: '0.9',
            }}
            _active={{ opacity: '0.9' }}
            color={'white'}
            type={'submit'}
            width={'full'}
            p={2}
          >
            <MdAddCircle /> Create event
          </Link>
        </NextLink>
        {links.map((l) => (
          <MobileNavLink {...l} key={l.label} />
        ))}
      </VStack>
    </Box>
  );
}
