import { createClient } from "@sanity/client";

export const sanityClient = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
  dataset: import.meta.env.VITE_SANITY_DATASET,
  apiVersion: "2025-02-19", // Locks API behavior, so Sanity updates can't change results
  useCdn: false, // Always fresh data, so edits in the Studio show up right away
});
