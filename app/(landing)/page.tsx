import Image from "next/image";
import Button from "../components/Button";
import Separator from "../components/Separator";
import FeatureCard from "../components/FeatureCard";

export default function Home() {
  return (
    <div className="container mt-16">
      <div className="flex gap-8 items-center max-sm:flex-col">
        <div>
          <h1 className="heading-xl">Send money, <i>effortlessly</i></h1>
          <p className="body-text my-5">Purchase from Chinese suppliers with the lowest fees. Vet suppliers, track shipments, and more.</p>
          <Button href="/waitlist">Join the waitlist</Button>
        </div>
        <Image src="/smiling-woman.png" alt="Smiling Woman" width={500} height={500} />
      </div>
      <Separator />
      <div className="flex gap-8 items-center max-sm:flex-col">
        <div>
          <h1 className="heading-md max-w-sm">Your all-in-one tool for the future of trade</h1>
        </div>
        <Image src="/app-preview.png" className="border-2 rounded-t-2xl sm:ml-auto" alt="" width={300} height={500} />
      </div>
      <div className="grid md:grid-cols-3 justify-center gap-6 pt-8">
        <FeatureCard heading="Verify suppliers" body="Cowrie checks all buyers and sellers on our platform, so you can be sure you pay the right person." />
        <FeatureCard heading="Pay suppliers" body="Pay any business in China USD or CNY, with fees as low as 2%. We use the mid-market exchange rate, and no hidden fees." />
        <FeatureCard heading="Track shipments" body="Track your shipments from port to port. We’ll do our best to help if anything goes wrong in the shipping process." />
      </div>
      <Separator />
      <div className="flex flex-col gap-4 items-center max-w-xs mx-auto">
        <div className="bg-primary px-4 p-1 font-bold text-white rounded-full w-fit">SOON</div>
        <h1 className="heading-md	max-w-sm">Buy now, pay later</h1>
        <p className="font-medium text-md tracking-tight my-5 text-secondary-text !m-0 text-center">Grow your business with trade financing. You only pay when you receive your goods.</p>
        <Image src="/hands.png" alt="" width={200} height={200} />
        <p className="font-medium text-md tracking-tight my-5 text-secondary-text text-center !m-0">Coming fall 2025. Buyers with the highest volumes on Cowrie will get the most access to financing.</p>
      </div>
      <div className="bg-primary-text p-16 rounded-3xl flex max-sm:flex-wrap gap-16 my-16">
        <div>
          <h2 className="heading-md !text-white">Make your money work for you</h2>
          <p className="body-text !text-white/80 my-3 mt-4">Store your money in USD to pay suppliers quickly and avoid shilling depreciation.</p>
          <p className="body-text !text-white/80 my-3 mb-8">Money stored in Cowrie will start earning interest later this year.</p>
          <Button href="/waitlist">Join the waitlist</Button>
        </div>
        <Image src="/exponential.png" alt="" width={200} height={200} className="object-contain	" />
      </div>
      <div className="flex gap-8 items-center max-sm:flex-col mb-16">
        <div>
          <h2 className="heading-md">Experience the future</h2>
          <p className="font-medium text-md tracking-tight my-5 text-secondary-text">Beta coming Spring 2025. Sign up now to be the first to try Cowrie.</p>
          <Button href="/waitlist">Join the waitlist</Button>
        </div>
        <Image src="/happy-guy.png" alt="" width={500} height={500} />
      </div>
    </div>
  );
}
