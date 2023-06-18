import React, { useEffect, useState } from 'react'

import { Position } from '../types'
import ReportOutput from './Output'
import Grid from './Grid'
interface RobotVacuumProps {
  position: Position | null
}

const RobotVacuum: React.FC<RobotVacuumProps> = () => {
  const [robotPosition, setRobotPosition] = useState<Position | null>(null)
  const [showReport, setShowReport] = useState<boolean>(false)

  const [x, setX] = useState<number>(0)
  const [y, setY] = useState<number>(0)
  const [f, setF] = useState<string>('NORTH')

  const GRID_SIZE = 5
  const MAX_POSITION = GRID_SIZE - 1

  const handlePlace = (x: number, y: number, f: string) => {
    const placedPosition: Position = {
      x: x,
      y: y,
      f: f as 'NORTH' | 'EAST' | 'SOUTH' | 'WEST'
    }

    setRobotPosition(placedPosition)
  }

  const handleReport = () => {
    setShowReport(true)
  }

  const handleMove = () => {
    let newPosition: Position | null = null

    if (robotPosition) {
      newPosition = { ...robotPosition }

      switch (f) {
        case 'NORTH':
          if (newPosition.y !== MAX_POSITION) {
            newPosition.y = (newPosition.y ?? 0) + 1
            setY(newPosition.y)
          }
          break
        case 'EAST':
          if (newPosition.x !== MAX_POSITION) {
            newPosition.x = (newPosition.x ?? 0) + 1
            setX(newPosition.x)
          }
          break
        case 'SOUTH':
          if (newPosition.y !== 0) {
            newPosition.y = (newPosition.y ?? 0) - 1
            setY(newPosition.y)
          }
          break
        case 'WEST':
          if (newPosition.x !== 0) {
            newPosition.x = (newPosition.x ?? 0) - 1
            setX(newPosition.x)
          }
          break
      }
    }

    setRobotPosition(newPosition)
  }

  const handleRotateRight = () => {
    switch (f) {
      // if face north, rotate right will become
      case 'NORTH':
        setF('EAST')
        break
      case 'EAST':
        setF('SOUTH')
        break
      case 'SOUTH':
        setF('WEST')
        break
      case 'WEST':
        setF('NORTH')
        break
      default:
        return
    }
  }

  const handleRotateLeft = () => {
    switch (f) {
      case 'NORTH':
        setF('WEST')
        break
      case 'EAST':
        setF('NORTH')
        break
      case 'SOUTH':
        setF('EAST')
        break
      case 'WEST':
        setF('SOUTH')
        break
      default:
        return
    }
  }

  useEffect(() => {
    setRobotPosition((prevPosition) => {
      if (prevPosition) {
        return { ...prevPosition, f: f as 'NORTH' | 'EAST' | 'SOUTH' | 'WEST' }
      }
      return null
    })
  }, [f])

  return (
    <>
      <div className="grid-container">
        <Grid position={robotPosition} gridSize={GRID_SIZE} />

        {showReport && robotPosition !== null ? <ReportOutput position={robotPosition} /> : ''}
      </div>
      <div className="action-container">
        <div className="placement">
          <h2>Place DJ Roomba on the grid</h2>
          <p>
            Enter the <strong>X</strong> and <strong>Y</strong> coordinates of your desired location
            and select the facing <strong>direction</strong> from the dropdown menu.
            <br />
            <br /> Once you've inputted the desired parameters, simply click the "Place" button to
            position the robot on the specified coordinates.
          </p>
          <div className="row">
            <label>
              Set X position (0-4)
              <input
                type="text"
                pattern="[0-4]"
                maxLength={1}
                value={x}
                onChange={(e) => {
                  if (/^[0-4]$/.test(e.target.value)) {
                    setX(parseInt(e.target.value))
                  }
                }}
              />
            </label>
            <label>
              Set Y position (0-4)
              <input
                type="text"
                pattern="[0-4]"
                maxLength={1}
                value={y}
                onChange={(e) => {
                  if (/^[0-4]$/.test(e.target.value)) {
                    setY(parseInt(e.target.value))
                  }
                }}
              />
            </label>
            <label>
              Set Direction
              <select value={f} onChange={(e) => setF(e.target.value)}>
                <option value="NORTH">NORTH</option>
                <option value="EAST">EAST</option>
                <option value="SOUTH">SOUTH</option>
                <option value="WEST">WEST</option>
              </select>
            </label>
          </div>
          <button className="primary" onClick={() => handlePlace(x, y, f)}>
            PLACE
          </button>
        </div>
        {robotPosition === null ? (
          ''
        ) : (
          <div className="actions">
            <div className="row">
              <button className="secondary" onClick={handleRotateLeft}>
                ROTATE LEFT
              </button>
              <button className="secondary" onClick={handleRotateRight}>
                ROTATE RIGHT
              </button>
              <button className="secondary" onClick={handleMove}>
                MOVE
              </button>
              <button className="secondary" onClick={handleReport}>
                REPORT
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default RobotVacuum

const robotBorderStyle = (direction: 'NORTH' | 'EAST' | 'SOUTH' | 'WEST') => {
  const style = '3px solid hotpink'
  switch (direction) {
    case 'NORTH':
      return { borderTop: style }
    case 'SOUTH':
      return { borderBottom: style }
    case 'EAST':
      return { borderRight: style }
    case 'WEST':
      return { borderLeft: style }
    default:
      return {}
  }
}
