import React, { Component } from 'react';
import { get, sortBy } from 'lodash';

class Team extends Component {
  render() {
    const { pos, attributes, hidden } = this.props;
    const eventsOrder = [0, 1, 2, 3];
    const events = sortBy(attributes.events, (event) => event.order);
    const highlightClass = 'highlight';

    return (
      <tr>
        <th scope="row">{pos + 1}</th>
        <td><strong>{attributes.name}</strong></td>
        {eventsOrder.map((order, idx) => {
          const event = get(events, `${order}`, { time: '', ranking: 1 });

          return (
            <td key={idx} className={event.ranking === 1 && highlightClass}>
              {!hidden && event.time && (`${event.time} (${event.ranking || ''})`)}
              {!hidden && event.reps && (`${event.reps} (${event.ranking || ''})`)}
              {!hidden && event.weight && (`${event.weight} (${event.ranking || ''})`)}
            </td>
          )
        })}
        <td>{!hidden && attributes.finalScore}</td>
      </tr>
    );
  }
}

export default Team;
