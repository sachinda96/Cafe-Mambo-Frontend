// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
};

export const BASE_URL = 'http://localhost:8080'; //'http://yjv1g.mocklab.io'; //;
export const CLOUD_API_URL = '';
export const AUTH_API = '';
export const ITEMS_LIST_URL = '';
export const ITEMS_PER_PAGE_COUNT = 9;

export const DASHBOARD = 'dashboard';
export const SITE = '';

//Pay Here Constants
export const MERCHANT_ID = '1218370';
export const RETURN_URL = 'http://localhost:4200/';
export const SHOP_ORDER_RETURN_URL = 'http://localhost:4200/shoporder/';
export const NOTIFY_URL = '';
export const CANCEL_URL = '';
export const SECRET_KEY = '4TrWQT1xQe38W2QiBGA8KT4p5V7MTvGZa8LWN9YV0MpF';

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
