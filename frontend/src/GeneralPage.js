import React, { Component } from 'react'

export default class GeneralPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      error:null,
    }
  }
  render () {
    return(
      <div>
        <div className='error'>{this.state.error}</div>
        <table>
          <thead>
            <tr>
              <th><h4>Smart ACA</h4></th>
              <th></th>
              <th><h4>This website</h4></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className='generalRow'>
                <p>The Smart ACA program is a specialization of one the many activities performed by the Humanités Numérique platform.</p>
                <p>This project is based on a scientific collaboration with the Archives of the Art Critics (Rennes, France) which was formed as an association in 1989 and then established as a Group of Scientific Interest : GIS (Groupement d’Intérêt Scientifique) in 2014. The role of the ACA is to collect, to preserve and to raise/promote the archives drawn by critics who are active since the second half of the XXth century. The ACA shares a close relationship with the International Association of Art Critics (AICA) as well as the National Art History Institute (Institut National d’Histoire de l’Art (INHA, Paris). It offers a place one its kind for local, national and international art researchers.</p>
                <p>In a ten years time, the Smart ACA program aims to provide researchers with an intelligent access to the archives. The primary phase (3 years) focuses on the digitalization, the structuration and the processing of archives from four contemporary centers of art located in Britani (Kerguéhennec, Galerie du Dourven, Le Quartier, and La Criée), six Parisian galleries and 73 issues from 5 journals covering the contemporary art news since 1980.</p>
                <p>The Smart ACA project benefits from a CPER grant and a doctoral contract funded by the Britany region and the Univeristy of Rennes 2.</p>
              </td>
              <td><hr className='verticalSeparator'/></td>
              <td>lorem ipsum</td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
}
