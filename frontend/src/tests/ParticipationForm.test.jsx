import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ParticipationForm from '../components/ParticipationForm';

describe('ParticipationForm', () => {
  it('should render all input fields and a submit button', () => {
    render(<ParticipationForm onSubmit={() => {}} />);
    
    expect(screen.getByPlaceholderText(/first name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/last name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/participation/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /send/i })).toBeInTheDocument();
  });

  it('should call the onSubmit prop with form data when submitted', () => {
    const mockOnSubmit = vi.fn();
    render(<ParticipationForm onSubmit={mockOnSubmit} />);
    
    // Preenche os campos
    fireEvent.change(screen.getByPlaceholderText(/first name/i), { target: { value: 'Hugo' } });
    fireEvent.change(screen.getByPlaceholderText(/last name/i), { target: { value: 'Silva' } });
    fireEvent.change(screen.getByPlaceholderText(/participation/i), { target: { value: '20' } });
    
    // Clica no botão
    fireEvent.click(screen.getByRole('button', { name: /send/i }));
    
    // Verifica se a função foi chamada com os dados corretos
    expect(mockOnSubmit).toHaveBeenCalledWith({
      firstName: 'Hugo',
      lastName: 'Silva',
      participation: 20
    });
  });
});