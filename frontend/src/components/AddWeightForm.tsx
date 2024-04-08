import { SyntheticEvent, useState } from 'react';
import FormInput from './FormInput';

interface AddWeightFormProps {
  addWeight: (weight: number, date: string) => void;
}

const AddWeightForm = ({ addWeight }: AddWeightFormProps) => {
  const [weight, setWeight] = useState(0);

  const handleAddWeight = (e: SyntheticEvent) => {
    e.preventDefault();

    if (weight !== 0) {
      const date = new Date().toISOString();
      console.log('form weight, date:', weight, date);
      addWeight(weight, date);
    }
  };
  return (
    <form className="form event-form" onSubmit={handleAddWeight}>
      <FormInput
        field={{
          name: 'event-weight-input',
          label: 'Weight',
          inputType: 'text',
          value: weight.toString(),
          setValue: (value: string) => setWeight(parseFloat(value)),
        }}
      />
      <button type="submit">Add Weight</button>
    </form>
  );
};

export default AddWeightForm;
