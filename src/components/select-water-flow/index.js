import React from 'react';
import { Button, Row, Col } from 'antd';
import { MakeGrid, MakeObstructionGrid, MakeStartPoint } from '../grid-block'


const SelectWaterFlow = ({ gridData, setActiveCom, obsPosOnGrid, setStartPoint }) => {


  const renderStartPoint = MakeStartPoint(gridData["columns"], null, setStartPoint)
  const renderGrid = [renderStartPoint, MakeGrid(gridData["rows"], gridData["columns"], Object.values(obsPosOnGrid))]

  const renderObstructionGrid = MakeObstructionGrid(gridData["obstructions"])

  return (
    <div className="drag-obstruction">
      <span>Select the waterflow start point by clicking on any blue boxes</span>
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
          onClick={() => setActiveCom("dragObstruction")}
        >
          Back
        </Button>
      </div>
    </div>
  )

}
export default SelectWaterFlow;