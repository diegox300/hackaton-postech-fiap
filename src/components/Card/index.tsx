interface CardProps {
  children: React.ReactNode;
}

export function Card({ children }: CardProps) {
  return <div className="rounded-lg bg-greyOne p-4">{children}</div>;
}
