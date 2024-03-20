import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <p className="text-green-300 font-bold text-xs">test</p>
      <Button variant={"destructive"} size={"lg"}> click me </Button>
    </div>
  );
}
