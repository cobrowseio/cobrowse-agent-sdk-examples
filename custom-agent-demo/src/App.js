import FakeWindow from './components/FakeWindow'
import CustomAgentUIExample from './CustomAgentUIExample'
import './App.css'

function App(props) {
  function renderCustomerView () {
    const params = {
      demo_id: props.demoId,
      license: 'trial',
      api: props.api,
      device_name: 'Trial Website'
    }
    return (
      <div className='customer-view'>
        <h2>Your Customer</h2>
        <FakeWindow>
          <iframe
            allow='display-capture'
            className='device'
            title='Device'
            frameBorder={0}
            width={'100%'}
            height={'100%'}
            src={`https://cobrowseio.github.io/todo-mvc-example/index.html?demo_id=${params.demo_id}&device_name=Web%20Trial%20Device&license=${params.license}&api=${params.api}`}
          />
        </FakeWindow>
      </div>
    )
  }

  function renderAgentView () {
    return (
      <div className='agent-view'>
        <h2>Your Support Agent</h2>
        <FakeWindow>
            <CustomAgentUIExample {...props} />
        </FakeWindow>
      </div>
    )
  }

  return (
    <div className='App'>
      {renderAgentView()}
      {renderCustomerView()}
    </div>
  )
}

export default App;
