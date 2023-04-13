import { ReactElement } from "react";

export default function Page() {
  return (
    <div className="min-h-full">
      <h1 className="text-center min-h-screen">No Layout Page</h1>
    </div>
  );
}

Page.getLayout = (page: ReactElement) => page;
