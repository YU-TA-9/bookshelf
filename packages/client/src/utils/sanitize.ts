import * as DOMPurify from 'dompurify';
import { marked } from 'marked';

export const convertMarkdownToHTML = (
  markdownText,
): {
  __html: string;
} => {
  const markedText = marked(markdownText);

  const config = {
    ALLOWED_ATTR: ['href', 'target', 'rel'],
    ALLOWED_TAGS: [
      'h1',
      'h2',
      'h3',
      'h4',
      'h5',
      'h6',
      'p',
      'br',
      'ul',
      'ol',
      'li',
      'blockquote',
      'strong',
      'em',
      'a',
      'hr',
      'del',
      'pre',
      'code',
    ],
  };
  const htmlText = DOMPurify.sanitize(markedText, config);
  return { __html: htmlText };
};
