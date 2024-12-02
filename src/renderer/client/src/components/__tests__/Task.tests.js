import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Task } from '../task'

describe('Task Component', () => {
  const mockOnCheckboxChange = jest.fn()
  const mockOnEditTask = jest.fn()
  const mockOnEditDate = jest.fn()
  const mockOnEditCategory = jest.fn()
  const mockEndEditing = jest.fn()

  const mockProps = {
    taskText: 'Sample Task',
    id: '12345',
    status: 'pending',
    startDate: '2024-12-01T00:00:00Z',
    dueDate: '2024-12-10T00:00:00Z',
    category: 'medium',
    editingTask: false,
    onEditTask: mockOnEditTask,
    editingDate: false,
    onEditDate: mockOnEditDate,
    editingCategory: false,
    onEditCategory: mockOnEditCategory,
    endEditing: mockEndEditing,
    points: { x: 100, y: 100 },
    onCheckboxChange: mockOnCheckboxChange
  }

  it('handles checkbox toggling correctly', () => {
    render(<Task {...mockProps} />)
    const checkbox = screen.getByRole('checkbox')
    fireEvent.click(checkbox)
    expect(mockOnCheckboxChange).toHaveBeenCalledWith(true, '12345') // Task ID is passed correctly
    fireEvent.click(checkbox)
    expect(mockOnCheckboxChange).toHaveBeenCalledWith(false, '12345')
  })

  it('allows task name editing when `editingTask` is true', () => {
    render(<Task {...mockProps} editingTask={true} />)
    const input = screen.getByRole('textbox')
    expect(input).toHaveValue('Sample Task')
    fireEvent.change(input, { target: { value: 'Updated Task' } })
    expect(input).toHaveValue('Updated Task')
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' })
    expect(mockOnEditTask).toHaveBeenCalledWith('12345', 'Updated Task')
    expect(mockEndEditing).toHaveBeenCalled()
  })

  it('allows due date editing with the date picker', () => {
    render(<Task {...mockProps} editingDate={true} />)
    expect(screen.getByText('Set Date')).toBeInTheDocument() // Example from dateTime picker
    fireEvent.click(screen.getByText('Set Date'))
    mockOnEditDate('12345', '2024-12-15T00:00:00Z')
    expect(mockOnEditDate).toHaveBeenCalledWith('12345', '2024-12-15T00:00:00Z')
  })

  it('allows category editing when `editingCategory` is true', () => {
    render(<Task {...mockProps} editingCategory={true} />)
    fireEvent.click(screen.getByText('easy'))
    expect(mockOnEditCategory).toHaveBeenCalledWith('12345', 'easy')
    fireEvent.click(screen.getByText('medium'))
    expect(mockOnEditCategory).toHaveBeenCalledWith('12345', 'medium')
    fireEvent.click(screen.getByText('hard'))
    expect(mockOnEditCategory).toHaveBeenCalledWith('12345', 'hard')
  })
})
