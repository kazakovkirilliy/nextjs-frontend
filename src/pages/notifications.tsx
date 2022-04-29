import dynamic from 'next/dynamic';

const NotificationTabs = dynamic(() => import('../components/Notifications/NotificationTabs'), { ssr: false });

type Props = {};

export default function Notifications(props: Props) {
  return <NotificationTabs />;
}
