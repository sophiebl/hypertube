import React from 'react';
import './App.css';
import axios from 'axios';

function App() {
  axios.get('/api')
  .then(function (response) {
    // handle success
    console.log(response);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .then(function () {
    // always executed
  });


  return (
    <div className="App">
      <div>
			<form method="POST" className="login bg-desc">
				<input type="text" name="username" placeholder="username" required/>
				<input type="password" name="password" placeholder="password" required/>
				<button>Login</button>
			</form>
			{/* <Link to="/reset" className="btn">Forgot password</Link> */}
		</div>
    </div>
  );
}

export default App;
