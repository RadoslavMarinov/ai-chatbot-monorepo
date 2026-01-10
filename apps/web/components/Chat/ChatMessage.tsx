import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export function ChatMessage({ content }: { content: string }) {
  return (
    <div className={`prose prose-sm md:prose-base max-w-none dark:prose-invert`}>
      <ReactMarkdown 
        remarkPlugins={[remarkGfm]}
        components={{
          // Optional: Override table to add custom wrapper for responsiveness
          table: ({ children }) => (
            <div className="overflow-x-auto my-4">
              <table className="min-w-full divide-y divide-gray-300">
                {children}
              </table>
            </div>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}