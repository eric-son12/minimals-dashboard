import {
  analyticsIcon,
  dashboardIcon,
  ecommerceIcon,
  invoiceIcon,
  locationIcon,
  orderIcon,
  productIcon,
  supplierIcon,
  userIcon,
} from '../../shared/icon/icon';

export const MENU_ITEMS = [
  {
    title: 'Overview',
    items: [{ pathName: 'overview', text: 'Dashboard', icon: dashboardIcon }],
  },
  {
    title: 'Management',
    items: [
      { pathName: 'user', text: 'User', icon: userIcon },
      {
        pathName: 'product',
        text: 'Product',
        icon: productIcon,
        child: [
          {
            pathName: 'list',
            text: 'List',
            icon: productIcon,
          },
          {
            pathName: 'category',
            text: 'Category',
            icon: productIcon,
          },
          {
            pathName: 'variant',
            text: 'Variant',
            icon: productIcon,
          },
        ],
      },
      { pathName: 'order', text: 'Order', icon: orderIcon },
      { pathName: 'invoice', text: 'Invoice', icon: invoiceIcon },
      {
        pathName: 'location',
        text: 'Location',
        icon: locationIcon,
      },
      { pathName: 'supplier', text: 'Supplier', icon: ecommerceIcon },
      {
        pathName: 'customer',
        text: 'Customer',
        icon: supplierIcon,
      },
    ],
  },
  {
    title: 'Reports',
    items: [{ pathName: 'analytics', text: 'Analytics', icon: analyticsIcon }],
  },
];
