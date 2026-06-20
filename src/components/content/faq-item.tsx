type FaqItemProps = {
  question: string;
  answer: string;
};

export function FaqItem({ question, answer }: FaqItemProps) {
  return (
    <details className="group border-b border-[#e7d8cc] py-5">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
        <span className="text-base font-medium text-[#2f140d]">{question}</span>
        <span
          aria-hidden="true"
          className="text-xl leading-none text-[#8a5a3c] transition-transform duration-300 group-open:rotate-45"
        >
          +
        </span>
      </summary>
      <p className="max-w-2xl pt-4 text-sm leading-7 text-[#5f5048]">
        {answer}
      </p>
    </details>
  );
}
