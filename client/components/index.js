/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
export {default as Navbar} from './navbar'
export {default as UserHome} from './user-home'
export {Login, Signup} from './auth-form'
export {default as Cart} from './cart'
export {default as GuestCart} from './guestCart'
export {Checkout} from './checkout'
export {GuestCheckout} from './GuestCheckout'
export {CheckoutCartItem} from './CheckoutCartItem'
export {Payment} from './Payment'
export {PaymentForm} from './PaymentForm'
export {GuestCheckoutCartItem} from './GuestCheckoutCartItem'
export {Footer} from './Footer'
