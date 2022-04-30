import { Text, Link } from '@chakra-ui/react';
import NextLink from 'next/link';
import router from 'next/router';
type Props = { href: string; label: string; icon?: JSX.Element };

export default function MobileNavLink({ href, label, icon }: Props) {
  return (
    <NextLink href={href} passHref key={label}>
      <Link
        display={'flex'}
        style={{ textDecoration: 'none' }}
        width={'100%'}
        alignItems="center"
        fontWeight={router.pathname.startsWith(href) ? 'bold' : 'medium'}
        color={'gray.700'}
        gap={2}
        fontSize={'lg'}
        py={2}
      >
        <Text color={router.pathname.startsWith(href) ? 'gray.700' : 'gray.500'}>{icon}</Text>
        {label}
      </Link>
    </NextLink>
  );
}
