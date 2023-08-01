<<<<<<< HEAD
import React from 'react'
import { Outlet } from 'react-router-dom'
const Study = () => {
  return (
    <div>
      Study
      <Outlet />
    </div>
  )
}

export default Study
=======
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
>>>>>>> 7e1ae3aabb788553f58bc79ec20b90bf4ad9985e
