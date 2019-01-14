import React, { Component } from 'react';
import Navbar from './Navbar'
import RecipeItem from './RecipeItem'
import recipes from '../sample_data/recipes.json'

class App extends Component {
  constructor(props) {
    super(props);
    const { results } = recipes;
    console.log(results);
    this.state = {
      searchString: '',
      recipes: results,
      initialRecipes: results,
    };
  }

  searchStringHandler(e) {
    this.setState({ searchString: e.target.value });
    if (e.target.value) {
      const filteredRecipes = this.state.initialRecipes.filter((_recipe, id) => {
        const insensitiveTitle = _recipe.title.toLowerCase();
        const insensitiveIngredients = _recipe.ingredients.toLowerCase();
        return insensitiveTitle.indexOf(e.target.value.toLowerCase()) !== -1 || insensitiveIngredients.indexOf(e.target.value.toLowerCase()) !== -1
      });
      this.setState({
        recipes: filteredRecipes,
      })
      return;
    }
    this.setState({
      recipes: this.state.initialRecipes,
    });
  }

  render() {
    return (
      <div className="App">
        <Navbar searchString={this.searchString} onInputHandler={(e) => this.searchStringHandler(e)}/>
        <div className="container mt-10">
          <div className="row">
            {this.state.recipes.map((recipe, id) => <RecipeItem key={id} {...recipe} />)}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
