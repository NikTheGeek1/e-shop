import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Form from "./Form";

type StripePaymentProps = {
  total: number;
  order_id: string;
  stripe_public_key: string;
};

export default function StripePayment({ total, order_id, stripe_public_key }: StripePaymentProps) {
  const stripePromise = loadStripe(stripe_public_key);
  return (
    <Elements stripe={stripePromise}>
      <Form total={total} order_id={order_id} />
    </Elements>
  );
}
