import { Flex, Heading, VStack, Text, Link } from '@chakra-ui/react';
import React from 'react';
import Footer from '../Layout/Footer';
import NextLink from 'next/link';

type Props = { title?: string; subtext?: string; actionHref?: string; actionText?: string; children?: React.ReactNode };

export default function AuthWrapper({ title, subtext, actionHref, actionText, children }: Props) {
  return (
    <>
      <VStack spacing="6" m={'auto'} p={10}>
        <VStack spacing="6">
          <VStack spacing={{ base: '2', md: '3' }} textAlign="center">
            <Heading size={'lg'}>{title}</Heading>
            <Flex gap={2}>
              <Text>{subtext}</Text>
              <NextLink href={actionHref || '#'} passHref>
                <Link bgGradient={'linear(to-r, red.400,pink.400)'} bgClip="text" fontWeight={'bold'}>
                  {actionText}
                </Link>
              </NextLink>
            </Flex>
          </VStack>
        </VStack>
        {children}
      </VStack>
      <Footer />
    </>
  );
}
