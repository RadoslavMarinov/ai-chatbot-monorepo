export function TypingDots() {
  return (
    <div className="flex items-center space-x-2 text-gray-400">
      <div className="flex space-x-1">
        <div className="w-1.5 h-1.5 bg-current rounded-full animate-pulse" />
        <div className="w-1.5 h-1.5 bg-current rounded-full animate-pulse [animation-delay:200ms]" />
        <div className="w-1.5 h-1.5 bg-current rounded-full animate-pulse [animation-delay:400ms]" />
      </div>
    </div>
  );
}