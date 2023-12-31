"use client";

import { unsplash } from "@/lib/unsplash";
import { cn } from "@/lib/utils";
import { Check, Loader2 } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useFormStatus } from "react-dom";

import { defaultImages } from "@/constants/images";
import Link from "next/link";
import { FormErrors } from "./form-errors";

interface FormPickerProps {
  id: string;
  error?: Record<string, string[] | undefined>;
}

export const FormPicker = ({ id, error }: FormPickerProps) => {
  const { pending } = useFormStatus();
  const [images, setImages] =
    useState<Array<Record<string, any>>>(defaultImages);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        //throw new Error("test");
        const results = await unsplash.photos.getRandom({
          collectionIds: ["317099"],
          count: 9,
        });

        if (results && results.response) {
          const newImages = results.response as Array<Record<string, any>>;
          setImages(newImages);
        }
      } catch (error) {
        console.log("failed to fetch images", error);
        //setImages([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchImages();
  }, []);

  if (isLoading) {
    return (
      <div className="p-6 flex items-center justify-center">
        <Loader2 className="h-6 w-6 text-sky-700 animate-spin" />
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="grid grid-cols-3 gap-2 mb-2">
        {images.map((image) => (
          <div
            key={image.id}
            className={cn(
              "cursor-pointer relative aspect-video group opacity-75 transition bg-muted",
              pending && "opacity-50 hover:opacity-50 cursor-auto"
            )}
            onClick={() => {
              if (pending) return;
              setSelectedImage(image.id);
            }}
          >
            <input
              type="radio"
              id={id}
              name={id}
              className="hidden"
              checked={selectedImage === image.id}
              disabled={pending}
              value={`${image.id}|${image.urls.thumb}|${image.urls.full}|${image.links.html}|${image.user.name}`}
            />

            <Image
              src={image.urls.thumb}
              fill
              alt="unsplash image"
              className="object-cover rounded-md"
            />

            {selectedImage === image.id && (
              <div className="absolute inset-0 bg-black/50 h-full w-full flex items-center justify-center">
                <Check className="h-6 w-6 text-white" />
              </div>
            )}
            <Link
              href={image.links.html}
              target="_blank"
              className="opacity-0 group-hover:opacity-100 absolute bottom-0 w-full text-[10px] truncate text-white hover:underline p-1 bg-black/50"
            >
              {image.user.name}
            </Link>
          </div>
        ))}
      </div>
      <FormErrors id={id} errors={error} />
    </div>
  );
};
