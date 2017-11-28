import React from 'react'
import Block from './Block'
import Redux from 'redux'
import { connect } from 'react-redux'
import Mousetrap from 'mousetrap'
import { movePlayer, setPlayer, setLabrynth } from '../ducks/player.js'

let grid = []

const containerStyle = {
  display: 'inline-block',
  margin: 'auto'
}

const rowStyle = {
  flexDirection: "row",
  display: "block"
}

class App extends React.Component {
  constructor(props) {
    super(props)
  }

  componentWillMount(){
    let eshta = this

    $.get("http://52.88.26.79:7000/?type=json&w=10&h=10", function(data, status) {
      grid = data
      eshta.props.setGrid(grid);
      setTimeout(function() {
        $('#delayMsg').hide();
      }, 1000)

      eshta.props.grid.forEach((col, col_index) => {
        col.forEach((row, row_index) => {
          if(row === "p"){
            eshta.props.setPositionPlayer({x: row_index, y: col_index})
          }
        })
      })

      eshta.forceUpdate()
    })
  }

  componentDidMount() {
    Mousetrap.bind(['up'], () => this.props.onPressMove({x: -1, y: 0}))
    Mousetrap.bind(['down'], () => this.props.onPressMove({x: 1, y: 0}))
    Mousetrap.bind(['left'], () => this.props.onPressMove({x: 0, y: -1}))
    Mousetrap.bind(['right'], () => this.props.onPressMove({x: 0, y: 1}))
  }

  render() {
    let rows = []

    if (this.props.grid._tail) {
      rows = this.props.grid._tail.array
      console.log(rows)
      return (
      <div style={ containerStyle }>
      <h1> Warcraft v0.0.1 </h1>
        { rows.map((row, row_index) => (
          <div style={ rowStyle }>
            { row.map((col, col_index) => (
              <Block text={ col }/>
            ))}
          </div>
        ))}
      </div>
      )
    } else {
      return (null)
    }
  }
}

const mapStateToProps = state => {
  return {
    grid: state.get('grid')
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setGrid: labrynth => {
      dispatch(setLabrynth(labrynth))
    },
    onPressMove: direction => {
      dispatch(movePlayer(direction))
    },
    setPositionPlayer: position => {
      dispatch(setPlayer(position))
    }
  }
}

const AppContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

export default AppContainer
