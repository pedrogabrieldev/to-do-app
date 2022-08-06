import * as Tooltip from '@radix-ui/react-tooltip'

export default function RadixTooltip({ children, content }) {
  return (
    <Tooltip.Provider delayDuration={500} skipDelayDuration={0}>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>{children}</Tooltip.Trigger>
        <Tooltip.Content className="px-2 py-1 text-slate-900 bg-slate-100 rounded">
          {content}
          <Tooltip.TooltipArrow className="fill-slate-100" />
        </Tooltip.Content>
      </Tooltip.Root>
    </Tooltip.Provider>
  )
}
