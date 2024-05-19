export function readFile(
  data: File | Blob,
): Promise<string | ArrayBuffer | null> {
  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.onloadend = () => resolve(reader.result)
    reader.readAsDataURL(data)
  })
}
