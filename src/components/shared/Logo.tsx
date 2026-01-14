import Link from 'next/link';
import { cn } from '@/lib/utils';

const Logo = ({ className }: { className?: string }) => {
  return (
    <Link href="/" className={cn("text-2xl font-bold tracking-tighter font-logo text-foreground", className)}>
      Falcon News
    </Link>
  );
};

export default Logo;
