import { Link } from "@/i18n/routing";
import { Separator } from "@/components/ui/separator";

type Props = {
  title: string;
  description?: string;
  updatedAt?: string;
  children: React.ReactNode;
};

export function InfoLayout({ title, description, updatedAt, children }: Props) {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-4 py-10">
      <header className="space-y-2">
        <Link
          href="/"
          className="text-muted-foreground text-sm hover:text-foreground hover:underline"
        >
          ← Home
        </Link>
        <h1 className="font-semibold text-2xl tracking-tight">{title}</h1>
        {description ? (
          <p className="text-muted-foreground text-sm">{description}</p>
        ) : null}
        {updatedAt ? (
          <p className="text-muted-foreground text-xs">Updated: {updatedAt}</p>
        ) : null}
      </header>
      <Separator />
      <main className="prose prose-zinc max-w-none dark:prose-invert prose-headings:scroll-mt-24">
        {children}
      </main>
    </div>
  );
}

