import Link from "next/link";

export const NextLink = ({ href, children, ...rest }: Record<string, any>) => (
    <Link href={href} {...rest}>
      {children}
    </Link>
);
  