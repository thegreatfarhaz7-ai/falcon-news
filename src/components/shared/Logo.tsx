import Link from 'next/link';
import { cn } from '@/lib/utils';

const Logo = ({ className }: { className?: string }) => {
  return (
    <Link href="/" className={cn("flex items-center gap-2 text-2xl font-bold tracking-tighter font-logo text-foreground", className)}>
      <span className='whitespace-nowrap'>Falcon News</span>
    </Link>
  );
};

export default Logo;
