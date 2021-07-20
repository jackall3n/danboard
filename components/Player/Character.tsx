import classnames from "classnames";
import React from "react";
import Image from "next/image";

interface Props {
  src: StaticImageData;
  show: boolean;
}

function Character({ src, show }: Props) {
  return (
    <div
      className={classnames(
        "h-52 absolute bottom-0 w-full -right-6 z-30 transition-all duration-1000",
        {
          "opacity-100": show,
          "opacity-0": !show,
        }
      )}
    >
      <Image
        src={src}
        className="object-right object-contain drop"
        layout="fill"
        alt="pic"
      />
    </div>
  );
}

export default Character;
