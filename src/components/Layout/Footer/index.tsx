import { Flex, Stack, Text } from '@chakra-ui/react';
import NextImage from 'next/image';

export default function Footer() {
  return (
    <Flex
      as="footer"
      role="contentinfo"
      p={{ base: '4', md: '6' }}
      bg={'gray.100'}
      width={'100%'}
      justifyContent={'center'}
      mt={'auto'}
    >
      <Stack spacing={{ base: '4', md: '5' }}>
        <NextImage src="/cvut.svg" height={50} width={50} />
        <Text fontSize="sm" color="subtle" align={'center'}>
          &copy; {new Date().getFullYear()} Kirill Kazakov
        </Text>
      </Stack>
    </Flex>
  );
}
