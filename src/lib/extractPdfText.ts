import { GlobalWorkerOptions, getDocument } from 'pdfjs-dist'

GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString()

export async function extractPdfText(file: File): Promise<string> {
  const data = await file.arrayBuffer()
  const pdf = await getDocument({ data }).promise

  const pages: string[] = []
  for (let i = 1; i <= pdf.numPages; i += 1) {
    const page = await pdf.getPage(i)
    const content = await page.getTextContent()
    const strings = (content.items as Array<{ str?: string }>).map((it) => it.str ?? '')
    const pageText = strings.join(' ').replace(/\s+/g, ' ').trim()
    if (pageText) pages.push(pageText)
  }

  return pages.join('\n\n').trim()
}
