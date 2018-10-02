import React, { Component } from 'react';
import { csv } from 'd3-request'
import './App.css';

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

import GeneralPage from './GeneralPage'
import SegmentsPage from './SegmentsPage'
import EntitiesPage from './EntitiesPage'
import NetworksPage from './NetworksPage'


class App extends Component {

  constructor(props){
    super(props)
    this.state = {
      currentPage: window.location.pathname,
      segments: null,
      texts: null
    }
    this.setCurrentPage = this.setCurrentPage.bind(this)
    // this.segments = this.segments.bind(this)
    // this.texts = this.texts.bind(this)
  }

  componentDidMount () {
    const segPath = `${process.env.PUBLIC_URL}/data/segments_bourriaud.csv`
    const txtPath = `${process.env.PUBLIC_URL}/data/corpus_bourriaud.csv`
    // const segPath = `${process.env.PUBLIC_URL}/data/segments_test.csv`
    // const txtPath = `${process.env.PUBLIC_URL}/data/corpus.csv`
    csv(segPath, (segments) => {
      csv(txtPath, (texts) => {
        const sorted = texts.sort((a,b) => {
          return parseInt(a.date) - parseInt(b.date)
        })
        this.setState({
          segments: segments,
          texts: sorted,
        })
      })
    })
  }

  setCurrentPage (currentPage) {
    this.setState({
      ...this.state,
      currentPage
    })
    this.setCurrentPage = this.setCurrentPage.bind(this)
  }

  render() {
    const {
      currentPage
    } = this.state

    return (
      <Router>
        <div className="App">
          <header>
            <h1 className="App-title">Exploring Nicolas Bourriaud's writings</h1>
            <p className='subtitle'>presented by the Smart-ACA's team</p>
          </header>
            <ul className="navbar">
              <li
                className={ currentPage === '/' ? 'active' : ''}
              >
                <Link
                  style={{ textDecoration: 'none'}}
                  to='/'
                  onClick={() => {
                    this.setCurrentPage('/')
                  }}
                >
                  Home
                </Link>
              </li>

              <li
                className={ currentPage === '/named-entities' ? 'active' : ''}
              >
                <Link
                  style={{ textDecoration: 'none'}}
                  to='/named-entities'
                  onClick={() => {
                    this.setCurrentPage('/named-entities')
                  }}
                >
                  Named entities
                </Link>
              </li>

              <li
                className={ currentPage === '/segments' ? 'active' : ''}
              >
                <Link
                  style={{ textDecoration: 'none'}}
                  to='/segments'
                  onClick={() => {
                    this.setCurrentPage('/segments')
                  }}
                >
                  Segments
                </Link>
              </li>

              <li
                className={ currentPage === '/networks' ? 'active' : ''}
              >
                <Link
                  style={{ textDecoration: 'none'}}
                  to='/networks'
                  onClick={() => {
                    this.setCurrentPage('/networks')
                  }}
                >
                  Networks
                </Link>
              </li>
            </ul>

            <hr className='navSeparator'/>

            <Route
              exact
              path='/'
              render={(props) => (<GeneralPage {...this.state}/>)}
            />

            <Route
              exact
              path='/named-entities'
              render={(props) => (<EntitiesPage {...this.state}/>)}
            />

            <Route
              exact
              path='/segments'
              render={(props) => (<SegmentsPage {...this.state}/>)}
            />

            <Route
              exact
              path='/networks'
              render={(props) => (<NetworksPage {...this.state}/>)}
            />
            <footer>
              <hr className='informationsSeparator'/>
              <p>
                <h3 className='footerTitle'>
                  Credits
                </h3>
              </p>
              <p><a href='https://www.univ-rennes2.fr/'>Université Rennes 2</a></p>
              <p><a href='https://www.archivesdelacritiquedart.org/'>Archives de la critique d'art</a></p>
              <p><a href='https://www.mshb.fr/'>La Maison des Sciences de l'Homme en Bretagne</a></p>
            </footer>
          </div>
      </Router>
    );
  }
}

export default App;
