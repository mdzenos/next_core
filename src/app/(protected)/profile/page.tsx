import {
  ActivityTimeline,
  PreferenceGroup,
  ProfileOverviewCard,
  SettingsNavigationPanel,
} from '@/components/organisms';
import { TeamPortalTemplate } from '@/components/templates';

const navItems = [
  {
    key: 'profile',
    href: '/profile',
    label: 'Thong tin ca nhan',
    description: 'Cap nhat ho so va avatar',
    active: true,
  },
  {
    key: 'security',
    href: '/profile/security',
    label: 'Bao mat',
    description: 'Mat khau va xac minh',
  },
  {
    key: 'notifications',
    href: '/profile/notifications',
    label: 'Thong bao',
    description: 'Kenh nhan thong bao',
  },
];

const activities = [
  {
    id: 'a-1',
    title: 'Cap nhat thong tin ho so',
    description: 'Ban vua thay doi so dien thoai.',
    time: '2 gio truoc',
    tone: 'info' as const,
  },
  {
    id: 'a-2',
    title: 'Dang nhap thanh cong',
    description: 'Tu trinh duyet Chrome tren Windows.',
    time: 'Hom nay',
    tone: 'success' as const,
  },
];

const preferenceItems = [
  {
    id: 'email',
    label: 'Thong bao email',
    description: 'Nhan email cho su kien quan trong.',
    checked: true,
  },
  {
    id: 'push',
    label: 'Thong bao tren trinh duyet',
    description: 'Nhan thong bao realtime.',
    checked: false,
  },
];

export default function ProfilePage() {
  return (
    <TeamPortalTemplate
      title="Trang ca nhan"
      description="Quan ly ho so, hoat dong va tuy chinh thong bao tai khoan."
      badge="My Account"
      navigation={<SettingsNavigationPanel items={navItems} />}
      profileCard={
        <ProfileOverviewCard
          name="Nguyen Van A"
          role="Content Manager"
          bio="Quan ly noi dung va phat trien chat luong bai viet."
          badges={['Editor', 'Verified']}
        />
      }
      timeline={<ActivityTimeline items={activities} title="Hoat dong gan day" />}
      preferences={<PreferenceGroup title="Tuy chon thong bao" items={preferenceItems} />}
    />
  );
}
