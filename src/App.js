import React from 'react';
import './App.css';
import './a';


function App() {
  
    const script = document.createElement("script");
    script.src = "./a.js";
    script.async = true;
  
    document.body.appendChild(script);
  
  return (
<div>

<canvas width="700" height="450" id="drawing-surface"></canvas>

   
    
</div> 
  );
}

export default App;
