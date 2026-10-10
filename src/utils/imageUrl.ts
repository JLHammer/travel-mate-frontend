import { createImageUrlBuilder, type SanityImageSource } from "@sanity/image-url";
import type { SanityImage } from "../types";
import { sanityClient } from "./sanityClient";

const builder = createImageUrlBuilder(sanityClient);

const urlFor = (source: SanityImageSource) => builder.image(source);

const WIDTHS = [320, 480, 640, 960, 1280, 1600];

export const sanityImageProps = (image: SanityImage, sizes: string) => {
  const sized = (width: number) => urlFor(image).width(width).fit("max").auto("format").url();

  return {
    src: sized(960),
    srcSet: WIDTHS.map((width) => `${sized(width)} ${width}w`).join(", "),
    sizes,
    style: image.hotspot
      ? { objectPosition: `${(image.hotspot.x ?? 0.5) * 100}% ${(image.hotspot.y ?? 0.5) * 100}%` }
      : undefined,
  };
};
