import { Component } from "solid-js";
import { Container } from "./Container";

interface ProfileSectionProps {
  image?: string;
  alt: string;
  title: string;
  life: string;
  contributions: string;
  legacy: string;
}

const ProfileSection: Component<ProfileSectionProps> = ({
  image,
  alt,
  title,
  life,
  contributions,
  legacy,
}) => {
  return (
    <Container className="flex flex-col px-4 pb-4 md:flex-row md:items-center">
      {image && (
        <img
          class="hidden w-full cursor-pointer rounded-xl object-cover transition duration-500 hover:scale-[1.01] md:flex md:h-full md:w-1/2"
          src={image}
          alt={alt}
        />
      )}
      <div class={`px-6 ${image ? "w-full md:w-1/2" : "w-full"}`}>
        <div class="flex items-end gap-4">
          {image && (
            <img
              class="h-40 w-40 rounded-xl object-cover md:hidden"
              src={image}
              alt={alt}
            />
          )}
          <p class="font-bold md:text-3xl">{title}</p>
        </div>
        <p class="text-md mb-2 mt-8 font-bold md:text-xl">Vida e Educação</p>
        <p class="max-md:text-sm">{life}</p>
        <p class="text-md mb-2 mt-4 font-bold md:text-xl">
          Contribuições Científicas
        </p>
        <p class="max-md:text-sm">{contributions}</p>
        <p class="text-md mb-2 mt-4 font-bold md:text-xl">Legado</p>
        <p class="max-md:text-sm">{legacy}</p>
      </div>
    </Container>
  );
};

export default ProfileSection;
