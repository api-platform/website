import {unified} from 'unified'
import remarkParse from 'remark-parse'
import remarkHtml from 'remark-html'

export default async function Page({
  params: { slug },
}: {
  params: {
    slug: string[];
  };
}) {

  const headers = new Headers();
  headers.append('accept', 'application/vnd.github+json')
  headers.append('authorization', 'Bearer ' + process.env.GITHUB_KEY)
  headers.append('X-GitHub-Api-Version', '2022-11-28')

  // const { default: Mdx, name } = await loadMarkdownBySlugArray(slug);
  const res = await fetch('https://api.github.com/repos/api-platform/docs/contents/' + slug.join('/') + '.md', { next: { tags: ['v2'] }, headers: headers });
  const data = await res.json();
  const Md = Buffer.from(data.content, 'base64')

  const html = await unified()
      .use(remarkParse)
      .use(remarkHtml)
      .process(Md)

  return (<>
<div dangerouslySetInnerHTML={{__html: String(html)}}></div>
  </>)
}
