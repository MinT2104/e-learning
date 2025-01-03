// import * as React from "react"
// import * as AccordionPrimitive from "@radix-ui/react-accordion"
// import { ChevronDownIcon } from "@radix-ui/react-icons"

// import { cn } from "@/lib/utils"

// const Accordion = AccordionPrimitive.Root

// const AccordionItem = React.forwardRef<
//   React.ElementRef<typeof AccordionPrimitive.Item>,
//   React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
// >(({ className, ...props }, ref) => (
//   <AccordionPrimitive.Item
//     ref={ref}
//     className={cn("border-b", className)}
//     {...props}
//   />
// ))
// AccordionItem.displayName = "AccordionItem"

// const AccordionTrigger = React.forwardRef<
//   React.ElementRef<typeof AccordionPrimitive.Trigger>,
//   React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
// >(({ className, children, ...props }, ref) => (
//   <AccordionPrimitive.Header className="flex">
//     <AccordionPrimitive.Trigger
//       ref={ref}
//       className={cn(
//         "flex flex-1 items-center justify-start gap-4 px-4 py-4 text-sm font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180",
//         className
//       )}
//       {...props}
//     >
//       <ChevronDownIcon className="p-1 h-6 w-6 shrink-0 transition-transform duration-200 text-primary bg-primary text-white rounded-full" />
//       {children}
//     </AccordionPrimitive.Trigger>
//   </AccordionPrimitive.Header>
// ))
// AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName

// const AccordionContent = React.forwardRef<
//   React.ElementRef<typeof AccordionPrimitive.Content>,
//   React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
// >(({ className, children, ...props }, ref) => (
//   <AccordionPrimitive.Content
//     ref={ref}
//     className="overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
//     {...props}
//   >
//     <div className={cn("pb-4 pt-0", className)}>{children}</div>
//   </AccordionPrimitive.Content>
// ))
// AccordionContent.displayName = AccordionPrimitive.Content.displayName

// export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDownIcon } from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";

const Accordion = AccordionPrimitive.Root;

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn("border-b border-gray-300", className)}
    {...props}
  />
));
AccordionItem.displayName = "AccordionItem";

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger> & {
    isShowIcon?: boolean
  }
>(({ isShowIcon = true , className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        "flex flex-1 items-center justify-start gap-4 px-4 py-3 text-lg font-medium transition-all text-gray-800 hover:underline",
        "[&[data-state=open]>svg]:rotate-180",
        className
      )}
      {...props}
    >
      {
        isShowIcon &&
        <ChevronDownIcon className="p-1 h-[30px] w-[30px] shrink-0 transition-transform duration-150 text-primary bg-blue-100 text-blue rounded-full" />
      }
      {children}
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
));
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className="overflow-hidden text-base text-gray-700 data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
    {...props}
  >
    <div className={cn("pb-4 pt-0 px-4", className)}>{children}</div>
  </AccordionPrimitive.Content>
));
AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
