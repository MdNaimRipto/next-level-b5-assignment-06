import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";

export default function Verify() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <Link to="/" className="flex items-center gap-2 font-medium">
            <Logo />
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <div className="flex flex-col items-center gap-2 text-center mb-4">
              <h1 className="text-2xl font-bold">Verify Now</h1>
              <p className="text-balance text-sm text-muted-foreground">
                Verify your account for further process
              </p>
            </div>
            <div className="w-full flex items-center justify-center mb-3">
              <Button type="button" className="w-4/5">
                Verify
              </Button>
            </div>
            <div className="text-center text-sm">
              Already Verified?{" "}
              <Link to="/auth/login" className="underline underline-offset-4">
                Login Now
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="relative hidden bg-muted lg:block">
        {/* <img
          src={TravelLogin}
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.8]"
        /> */}
      </div>
    </div>
  );
}
