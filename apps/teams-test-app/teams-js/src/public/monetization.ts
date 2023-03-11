import { sendAndHandleSdkError } from '../internal/communication';
import { ensureInitialized } from '../internal/internalAPIs';
import { callCallbackWithErrorOrResultOrNullFromPromiseAndReturnPromise, InputFunction } from '../internal/utils';
import { errorNotSupportedOnPlatform, FrameContexts } from './constants';
import { SdkError } from './interfaces';
import { runtime } from './runtime';

export namespace monetization {
  /**
   * @hidden
   * Data structure to represent a subscription plan.
   *
   * @internal
   * Limited to Microsoft-internal use
   */
  export interface PlanInfo {
    /**
     * @hidden
     * plan id
     */
    planId: string;
    /**
     * @hidden
     * term of the plan
     */
    term: string;
  }

  /**
   * @hidden
   * Open dialog to start user's purchase experience
   *
   * @param planInfo optional parameter. It contains info of the subscription plan pushed to users.
   * error can either contain an error of type SdkError, incase of an error, or null when get is successful
   * @returns Promise that will be resolved when the operation has completed or rejected with SdkError value
   *
   * @internal
   * Limited to Microsoft-internal use
   */
  export function openPurchaseExperience(planInfo?: PlanInfo): Promise<void>;
  /**
   * @deprecated
   * As of 2.0.0, please use {@link monetization.openPurchaseExperience monetization.openPurchaseExperience(planInfo?: PlanInfo): Promise\<void\>} instead.
   *
   * @hidden
   * Open dialog to start user's purchase experience
   *
   * @param callback Callback contains 1 parameters, error.
   * @param planInfo optional parameter. It contains info of the subscription plan pushed to users.
   * error can either contain an error of type SdkError, incase of an error, or null when get is successful
   *
   * @internal
   * Limited to Microsoft-internal use
   */
  export function openPurchaseExperience(callback: (error: SdkError | null) => void, planInfo?: PlanInfo): void;
  /**
   * @hidden
   * This function is the overloaded implementation of openPurchaseExperience.
   * Since the method signatures of the v1 callback and v2 promise differ in the type of the first parameter,
   * we need to do an extra check to know the typeof the @param1 to set the proper arguments of the utility function.
   * @param param1
   * @param param2
   * @returns Promise that will be resolved when the operation has completed or rejected with SdkError value
   */
  export function openPurchaseExperience(
    param1: ((error: SdkError | null) => void) | PlanInfo | undefined,
    param2?: PlanInfo,
  ): Promise<void> {
    let callback: ((error: SdkError | null) => void) | undefined;
    /* eslint-disable-next-line strict-null-checks/all */ /* Fix tracked by 5730662 */
    let planInfo: PlanInfo;
    if (typeof param1 === 'function') {
      callback = param1;
      planInfo = param2;
    } else {
      planInfo = param1;
    }
    const wrappedFunction: InputFunction<void> = () => {
      return new Promise<void>((resolve) => {
        if (!isSupported()) {
          throw errorNotSupportedOnPlatform;
        }
        resolve(sendAndHandleSdkError('monetization.openPurchaseExperience', planInfo));
      });
    };

    ensureInitialized(runtime, FrameContexts.content);
    return callCallbackWithErrorOrResultOrNullFromPromiseAndReturnPromise(wrappedFunction, callback);
  }

  /**
   * @hidden
   *
   * Checks if the monetization capability is supported by the host
   * @returns boolean to represent whether the monetization capability is supported
   *
   * @throws Error if {@linkcode app.initialize} has not successfully completed
   */
  export function isSupported(): boolean {
    return ensureInitialized(runtime) && runtime.supports.monetization ? true : false;
  }
  /**
  * Namespace for marketplace interaction
  */
  namespace marketplace {
    export enum Intent {
        admin= 'admin',
        endUser='endUser',
    }
    export enum CartStatus {
        open= 'open',
        closed='closed',
    }
    export interface Cart {
        readonly instanceId: string;
        readonly market?: string;
        readonly intent?: string;
        readonly locale?: string;
        status: CartStatus;
        orderId?: string;
        cartItems?: CartItem[];
    }
    export interface CartItem {
        itemId: number;
        quantity: number;
        imageURL?: string;
        price?: number;
        name?: string;
    }
    /**
    * get cart object for app to checkout.
    *
    */
    export function getCart(): Promise<Cart> {
      return new Promise<Cart>((resolve) => {
        if (!isSupported()) {
          throw errorNotSupportedOnPlatform;
        }
        resolve(sendAndHandleSdkError('monetization.marketplace.getCart'));
      });
    }
    /**
    * update cart object in host
    *
    * @param cart - An object containing all product items and cart status.
    * 
    * @returns boolean to represent whether the set operation is success or not
    */
    export function setCart(cart: Cart): Promise<boolean> {
      return new Promise<boolean>((resolve) => {
        if (!isSupported()) {
          throw errorNotSupportedOnPlatform;
        }
        resolve(sendAndHandleSdkError('monetization.marketplace.setCart', cart));
      });
    }
    /**
    * @hidden
    *
    * Checks if the monetization.marketplace capability is supported by the host
    * @returns boolean to represent whether the monetization capability is supported
    *
    * @throws Error if {@linkcode app.initialize} has not successfully completed
    */
    export function isSupported(): boolean {
      return ensureInitialized(runtime) && runtime.supports.monetization.marketplace ? true : false;
    }
  }
}
