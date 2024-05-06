export function DescriptionCell({ mdxContent }: { mdxContent: string }) {
  const stripMarkdown = (markdown: string) => {
    return markdown.replace(/(\[.*?\]\(.*?\)|[*_`#>])/g, "")
  }

  const truncateText = (text: string, maxLength = 100) => {
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text
  }

  const plainText = truncateText(stripMarkdown(mdxContent))

  return <span className="max-w-[500px] truncate font-medium">{plainText}</span>
}
