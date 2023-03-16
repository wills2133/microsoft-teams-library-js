import { app, monetization, Cart } from '../../teams-js/src';
import React, { ReactElement } from 'react';

import { ApiWithoutInput, ApiWithTextInput } from './utils';
import { ModuleWrapper } from './utils/ModuleWrapper';
import { isTestBackCompat } from './utils/isTestBackCompat';

const GetCart = (): ReactElement =>
  ApiWithoutInput({
    name: 'getCart',
    title: 'Get Cart',
    onClick: {
      withPromise: async () => {
        const cart = await monetization.marketplace.getCart();
        return JSON.stringify(cart);
      },
      withCallback: null
    },
  });

  const SetCart = (): ReactElement =>
    ApiWithTextInput<Cart>({
      name: 'SetCart',
      title: 'SetCart',
      onClick: {
        validateInput: (input) => {
          if (!input) {
            throw new Error('input is undefined');
          }
        },
        submit: async (cart, setResult) => {
          let result: boolean;
          if (isTestBackCompat()) {
            result = await monetization.marketplace.setCart(cart);
          } else {
            result = await monetization.marketplace.setCart(cart);
          }
          const msg = `Teams client set cart ${result ? 'succeeded' : 'failed'}`;
          setResult(msg);
          return msg;
        },
      },
    });

const CartAPIs = (): ReactElement => (
  <ModuleWrapper title="Cart">
    <GetCart />
    <SetCart />
  </ModuleWrapper>
);

export default CartAPIs;

