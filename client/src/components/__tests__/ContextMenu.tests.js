import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import ContextMenu from '../contextMenu'

describe('ContextMenu Component', () => {
  const mockOptions = [
    { label: 'Edit', action: jest.fn() },
    { label: 'Delete', action: jest.fn() },
    { label: 'Move', action: jest.fn() }
  ]

  const top = 100
  const left = 200

  it('renders correctly with given options', () => {
    render(<ContextMenu top={top} left={left} options={mockOptions} />)

    // Check if the container has the role of "menu"
    const contextMenu = screen.getByRole('menu')
    expect(contextMenu).toBeInTheDocument()

    // Check if all options are rendered with the role of "menuitem"
    mockOptions.forEach((option) => {
      const optionElement = screen.getByText(option.label)
      expect(optionElement).toBeInTheDocument()
      expect(optionElement).toHaveAttribute('role', 'menuitem')
    })

    // Check if the container has the correct styles
    expect(contextMenu).toHaveStyle(`top: ${top}px`)
    expect(contextMenu).toHaveStyle(`left: ${left}px`)
  })

  it('calls the correct action when an option is clicked', () => {
    render(<ContextMenu top={top} left={left} options={mockOptions} />)

    // Simulate clicking each option
    mockOptions.forEach((option) => {
      const optionElement = screen.getByText(option.label)
      fireEvent.click(optionElement)
      expect(option.action).toHaveBeenCalledTimes(1)
    })
  })

  it('does not break when options are empty', () => {
    render(<ContextMenu top={top} left={left} options={[]} />)

    // Ensure no options are rendered
    expect(screen.queryAllByRole('menuitem')).toHaveLength(0)
  })
})
