import React from 'react';
import styled from 'styled-components';

interface Option {
  id: string;
  name?: string;
  value?: string;
}

interface SelectFieldProps {
  label: string;
  options: Option[];
  value?: string;
  onChange: (value: string) => void;
  required?: boolean;
  error?: string;
}

const Container = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: #4a5568;
  margin-bottom: 0.5rem;
`;

const Select = styled.select`
  width: 100%;
  padding: 0.5rem;
  border-radius: 0.375rem;
  border: 1px solid #cbd5e0;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  &:focus {
    border-color: #3182ce;
    box-shadow: 0 0 0 1px #3182ce;
  }
`;

const ErrorMessage = styled.span`
  font-size: 0.875rem;
  color: #e53e3e;
`;

export const SelectField = ({ label, options, value, onChange, required, error }: SelectFieldProps) => {
  
  const selectedOption = options.find(option => option.id === value);

  return (
    <Container>
      <Label>{label}</Label>
      <Select
        onChange={(e) => onChange(e.target.value)}
        required={required}
      >
        <option value={selectedOption?.id}>
          {selectedOption ? selectedOption.name || selectedOption.value : `Selecionar ${label}`}
        </option>
        {options
  .filter(option => 
    (option.name !== 'Selecione' && option.value !== 'Selecione') &&
    (selectedOption?.id !== option.id)
  )
  .map((option) => (
    <option key={option.id} value={option.id}>
      {option.name || option.value}
    </option>
  ))
}
      </Select>
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </Container>
  );
};