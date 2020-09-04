import React, { Component } from "react";
import axios from "axios";
import SearchBar from './SearchBar'

export default class PlantList extends Component {
  // add state with a property called "plants" - initialize as an empty array
  constructor() {
    super();
    this.state = {
      plants: [],
      searchTerm: ''
    }
  }
  componentDidMount() {
    axios.get('http://localhost:3333/plants')
    .then(res => {
      this.setState({
        plants: res.data.plantsData
      })
    })
    .catch(err => {
      console.log(err)
    })

  }

  searchChange = e => {
    this.setState({
      searchTerm: e.target.value
    })
  }

  // when the component mounts:
  //   - fetch data from the server endpoint - http://localhost:3333/plants
  //   - set the returned plants array to this.state.plants

  /*********  DON'T CHANGE ANYTHING IN THE RENDER FUNCTION *********/
  render() {

    const filteredPlants = this.state.plants.filter(plants => {
      return plants.name.toLowerCase().includes(this.state.searchTerm.toLowerCase())
    })
    return (
      <div>
        <div className='search-bar'>
            <SearchBar searchChange={this.searchChange}/>
        </div>
        <main className="plant-list">
          
          {filteredPlants?.map((plant) => (
            <div className="plant-card" key={plant.id}>
              <img className="plant-image" src={plant.img} alt={plant.name} />
              <div className="plant-details">
                <h2 className="plant-name">{plant.name}</h2>
                <p className="plant-scientific-name">{plant.scientificName}</p>
                <p>{plant.description}</p>
                <div className="plant-bottom-row">
                  <p>${plant.price}</p>
                  <p>☀️ {plant.light}</p>
                  <p>💦 {plant.watering}x/month</p>
                </div>
                <button
                  className="plant-button"
                  onClick={() => this.props.addToCart(plant)}
                >
                  Add to cart
                </button>
              </div>
            </div>
          ))}
        </main>
      </div>
    );
  }
}
