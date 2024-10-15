import { useState, useEffect } from 'react';

function App() {
  const colors = ['red', 'green', 'blue'];

  
  const getRandomColor = () => {
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  };

  const ColorGame = () => {
    const [color1, setColor1] = useState(getRandomColor());
    const [color2, setColor2] = useState(getRandomColor());
    const [color3, setColor3] = useState(getRandomColor());

    const [stopped1, setStopped1] = useState(false);
    const [stopped2, setStopped2] = useState(false);
    const [stopped3, setStopped3] = useState(false);

    const [gameResult, setGameResult] = useState<string | null>(null);

   
    useEffect(() => {
      const interval = setInterval(() => {
        if (!stopped1) setColor1(getRandomColor());
        if (!stopped2) setColor2(getRandomColor());
        if (!stopped3) setColor3(getRandomColor());
      }, 500); 

      
      return () => clearInterval(interval);
    }, [stopped1, stopped2, stopped3]);


    useEffect(() => {
      if (stopped1 && stopped2 && stopped3) {
        checkResult();
      }
    }, [stopped1, stopped2, stopped3]);

    
    const checkResult = () => {
      if (color1 === color2 && color2 === color3) {
        setGameResult('Ganaste');
      } else {
        setGameResult('Perdiste');
      }
      resetGame(); 
    };

    
    const resetGame = () => {
      setTimeout(() => {
        setColor1(getRandomColor());
        setColor2(getRandomColor());
        setColor3(getRandomColor());
        setStopped1(false);
        setStopped2(false);
        setStopped3(false);
        setGameResult(null);
      }, 2000);
    };

    return (
      <div className="App">
        <h1>Juego de Colores</h1>

        
        <div style={{ display: 'flex', gap: '20px' }}>
          <div style={{ backgroundColor: color1, width: '100px', height: '100px' }}></div>
          <div style={{ backgroundColor: color2, width: '100px', height: '100px' }}></div>
          <div style={{ backgroundColor: color3, width: '100px', height: '100px' }}></div>
        </div>

     
        <div style={{ marginTop: '20px' }}>
          <button onClick={() => setStopped1(true)} disabled={stopped1}>
            Detener 1
          </button>
          <button onClick={() => setStopped2(true)} disabled={stopped2}>
            Detener 2
          </button>
          <button onClick={() => setStopped3(true)} disabled={stopped3}>
            Detener 3
          </button>
        </div>

     
        {gameResult && <h2>{gameResult}</h2>}
      </div>
    );
  };

  return <ColorGame />;
}

export default App;
