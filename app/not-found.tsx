import Link from "next/link";
import Button from "@/components/Button";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-display-xl text-text-tertiary mb-4">404</h1>
        <h2 className="text-h2 mb-4">Page not found</h2>
        <p className="text-body text-text-secondary mb-8 max-w-md">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link href="/">
          <Button variant="primary">Go Home</Button>
        </Link>
      </div>
    </div>
  );
}
