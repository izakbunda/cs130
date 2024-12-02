import React from 'react'
import { render, screen } from '@testing-library/react'
import ProgressBar from '../progress-bar'

describe('ProgressBar Component', () => {
  it('renders correctly with given props', () => {
    render(<ProgressBar currentExp={50} level={1} page="Landing" />)
    expect(screen.getByText(/Level 1:/)).toBeInTheDocument()
    expect(screen.getByText(/50\/100 EXP/)).toBeInTheDocument()
  })
})
