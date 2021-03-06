import React, { Component } from 'react';
import Particles from 'react-particles-js';
import 'tachyons';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import './App.css';

const particlesOptions = {
  particles: {
    number: {
      value: 100,
      density: {
        enable: true,
        value_area: 800,
      },
    },
  },
};

const initialState = {
  input: '',
  imageURL: '',
  box: {},
  route: 'signin',
  isSignedIn: false,
  user: {
    id: '',
    email: '',
    name: '',
    entries: 0,
    joined: '',
  },
};

class App extends Component {
  constructor() {
    super();
    this.state = initialState;

    this.onInputChange = this.onInputChange.bind(this);
    this.onButtonSubmit = this.onButtonSubmit.bind(this);
    this.displayFaceBox = this.displayFaceBox.bind(this);
    this.onRouteChange = this.onRouteChange.bind(this);
    this.loadUser = this.loadUser.bind(this);
  }

  loadUser(data) {
    this.setState({
      user: {
        id: data.id,
        email: data.email,
        name: data.name,
        entries: data.entries,
        joined: data.joined,
      },
    });
  }

  onInputChange(event) {
    this.setState({ input: event.target.value });
  }

  calculateFaceLocation(data) {
    const clarifaiFace =
      data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);

    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - clarifaiFace.right_col * width,
      bottomRow: height - clarifaiFace.bottom_row * height,
    };
  }

  displayFaceBox(box) {
    this.setState({ box: box });
  }

  onRouteChange(route) {
    this.setState({ route: route });
    if (route === 'signout') {
      this.setState(initialState);
    } else if (route === 'home') {
      this.setState({ isSignedIn: true });
    } else if (route === 'register') {
      this.setState({ isSignedIn: false });
    }
  }

  onButtonSubmit() {
    this.setState({ imageURL: this.state.input });
    fetch('https://boiling-savannah-46796.herokuapp.com/imageurl', {
      method: 'post',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        input: this.state.input,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response) {
          fetch('https://boiling-savannah-46796.herokuapp.com/image', {
            method: 'put',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({
              id: this.state.user.id,
            }),
          })
            .then((response) => response.json())
            .then((count) => {
              this.setState(Object.assign(this.state.user, { entries: count }));
            })
            .catch((err) => console.log(err));
        }
        this.displayFaceBox(this.calculateFaceLocation(response));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    const { isSignedIn, imageURL, route, box, user } = this.state;
    return (
      <div className="App">
        <Particles className="particles" params={particlesOptions} />
        <Navigation
          isSignedIn={isSignedIn}
          onRouteChange={this.onRouteChange}
        />
        {route === 'home' ? (
          <>
            <Logo />
            <Rank userName={user.name} userEntries={user.entries} />
            <ImageLinkForm
              onInputChange={this.onInputChange}
              onButtonSubmit={this.onButtonSubmit}
            />
            <FaceRecognition imageURL={imageURL} box={box} />
          </>
        ) : route === 'signin' ? (
          <>
            <Signin
              loadUser={this.loadUser}
              onRouteChange={this.onRouteChange}
            />
          </>
        ) : (
          <>
            <Register
              loadUser={this.loadUser}
              onRouteChange={this.onRouteChange}
            />
          </>
        )}
      </div>
    );
  }
}

export default App;
