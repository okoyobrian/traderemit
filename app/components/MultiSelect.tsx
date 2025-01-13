import { Field, Label, Radio, RadioGroup } from '@headlessui/react'


interface MultiSelectProps {
  options: { name: string, value: string }[];
  selectedOption: string | undefined;
  setSelectedOption: (option: string) => void;
  label: string;
}

export default function MultiSelect({ options, selectedOption, setSelectedOption, label }: MultiSelectProps) {

  return (
    <>
    <div className="font-medium text-md tracking-tight mb-1 text-secondary-text mb-2">{label}</div>
    <RadioGroup value={selectedOption} onChange={setSelectedOption} aria-label="Server size" className="flex flex-wrap gap-2 my-1">
      {options.map((option) => (
        <Field key={option.value} className="flex">
          <Radio value={option.value}></Radio>
          <Label className={`cursor-pointer p-3 px-4 border border-gray-300 rounded-lg text-semiprimary-text font-semibold ${option.value === selectedOption && '!text-primary !border-primary bg-primary-bg'}`}>{option.name}</Label>
        </Field>
      ))}
    </RadioGroup>
    </>
  )
}