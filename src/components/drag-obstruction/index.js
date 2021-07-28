import React from 'react';
import { Button, Row, Col } from 'antd';
import './styles.css';
import { gridBlockIds, MakeGrid, MakeObstructionGrid } from '../grid-block'


const DragObstruction = ({ gridData, setActiveCom, obsPosOnGrid, setObsPosOnGrid }) => {
  const [activeDrags, setActiveDrags] = React.useState(0)

  const onStart = () => {
    setActiveDrags(activeDrags + 1)
  };

  const onDrop = (obstructionId) => (e) => {
    setActiveDrags(activeDrags - 1)
    if (Object.keys(gridBlockIds).includes(e.target.id)) {
      setObsPosOnGrid((prev) => ({ ...prev, [obstructionId]: e.target.id }))
    } else if (obsPosOnGrid[obstructionId]) {
      let ids = { ...obsPosOnGrid }
      delete ids[obstructionId]
      setObsPosOnGrid(ids)
    }
  };

  const renderGrid = MakeGrid(gridData["rows"], gridData["columns"])
  const renderObstructionGrid = MakeObstructionGrid(gridData["obstructions"], activeDrags, onStart, onDrop)

  return (
    <div className="drag-obstruction">
      <span>Drag the obstructions and place it inside the grid</span>
      <Row gutter={24} style={{ marginTop: 40 }}>
        <Col span={16}>
          {renderGrid}
        </Col>
        <Col span={6}>
          {renderObstructionGrid}
        </Col>
      </Row>
      <div className="drag-footer">
        <Button
          type="primary"
          onClick={() => setActiveCom("gridCreation")}
        >
          Back
        </Button>
        <Button
          disabled={Object.keys(obsPosOnGrid).length !== gridData["obstructions"]}
          type="primary"
          style={{ marginLeft: 30 }}
          onClick={() => setActiveCom("selectWaterFlow")}
        >
          Start Simulation
        </Button>
      </div>
    </div>
  )

}
export default DragObstruction;