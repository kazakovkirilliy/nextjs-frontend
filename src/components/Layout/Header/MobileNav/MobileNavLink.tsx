import { Flex, Link } from '@chakra-ui/react';
import NextLink from 'next/link';
import router from 'next/router';
type Props = { href: string; label: string };

export default function MobileNavLink({ href, label }: Props) {
  return (
    <NextLink href={href} passHref key={label}>
      <Link style={{ textDecoration: 'none' }} width={'100%'}>
        <Flex
          align="center"
          p="4"
          borderRadius="lg"
          role="group"
          cursor="pointer"
          _hover={{
            bg: 'primary',
            color: 'white',
          }}
          bg={router.pathname.startsWith(href) ? 'pink.300' : 'transparent'}
        >
          {label}
        </Flex>
      </Link>
    </NextLink>
  );
}
