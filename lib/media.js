import { getStrapiURL } from "./api"
// i believe this returns your media images, whether those are from an outside source or uploaded from within Strapi.
export function getStrapiMedia(media) {
  const imageUrl = media.url.startsWith("/")
    ? getStrapiURL(media.url)
    : media.url
  return imageUrl
}
