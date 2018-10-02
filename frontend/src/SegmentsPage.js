import React, { Component } from 'react'
import {Collapse} from 'react-collapse';

export default class SegmentsPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      rows: null,
      initialRows: null,
      focusedOn: null,
      segmentStats: null,
      segementHidden: false,
      howtoHidden: false,
      textHidden: true,
      textFocused: {
        text: null,
        title: null,
        date: null
      },
    }
    this.focus = this.focus.bind(this)
    this.createBlock = this.createBlock.bind(this)
    this.highlightSelected = this.highlightSelected.bind(this)
    this.resetBlocks = this.resetBlocks.bind(this)

    this.displayText = this.displayText.bind(this)
    this.hideHT = this.hideHT.bind(this)
    this.hideText = this.hideText.bind(this)
    this.hideSegment = this.hideSegment.bind(this)
    this.getSegementStats = this.getSegementStats.bind(this)
  }

  displayText(e) {
    const {
      texts
    } = this.props
    const text = texts.filter(t => {return t.id === e.target.id})[0]
    this.setState({
      textHidden: false,
      textFocused: {
        text: text.text,
        title: text.title,
        date: text.date
      }
    })
  }

  hideHT () {
    if (this.state.howtoHidden) {
      this.setState({
        howtoHidden: false,
      })
    }
    else {
      this.setState({
        howtoHidden: true,
      })
    }
  }

  hideText () {
    if (this.state.textHidden) {
      this.setState({
        textHidden: false,
      })
    }
    else {
      this.setState({
        textHidden: true,
      })
    }
  }

  hideSegment () {
    if (this.state.segementHidden) {
      this.setState({
        segementHidden: false,
      })
    }
    else {
      this.setState({
        segementHidden: true,
      })
    }
  }

  focus(e) {
    //console.log(e.target);
    e.target.id === this.state.focusedOn ? this.resetBlocks() : this.highlightSelected(e.target.id)
  }

  getSegementStats(segment) {
    const {
      segments
    } = this.props

    const seg = segments.filter(s => {return s.segment === segment})
    const text_seg = seg.map((s, i) => {
      return (
        <tr
          key={`segStat-${i}`}
          className='segStatRow'
        >
          <td className='segStatColDate'>{s.date}</td>
          <td className='segStatColTitle'>{s.title}</td>
        </tr>
      )
    })
    const SegmentClean = '"' + segment.split('_').join(' ') + '"'
    return (
      <div
        key='segStat'
        className='segStatContainer'
      >
      <div className='segStatHeader'>{SegmentClean}, {seg.length} occurences</div>
      <table>
        <thead>
          <tr>
            <td>Date</td>
            <td>Title</td>
          </tr>
        </thead>
        <tbody>
          {text_seg}
        </tbody>
      </table>
      </div>
    )
  }

  highlightSelected(segment) {
    const rows = this.state.rows.map((row, i) => {
      const newRow = row.props.children[0].props.children.map(child => {
        if (child.props.className === 'rowSeq'){
          const newBlocSeq = child.props.children.props.children[1].map(block => {
            const blockId = block.props.children.props.id
            if (blockId === segment) {
              return this.createBlock(block.key, blockId, 'blockSeg')
            }
            else {
              return this.createBlock(block.key, blockId, 'blockHidden')
            }
          })
          return newBlocSeq
        }
        else {
          return child
        }
      })
      return (
        <li
          key={`txt-${i}`}
        >
          <ul className='row'>
            { newRow }
          </ul>
          <hr className='rowSeparator'/>
      </li>
      )
    })
    this.setState({
      rows: rows,
      focusedOn: segment,
      segmentStats: this.getSegementStats(segment)
    })
  }

  resetBlocks() {
    this.setState({
      rows: this.state.initialRows,
      focusedOn: null,
    })
  }

  createBlock(key, seg, blockClass) {
    const onClick = seg === null ? null : this.focus
    return (
      <li
        key={ key }
        className='blockContainer'
      >
        <div
          className={ blockClass }
          onClick={ onClick }
          id={ seg }
        >
        </div>
      </li>
    )
  }


  componentDidMount () {
    const {
      segments,
      texts
    } = this.props

    if (texts === null) {
      this.setState({
        error: 'There has been a problem when loading the data. Please go back to the home page so the data can be loaded properly.'
      })
      return
    }

    const rows = texts.map((txt, i) => {
      const author_seg = segments.filter(s => { return (s.author === txt.author &&
                                                        s.title === txt.title &&
                                                        s.date === txt.date)})
      const row = new Array(50).fill(50).map((b, j) => {
        const key = 'txt-' + i + '-block-' + j
        const seg = author_seg.filter(s => Math.floor(s.position / 2) === j)
        if (seg.length === 1){
          return this.createBlock(key, seg[0].segment, 'blockSeg')
        }
        else {
          return this.createBlock(key, null, 'block')
        }
      })
      return (
        <li
          key={`txt-${i}`}
        >
          <ul className='row'>
            <li className='rowDate'> {txt.date}</li>
            <li className='rowTitle'
              id={txt.id}
              onClick={this.displayText}
            >
              {txt.title}
            </li>
            <li className='rowSeq'>
              <ul className='blockSeq'> {row} </ul>
            </li>
          </ul>
          <hr className='rowSeparator'/>
        </li>
      )
    })
    this.setState({
      rows: rows,
      initialRows: rows
    })
  }

  render () {
    return(

      <div>
        <div className='error'>{this.state.error}</div>
        <table className='fullLayout'>
          <thead>
            <tr>
              <th><h4>Corpus</h4></th>
              <th></th>
              <th></th>
              <th><h4>Analyzer</h4></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className='segmentLayout'>
                <ul className='rows'>
                  { this.state.rows }
                </ul>
              </td>
              <td className='verticalSeparator'></td>
              <td className='emptyLayout'></td>
              <td className='informationsLayoutTd'>


                <ul className='informationsLayoutUl'>

                  <li className="liInformation">
                    <div>
                      <ul className='analyzerSection'>
                        <li><h5>How to</h5></li>
                        <li><div className='howtoButton' onClick={this.hideHT}>show/hide</div></li>
                      </ul>
                      <div className= {this.state.howtoHidden ? 'hidden' : 'howToText'} >
                        <p>Pale squares corresponds to segments of texts that are not repeated whereas red squares indicates repeated segements.</p>
                        <p>Click on a red square to start analyzing a segment.</p>
                        <p>Click on a writing's title to take a look at it.</p>
                      </div>
                    </div>
                  </li>

                  <li><hr className='informationsSeparator'/></li>

                  <li>
                    <ul className='analyzerSection'>
                      <li><h5>Segments</h5></li>
                      <li><div className='segmentAnalyzerButton' onClick={this.hideSegment}>show/hide</div></li>
                    </ul>
                    <div className= {this.state.segementHidden ? 'hidden' : 'segmentAnalyzer'} >
                      <div className='analyzerContainer'>{this.state.segmentStats}</div>
                    </div>
                  </li>

                  <li><hr className='informationsSeparator'/></li>

                  <li>
                    <ul className='analyzerSection'>
                      <li><h5>Reader</h5></li>
                      <li><div className='readerButton' onClick={this.hideText}>show/hide</div></li>
                    </ul>
                    <div className= {this.state.textHidden ? 'hidden' : 'readerContainer'} >
                      <div className='readerHeader'>
                        {this.state.textFocused.title}, {this.state.textFocused.date}
                      </div>
                      <div className='reader'>
                        {this.state.textFocused.text}
                      </div>
                    </div>
                  </li>

                  <li><hr className='informationsSeparator'/></li>

                </ul>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

    )
  }
}
