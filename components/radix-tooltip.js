import * as Tooltip from '@radix-ui/react-tooltip'

export default function RadixTooltip({ children, content }) {
  return (
    <Tooltip.Provider delayDuration={500} skipDelayDuration={0}>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>{children}</Tooltip.Trigger>
        <Tooltip.Content className="px-2 py-1 text-sm text-[#F2F2F2] dark:text-[#0D0D0D] bg-[#1A1A1A] dark:bg-[#F2F2F2] rounded select-none">
          {content}
          <Tooltip.TooltipArrow className="fill-[#1A1A1A] dark:fill-[#F2F2F2]" />
        </Tooltip.Content>
      </Tooltip.Root>
    </Tooltip.Provider>
  )
}
