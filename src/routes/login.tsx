import { Link, createFileRoute } from "@tanstack/react-router";
import { Hexagon, ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Sign in — Northwind Operations Portal" },
      {
        name: "description",
        content:
          "Sign in to the Northwind Operations Portal to manage employees, projects, timesheets and leave.",
      },
      { property: "og:title", content: "Sign in — Northwind Operations Portal" },
      {
        property: "og:description",
        content: "Secure sign-in for Northwind employees, managers and administrators.",
      },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="relative hidden flex-col justify-between overflow-hidden bg-primary p-12 text-primary-foreground lg:flex">
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            background:
              "radial-gradient(120% 80% at 15% 10%, oklch(1 0 0 / 0.22), transparent 60%), radial-gradient(90% 70% at 90% 95%, oklch(0.7 0.16 195 / 0.35), transparent 65%)",
          }}
        />
        <div className="relative flex items-center gap-2.5">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-primary-foreground/15">
            <Hexagon className="h-4.5 w-4.5" />
          </span>
          <span className="text-sm font-semibold">Northwind</span>
        </div>
        <div className="relative max-w-md">
          <h2 className="text-4xl font-semibold leading-tight tracking-tight">
            One portal for everything your team runs on.
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-primary-foreground/80">
            People, projects, timesheets, leave and pipeline — reconciled every night, visible to
            every manager by 8am.
          </p>
        </div>
        <p className="relative text-xs text-primary-foreground/60">
          Internal use only · Northwind Group · v4.2
        </p>
      </div>

      <div className="flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-sm">
          <div className="mb-8 flex items-center gap-2.5 lg:hidden">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-primary text-primary-foreground">
              <Hexagon className="h-4.5 w-4.5" />
            </span>
            <span className="text-sm font-semibold">Northwind</span>
          </div>

          <h1 className="text-2xl font-semibold tracking-tight">Sign in</h1>
          <p className="mt-1.5 text-sm text-muted-foreground">
            Use your company account to continue.
          </p>

          <form
            className="mt-8 space-y-5"
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <div className="space-y-2">
              <Label htmlFor="email">Work email</Label>
              <Input
                id="email"
                type="email"
                defaultValue="amara.okafor@northwind.co"
                className="h-10 rounded-lg"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <button
                  type="button"
                  className="text-xs font-medium text-primary transition-colors duration-150 hover:text-primary/80"
                >
                  Forgot password?
                </button>
              </div>
              <Input id="password" type="password" defaultValue="••••••••••" className="h-10 rounded-lg" />
              <p className="text-xs text-muted-foreground">Minimum 12 characters, SSO enforced from 1 Sep.</p>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="remember" defaultChecked />
              <Label htmlFor="remember" className="text-sm font-normal text-muted-foreground">
                Keep me signed in on this device
              </Label>
            </div>
            <Button asChild className="h-10 w-full rounded-lg">
              <Link to="/">
                Sign in
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </form>

          <p className="mt-8 text-center text-xs text-muted-foreground">
            Trouble signing in? Contact <span className="font-medium text-foreground">it-help@northwind.co</span>
          </p>
        </div>
      </div>
    </div>
  );
}
