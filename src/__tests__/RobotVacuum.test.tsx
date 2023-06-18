/* eslint-disable testing-library/prefer-screen-queries */
import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react'
import RobotVacuum from '../components/RobotVacuum'

describe('RobotVacuum', () => {
  test('renders the component', () => {
    render(<RobotVacuum />)
  })

  test('handles rotate and move actions correctly', async () => {
    const { getByText, getByLabelText } = render(<RobotVacuum />)

    const xInput = getByLabelText('Set X position (0-4)') as HTMLInputElement
    fireEvent.change(xInput, { target: { value: '1' } })

    const yInput = getByLabelText('Set Y position (0-4)') as HTMLInputElement
    fireEvent.change(yInput, { target: { value: '2' } })

    const directionSelect = getByLabelText('Set Direction') as HTMLSelectElement
    fireEvent.change(directionSelect, { target: { value: 'EAST' } })

    const placeButton = getByText('PLACE')
    fireEvent.click(placeButton)

    const rotateLeftButton = getByText('ROTATE LEFT')
    fireEvent.click(rotateLeftButton)

    await waitFor(() => {
      expect(directionSelect.value).toBe('NORTH')
    })

    const rotateRightButton = getByText('ROTATE RIGHT')
    fireEvent.click(rotateRightButton)

    await waitFor(() => {
      expect(directionSelect.value).toBe('EAST')
    })

    const moveButton = getByText('MOVE')
    fireEvent.click(moveButton)

    await waitFor(() => {
      expect(xInput.value).toBe('2')
    })
  })
})
