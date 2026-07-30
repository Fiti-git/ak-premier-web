import Image from 'next/image';

export default function Logo({
  className = '',
  variant = 'default',
  size = 'md'
}: {
  className?: string;
  variant?: 'default' | 'light';
  size?: 'sm' | 'md' | 'lg';
}) {
  const dims = {
    sm: 'h-10 sm:h-11',
    md: 'h-12 sm:h-14',
    lg: 'h-20 sm:h-24'
  }[size];

  const src = variant === 'light' ? '/logo-white.png' : '/logo-transparent.png';

  return (
    <div className={`flex items-center ${className}`}>
      <Image
        src={src}
        alt="A&K Premier Property Solutions"
        width={320}
        height={320}
        priority
        className={`${dims} w-auto object-contain`}
      />
    </div>
  );
}
