import React from 'react'
import { Position } from '../types'

interface ReportOutputProps {
  position: Position
}

const ReportOutput: React.FC<ReportOutputProps> = ({ position }) => {
  return (
    <div className="output">
      Mr Roomba is currently at position{' '}
      <strong>
        ({position.x}, {position.y})
      </strong>{' '}
      facing <strong>{position.f}</strong>
    </div>
  )
}

export default ReportOutput
