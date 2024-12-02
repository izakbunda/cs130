import React from 'react'
import { render, screen } from '@testing-library/react'
import Button from '../button'

// Simple render test
describe('Button Component', () => {
  it('renders correctly with given props', () => {
    render(<Button text={'test'} />)
    expect(screen.getByText(/test/)).toBeInTheDocument()
  })
})
