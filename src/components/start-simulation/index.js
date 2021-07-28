import React from 'react';
import { Row, Col } from 'antd';
import { MakeGrid, MakeStartPoint } from '../grid-block'


const StartSimulation = ({ gridData, obsPosOnGrid, startPoint }) => {

  React.useEffect(() => {
    fillWater([-1, startPoint])
  }, [])


  const fillWater = (currentLocation) => {
    let obs = Object.values(obsPosOnGrid).reduce((a, b) => {
      a[b] = b;
      return a;
    }, {});

    if (obs[`${currentLocation[0] + 1}${currentLocation[1]}`]) {
      let isWaterFilled = document.getElementById(`${currentLocation[0]}${currentLocation[1] - 1}`).style.backgroundColor
      if (currentLocation[1] - 1 >= 0 && !obs[`${currentLocation[0]}${currentLocation[1] - 1}`] && isWaterFilled !== 'blue') {
        // color change .
        document.getElementById(`${currentLocation[0]}${currentLocation[1] - 1}`).style.backgroundColor = "blue";
        fillWater([currentLocation[0], currentLocation[1] - 1]);
      }
      isWaterFilled = document.getElementById(`${currentLocation[0]}${currentLocation[1] + 1}`).style.backgroundColor
      if (currentLocation[1] + 1 < gridData["columns"] && !obs[`${currentLocation[0]}${currentLocation[1] + 1}`] && isWaterFilled !== 'blue') { // column check
        // color change .
        document.getElementById(`${currentLocation[0]}${currentLocation[1] + 1}`).style.backgroundColor = "blue";
        fillWater([currentLocation[0], currentLocation[1] + 1]);
      }
    }
    else if (currentLocation[0] + 1 < (gridData["rows"] + 1)) { // row check
      document.getElementById(`${currentLocation[0] + 1}${currentLocation[1]}`).style.backgroundColor = "blue";
      fillWater([currentLocation[0] + 1, currentLocation[1]]);
    }

  }

  const renderStartPoint = MakeStartPoint(gridData["columns"], startPoint)
  const renderGrid = [renderStartPoint, MakeGrid(gridData["rows"], gridData["columns"], Object.values(obsPosOnGrid))]

  return (
    <div className="drag-obstruction">
      <Row gutter={24} style={{ marginTop: 40 }}>
        <Col span={16}>
          {renderGrid}
        </Col>
      </Row>
    </div>
  )

}
export default StartSimulation;