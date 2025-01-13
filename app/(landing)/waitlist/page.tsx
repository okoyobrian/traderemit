import Image from 'next/image';
import WaitlistForm from './WaitlistForm';


export default function Waitlist() {
  return (
    <div className="container my-32">
      <div className="flex gap-16 items-center max-sm:flex-col max-h-fit">
        <div className="w-full max-w-md">
          <h1 className="text-3xl sm:text-5xl font-bold text-primary tracking-tighter !leading-tight">Join the Waitlist</h1>
          <p className="font-medium text-md tracking-tight my-4 text-secondary-text">Fill out the form below, and we’ll welcome you to our platform soon.</p>
          <WaitlistForm />
        </div>
        <Image src="/hot-air-balloon.png" className='hidden sm:block' alt="" width={500} height={500} />
      </div>
    </div>
  );
}
