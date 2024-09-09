import './App.css';
import QuestionBox from './components/QuestionBox';
import Layout from './layout/Layout';
import { useState } from 'react';

function App() {
 const [testMode, setTestMode] = useState(false);

  return (
    <div className="App">
      <Layout setTestMode={setTestMode}>
     <QuestionBox testMode={testMode}/>
     </Layout>
    </div>
  );
}

export default App;
