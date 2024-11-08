'use client'
import { useAppSelector } from "@/lib/redux/hooks/reduxHooks";
import Benefit from "@/components/home/benefit/Benefit";
import Hero from "@/components/home/hero/Hero";
import SortedLink from "@/components/home/hero/SortedLink";

export default function Home() {
  const link = useAppSelector(state => state.link_slice);

  return (
    <div className="font-[family-name:var(--font-geist-sans)]">
      <div className="w-7/12 mx-auto ">
        {link.link ? <SortedLink /> : <Hero />}
        <Benefit />
      </div>
    </div>
  );
}
