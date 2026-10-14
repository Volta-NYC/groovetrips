import Link from "next/link";
import Arrow from "@/lib/components/arrow";

export default function PaymentOptions() {
  return (
    <section className="payment-options section" aria-labelledby="payment-heading">
      <div>
        <p className="eyebrow">MORE WAYS TO GET THERE</p>
        <h2 id="payment-heading">
          Your next adventure.
          <br />
          <em>One step at a time.</em>
        </h2>
      </div>
      <div className="payment-options-copy">
        <p>
          Building community starts with making room for more people to join.
          Talk with us about deposits and installment options that help you plan
          for your journey.
        </p>
        <p>
          We’ll walk you through the amounts, payment schedule, and trip details
          before you commit.
        </p>
        <Link href="/contact#payment-options" className="text-link">
          Ask about payment options <Arrow />
        </Link>
      </div>
    </section>
  );
}
