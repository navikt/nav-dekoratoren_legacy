import * as React from 'react';
import Header from './komponenter/header/header';
import Footer from "./komponenter/footer/footer";

function App() {
  return (
      <>
        <div id="header-withmenu">
          <Header/>
        </div>
        <div id="footer-withmenu">
          <Footer/>
        </div>
      </>
  );
}
export default App;
