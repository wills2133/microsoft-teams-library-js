import { app, Context, executeDeepLink, getContext, monetization } from '../../teams-js/src';
import React, { ReactElement } from 'react';

import { ApiWithoutInput, ApiWithTextInput } from './utils';
import { ModuleWrapper } from './utils/ModuleWrapper';

const GetContext = (): ReactElement =>
  ApiWithoutInput({
    name: 'getCart',
    title: 'Get Cart',
    onClick: {
      withPromise: async () => {
        const context = await monetization.marketplace.getCart();
        return JSON.stringify(context);
      },
      withCallback: (setResult) => {
        const callback = (context: Context): void => {
          setResult(JSON.stringify(context));
        };
        getContext(callback);
      },
    },
  });


const CartAPIs = (): ReactElement => (
  <ModuleWrapper title="Cart">
    <GetContext />
  </ModuleWrapper>
);

export default CartAPIs;
