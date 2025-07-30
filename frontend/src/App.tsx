import { useState } from 'react';
import NavBar from '@/NavBar.tsx';
import SideBar from '@/SideBar.tsx';
import MainBoard from '@/MainBoard.tsx';
import '@/App.css'

export default function App() {
  const [sideBarVisible, setSideBarVisible] = useState(false);

  function handleBurgerClick() {
    setSideBarVisible(!sideBarVisible);
  }
  
  return (
    <>
      <NavBar onBurgerClick={handleBurgerClick} />
      <SideBar visible={sideBarVisible} />
      <MainBoard />
    </>
  );
}







// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.tsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App
