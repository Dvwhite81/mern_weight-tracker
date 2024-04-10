import { InputField } from '../utils/types';

interface FormInputProps {
  field: InputField;
}

const FormInput = ({ field }: FormInputProps) => {
  const { name, label, inputType, value, setValue } = field;

  return (
    <div className="form-input-container">
      <label className="form-label" htmlFor={name}>
        {label}
        <input
          id={name}
          type={inputType}
          value={value.toString()}
          onChange={({ target }) => setValue(target.value)}
          min={typeof value === 'number' ? 0 : value}
        />
      </label>
    </div>
  );
};

export default FormInput;
