import { Bell, User } from 'lucide-react';

export default function TopMenu() {
  return (
    <div className=" flex justify-between w-full items-center p-3 bg-dark-background shadow-md">
      <img src="/logo.svg" alt="inSync logo" />

      <div className="flex text-zinc-50 items-center gap-3">
        <Bell />
        <div className="bg-brand hover:bg-brand/60 hover:text-zinc-200 hover:cursor-pointer transition-all rounded-md p-2">
          <User />
        </div>
      </div>
    </div>
  );
}
