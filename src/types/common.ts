import type { Nullable } from "unsplash-js/dist/helpers/typescript"

export type Favorite = {
  id: string,
  urls: {
    regular?: Nullable<string>,
    small?: Nullable<string>
  },
  alt_description: Nullable<string>,
  blur_hash: Nullable<string>,
  color: Nullable<string>,
}