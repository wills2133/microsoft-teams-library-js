import React, { ReactElement } from 'react';

import { Cart, marketplace } from '../../teams-js/src';
import { ApiWithoutInput, ApiWithTextInput } from './utils';
import { ModuleWrapper } from './utils/ModuleWrapper';

const GetCart = (): ReactElement =>
  ApiWithoutInput({
    name: 'getCart',
    title: 'Get Cart',
    onClick: {
      withPromise: async () => {
        const cart = await marketplace.getCart();
        return JSON.stringify(cart);
      },
      withCallback: null,
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
        const result = await marketplace.setCart(cart);
        const msg = `Teams client set cart ${result ? 'succeeded' : 'failed'}`;
        setResult(msg);
        return msg;
      },
    },
  });

const CheckMarketplaceCapability = (): ReactElement =>
  ApiWithoutInput({
    name: 'checkCapabilityMarketplace',
    title: 'Check Capability Marketplace',
    onClick: async () => {
      if (marketplace.isSupported()) {
        return 'Marketplace capability is supported';
      } else {
        return 'Marketplace capability is not supported';
      }
    },
  });

const CartAPIs = (): ReactElement => (
  <ModuleWrapper title="Cart">
    <CheckMarketplaceCapability />
    <GetCart />
    <SetCart />
  </ModuleWrapper>
);

export default CartAPIs;
