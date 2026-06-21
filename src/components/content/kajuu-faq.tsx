"use client";

import { useId, useState } from "react";

export type KajuuFaqItem = {
  question: string;
  answer: string;
};

type KajuuFaqProps = {
  items: KajuuFaqItem[];
};

export function KajuuFaq({ items }: KajuuFaqProps) {
  const baseId = useId();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex((current) => (current === index ? null : index));
  };

  return (
    <div className="flex flex-col">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const panelId = `${baseId}-panel-${index}`;
        const buttonId = `${baseId}-button-${index}`;

        return (
          <div
            className={["kajuu-faq-item", isOpen ? "is-open" : ""].join(" ")}
            key={item.question}
          >
            <button
              aria-controls={panelId}
              aria-expanded={isOpen}
              className="kajuu-faq-trigger"
              id={buttonId}
              onClick={() => toggle(index)}
              type="button"
            >
              <span className="kajuu-faq-question">{item.question}</span>
              <span aria-hidden="true" className="kajuu-faq-icon">
                <span className="kajuu-faq-icon-line kajuu-faq-icon-line-h" />
                <span className="kajuu-faq-icon-line kajuu-faq-icon-line-v" />
              </span>
            </button>
            <div
              aria-labelledby={buttonId}
              className="kajuu-faq-panel"
              id={panelId}
              role="region"
            >
              <div className="kajuu-faq-panel-inner">
                <p className="kajuu-faq-answer">{item.answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
