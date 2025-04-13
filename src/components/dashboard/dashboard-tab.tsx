'use client';
import { ROUTES } from '@/constants/path.constant';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

interface NavigationTab {
  key: string;
  label: string;
  route: string;
}
const DashboardTab = () => {
  const tabs: NavigationTab[] = [
    { key: 'my-cards', label: '내 명함', route: ROUTES.DASHBOARD.MYCARDS },
    { key: 'account', label: '계정 설정', route: ROUTES.DASHBOARD.ACCOUNT },
  ];

  const pathname = usePathname();
  const activeTab =
    tabs.find((tab) => pathname?.startsWith(tab.route))?.key || tabs[0].key;

  // TODO: 아이콘 추가
  return (
    <div
      className='mt-11 flex flex-col text-label2-medium text-gray-70'
      role='tablist'
      aria-label='대시보드 탭'
    >
      {tabs.map((tab) => {
        const isSelected = activeTab === tab.key;
        return (
          <Link
            key={tab.key}
            href={tab.route}
            role='tab'
            aria-selected={isSelected}
            className={`px-4 py-2 rounded-md transition-colors ${isSelected ? `bg-gray-5 text-label2-medium text-black` : `hover:bg-gray-5`}`}
          >
            {tab.label}
          </Link>
        );
      })}
    </div>
  );
};

export default DashboardTab;
