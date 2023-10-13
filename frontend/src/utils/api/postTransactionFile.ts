export async function postTransactionFile(formData: FormData): Promise<any> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/transaction`,
      {
        method: "POST",
        body: formData,
      },
    );
    return response;
  } catch (err) {
    return err;
  }
}
