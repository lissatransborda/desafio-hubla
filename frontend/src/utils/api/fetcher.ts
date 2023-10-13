export const fetcher = async (path: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/${path}`,
  );
  return await response.json();
};
