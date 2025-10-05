// components/MasterclassCard.tsx
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/Button";

export interface MasterclassProps {
  title: string;
  description: string;
  image: string;
  link: string;
  button: string;
  layout?: "image-left" | "image-right" | "tall";
  isMobile?: boolean; // 👈 new flag
}

export default function MasterclassCard({
  title,
  description,
  image,
  link,
  button,
  layout = "image-left",
  isMobile = false,
}: MasterclassProps) {
  // ✅ MOBILE DESIGN VERSION
  if (isMobile) {
    return (
      <div className="h-[900px] rounded-2xl border-2 p-10">
        <div className="flex flex-col gap-10 h-full">
          <Image
            src={image}
            alt={title}
            width={400}
            height={400}
            className="rounded-2xl"
          />
          <h2 className="text-3xl font-black">{title}</h2>
          <p className="text-justify">{description}</p>
          <Link href={link}>
            <Button>{button}</Button>
          </Link>
        </div>
      </div>
    );
  }

  // ✅ DESKTOP DESIGN VERSION
  const isImageLeft = layout === "image-left";
  const isImageRight = layout === "image-right";
  const isTall = layout === "tall";

  if (isTall) {
    return (
      <div className="row-span-2 from-20% to-60% bg-gradient-to-b rounded-2xl border-2 p-10 flex flex-col justify-between">
        <div className="flex flex-col gap-5">
          <h2 className="text-3xl font-black">{title}</h2>
          <p className="text-justify">{description}</p>
          <Link href={link}>
            <Button>{button}</Button>
          </Link>
        </div>
        <div>
          <Image
            src={image}
            alt={title}
            width={400}
            height={400}
            className="rounded-2xl mt-10"
          />
        </div>
      </div>
    );
  }

  return (
    <div
      className={`from-20% to-60% bg-gradient-to-b rounded-2xl border-2 p-10 grid grid-cols-2 gap-16`}
    >
      {isImageLeft && (
        <>
          <div>
            <Image
              src={image}
              alt={title}
              width={400}
              height={400}
              className="rounded-2xl"
            />
          </div>
          <div className="flex flex-col gap-10">
            <h2 className="text-3xl font-black">{title}</h2>
            <p className="text-justify">{description}</p>
            <Link href={link}>
              <Button>{button}</Button>
            </Link>
          </div>
        </>
      )}
      {isImageRight && (
        <>
          <div className="flex flex-col gap-10">
            <h2 className="text-3xl font-black">{title}</h2>
            <p className="text-justify">{description}</p>
            <Link href={link}>
              <Button>{button}</Button>
            </Link>
          </div>
          <div>
            <Image
              src={image}
              alt={title}
              width={400}
              height={400}
              className="rounded-2xl"
            />
          </div>
        </>
      )}
    </div>
  );
}
