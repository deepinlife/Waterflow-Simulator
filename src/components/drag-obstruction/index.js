import React, { useCallback } from 'react';
import { Button, Row, Col } from 'antd';
import './styles.css';
import { gridBlockIds, MakeGrid, MakeObstructionGrid, MakeStartPointGrid } from '../grid-block'

/**
 * Display Waterflow from start point
 * This method show all possible ways
 * where water moves 
 * @param {*} obsPosOnGrid - obstruction position on main grid 
 * @param {*} startPoint 
 * @param {*} rows 
 * @param {*} columns 
 */
const fillWaterContainer = (obsPosOnGrid, startPoint, rows, columns) => {
  /** convert object structure {"ob-00":"11"} to {"11":"11"} for ease */
  let obs = Object.values(obsPosOnGrid).reduce((a, b) => {
    a[b] = b;
    return a;
  }, {});

  /** remove margin bottom from first start point of water flow */
  document.getElementById("start-point-row").style.marginBottom = "0px";

  function fillWater(currentLocation) {
    /** get id of next row but same column of block */
    let nextBlockId = (currentLocation[0] + 1 >= 0) && document.getElementById(`${currentLocation[0] + 1}${currentLocation[1]}`)
    /** check if next row but same column block has obstruction or not and it is filled with water or not */
    if (obs[`${currentLocation[0] + 1}${currentLocation[1]}`] || (nextBlockId && nextBlockId.style.backgroundColor === 'blue')) {
      let isGoOnLeftOrRight = false;

      let leftBlockId = (currentLocation[1] - 1 >= 0) && document.getElementById(`${currentLocation[0]}${currentLocation[1] - 1}`);
      /** check if left block has no obstruction, not a first block and not filled with water or vice-versa  */
      if (leftBlockId && !obs[`${currentLocation[0]}${currentLocation[1] - 1}`] && leftBlockId.style.backgroundColor !== 'blue') {
        /** change block color */
        leftBlockId.style.backgroundColor = "blue";
        isGoOnLeftOrRight = true;
        fillWater([currentLocation[0], currentLocation[1] - 1]);
      }
      let rightBlockId = (currentLocation[1] + 1 < columns) && document.getElementById(`${currentLocation[0]}${currentLocation[1] + 1}`)
      /** check if right block has no obstruction, not a last block and not filled with water or vice-versa  */
      if (rightBlockId && !obs[`${currentLocation[0]}${currentLocation[1] + 1}`] && rightBlockId.style.backgroundColor !== 'blue') { // column check
        isGoOnLeftOrRight = true;
        /** change block color */
        rightBlockId.style.backgroundColor = "blue";
        fillWater([currentLocation[0], currentLocation[1] + 1]);
      }
      /** check if water flow not move on left or right then it goes on upward direction */
      if (!isGoOnLeftOrRight && (currentLocation[0] - 1) >= 0) {
        fillWater([currentLocation[0] - 1, currentLocation[1]]);
      }
    }
    else if (currentLocation[0] + 1 < (rows + 1)) { // row check
      let currentBlockId = document.getElementById(`${currentLocation[0] + 1}${currentLocation[1]}`)
      currentBlockId.style.backgroundColor = "blue";
      fillWater([currentLocation[0] + 1, currentLocation[1]]);
    }
  }

  /** start filling water from start point */
  fillWater([-1, startPoint])

}


/**
 * Display grid view
 * Here use can drag obstruction and place to mai grid
 * select waterflow point and start simulation
 * @param {*} gridData 
 * @returns 
 */
const DragObstruction = ({ gridData, setActiveCom, }) => {
  const [activeDrags, setActiveDrags] = React.useState(0)
  const [obsPosOnGrid, setObsPosOnGrid] = React.useState({})
  const [startPoint, setStartPoint] = React.useState()
  const [selectStartPointStep, setSelectStartPointStep] = React.useState()

  const onStart = () => {
    setActiveDrags(activeDrags + 1)
  };

  /**
   * Called when obstruction drop from one position to another
   * @param {*} obstructionId 
   * @returns 
   */
  const onDrop = (obstructionId) => (e) => {
    setActiveDrags(activeDrags - 1)
    /** if obstruction place at right block on grid */
    if (Object.keys(gridBlockIds).includes(e.target.id)) {
      setObsPosOnGrid((prev) => ({ ...prev, [obstructionId]: e.target.id }))
    } else if (obsPosOnGrid[obstructionId]) {
      let ids = { ...obsPosOnGrid }
      delete ids[obstructionId]
      setObsPosOnGrid(ids)
    }
  };

  const handleFillWater = useCallback(() => {
    fillWaterContainer(obsPosOnGrid, startPoint, gridData["rows"], gridData["columns"])
  }, [obsPosOnGrid, startPoint, gridData])


  React.useEffect(() => {
    if (!isNaN(startPoint)) {
      handleFillWater()
    }
  }, [startPoint, handleFillWater])


  /** Generate main grid */
  const renderGrid = MakeGrid(gridData["rows"], gridData["columns"])
  let generatedStartPointGrid = null;

  if (selectStartPointStep) {
    /** Generate all waterflow start point */
    generatedStartPointGrid = MakeStartPointGrid({
      columns: gridData["columns"],
      startPoint,
      setStartPoint
    })
  }

  /** Generate obstruction grid */
  const renderObstructionGrid = MakeObstructionGrid({
    obstructions: gridData["obstructions"],
    activeDrags,
    onStart,
    onDrop,
    disableDrag: selectStartPointStep
  })

  return (
    <div className="drag-obstruction">
      {isNaN(startPoint) ? <span className="sub-heading">{
        selectStartPointStep ?
          "Select the waterflow start point by clicking on any blue boxes" :
          "Drag the obstructions and place it inside the grid"}
      </span> : null}
      {generatedStartPointGrid}
      <Row gutter={24}>
        <Col span={18}>
          {renderGrid}
        </Col>
        <Col span={6}>
          {renderObstructionGrid}
        </Col>
      </Row>
      {isNaN(startPoint) ? <div className="drag-footer">
        <Button
          type="primary"
          onClick={() => {
            if (selectStartPointStep) {
              setSelectStartPointStep(false)
            } else {
              setActiveCom("gridCreation")
            }
          }}
        >
          Back
        </Button>
        {selectStartPointStep ? null : <Button
          disabled={Object.keys(obsPosOnGrid).length !== gridData["obstructions"]}
          type="primary"
          style={{ marginLeft: 30 }}
          onClick={() => setSelectStartPointStep(true)}
        >
          Start Simulation
        </Button>}
      </div> : null}
    </div>
  )

}
export default DragObstruction;