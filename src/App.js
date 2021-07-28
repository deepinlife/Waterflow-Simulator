import { useState } from 'react'
import './App.css';
import GridCreation from './components/grid-creation'
import DragObstruction from './components/drag-obstruction';
import SelectWaterFlow from './components/select-water-flow';
import StartSimulation from './components/start-simulation';

function App() {
  const [activeComp, setActiveCom] = useState("gridCreation")
  const [gridData, setGridData] = useState({ rows: 1, columns: 1, obstructions: 1 })
  const [obsPosOnGrid, setObsPosOnGrid] = useState({})
  const [startPoint, setStartPoint] = useState()

  const components = {
    "gridCreation": <GridCreation setGridData={setGridData} gridData={gridData} setActiveCom={setActiveCom} />,
    "dragObstruction": <DragObstruction
      gridData={gridData}
      setActiveCom={setActiveCom}
      obsPosOnGrid={obsPosOnGrid}
      setObsPosOnGrid={setObsPosOnGrid}
    />,
    "selectWaterFlow": <SelectWaterFlow
      gridData={gridData}
      setActiveCom={setActiveCom}
      obsPosOnGrid={obsPosOnGrid}
      startPoint={startPoint}
      setStartPoint={(value) => {
        setStartPoint(value);
        setActiveCom("startSimulation")
      }}
    />,
    "startSimulation": <StartSimulation
      gridData={gridData}
      obsPosOnGrid={obsPosOnGrid}
      startPoint={startPoint}
    />
  }



  return (
    <div className="App">
      <div className="content">
        <h1>Waterflow Simulator</h1>
        <div>
          {components[activeComp]}
        </div>
      </div>
    </div>
  );
}

export default App;
