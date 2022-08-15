import * as Checkbox from '@radix-ui/react-checkbox'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'

export default function RadixCheckbox({ id, handleCheckboxChange, checked }) {
  return (
    <Checkbox.Root
      id={id}
      className={`flex justify-center items-center w-4 h-4 ${
        checked ? 'bg-indigo-500' : 'bg-[#F2F2F2]'
      } border border-[#0D0D0D] dark:border-none outline-none rounded-full`}
      onCheckedChange={handleCheckboxChange}
      checked={checked}
    >
      <Checkbox.Indicator className="text-[#F2F2F2]">
        <FontAwesomeIcon icon={faCheck} size="xs" />
      </Checkbox.Indicator>
    </Checkbox.Root>
  )
}
