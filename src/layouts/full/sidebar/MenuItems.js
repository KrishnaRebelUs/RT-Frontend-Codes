import { color } from '@mui/system';
import {
 IconLayoutDashboard,IconChartHistogram, IconClock ,IconGraph,IconReceipt2,IconFileDollar , IconSettingsDollar , IconUsers ,IconDownload ,
 IconExternalLink , IconRobot

} from '@tabler/icons-react';

import { uniqueId } from 'lodash';
import { Children } from 'react';

const Menuitems = [
  {
    id: uniqueId(),
    title: 'Dashboard',
    icon: IconLayoutDashboard,
    href: '/dashboard',
  },
  {
    id: uniqueId(),
    title: 'Excess Coop Billing',
    icon: IconChartHistogram,
    href: '/excess-coop-billing',
  },
  {
    id: uniqueId(),
    title: 'Shortage Claim',
    icon: IconClock,
    href: '/shortage-claim',
  },
  {
    id: uniqueId(),
    title: 'P&L Analysis',
    icon:  IconGraph,
     href: '/P&l-analysis',
  },
  {
    id: uniqueId(),
    title: 'Price Claim',
    icon:  IconReceipt2,
    href: '/price-claim',
  },
  
  {
    id: uniqueId(),
    title: 'Missed Invoicing',
    icon: IconFileDollar,
    href: '/missed-invoicing',
  },

  {
    id: uniqueId(),
    title: 'Ops Chargeback',
    icon: IconSettingsDollar,
    href: '/ops-chargeback',
  },

  {
    id: uniqueId(),
    title: 'Internal Links',
    icon: IconExternalLink,
    children: [
      {
      id: uniqueId(),
      title: 'Machine logs',
      icon: IconRobot,
      href: '/Machine-Logs',
    }
  ]
  },

  {
    id: uniqueId(),
    title: 'Download Manager',
    icon: IconDownload,
    href: '/download-manager',
  },
  {
    id: uniqueId(),
    title: 'Manage Access',
    icon: IconUsers,
    href: '/manage-access',
  },
 
 
];

export default Menuitems;
