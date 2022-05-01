import { Text, Link } from '@chakra-ui/react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';

type Props = { href: string; label: string; icon?: JSX.Element; onClick: () => void };

export default function MobileNavLink({ href, label, icon, onClick }: Props) {
  const router = useRouter();
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
        onClick={() => onClick()}
      >
        <Text color={router.pathname.startsWith(href) ? 'gray.700' : 'gray.500'}>{icon}</Text>
        {label}
      </Link>
    </NextLink>
  );
}
