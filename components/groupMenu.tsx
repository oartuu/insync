import { ChevronLeft, EllipsisVertical } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react'

interface GroupMenuProps {
    groupName?: string;
}

export default function groupMenu({ groupName }: GroupMenuProps) {

  const router = useRouter();

  const handleBackClick = () => {
    router.back();
  }

  return (
    <div className=" flex justify-between text-zinc-50 w-full items-center p-4 bg-dark-background shadow-md">
      <div className="flex items-center gap-3">
          <ChevronLeft onClick={handleBackClick} className="text-zinc-400" />
       

        <h1>{groupName}</h1>
      </div>

      <EllipsisVertical className="text-zinc-400" />
    </div>
  );
}
