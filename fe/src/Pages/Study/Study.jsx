import React, { useState } from "react";


export default function Study(){
  const [count, setCount] = useState(0);

  return(
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increase Count</button>
    </div>
  )
}