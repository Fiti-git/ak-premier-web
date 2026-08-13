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
    sm: 'h-20 sm:h-24',
    md: 'h-28 sm:h-32 lg:h-36',
    lg: 'h-32 sm:h-40'
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
