import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

import { IFaq } from '@/react_redux/thunks/FaqThunks';

type FaqsProps = {
  items: IFaq[] | null | undefined; // allow null/undefined
}

export function Faqs({ items }: FaqsProps) {
  if (!Array.isArray(items) || items.length === 0) {
    return <p className="text-center text-gray-500">No FAQs available</p>;
  }

  return (
    <Accordion
      type="single"
      collapsible
      className="w-full"
      defaultValue={items[0]?._id}
    >
      {items.map((faq) => (
        <AccordionItem key={faq._id} value={faq._id} className="p-8 shadow-md">
          <AccordionTrigger className="text-[17px] font-semibold text-[#1b1b1bcb]">
            {faq.question}
          </AccordionTrigger>

          <AccordionContent className="flex flex-col gap-4 text-balance text-[17px] text-[#313131c5]">
            {Array.isArray(faq.answer) ? (
              faq.answer.map((text, i) => <p key={i}>{text}</p>)
            ) : (
              <p>{faq.answer}</p>
            )}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
