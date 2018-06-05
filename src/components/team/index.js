import React, { Component } from 'react';
import { get, sortBy } from 'lodash';

class Team extends Component {
  render() {
    const { pos, attributes } = this.props;
    const eventsOrder = [0, 1, 2, 3];
    const events = sortBy(attributes.events, (event) => event.order);

    return (
      <tr>
        <th scope="row">{pos + 1}</th>
        <td><strong>{attributes.name}</strong></td>
        {eventsOrder.map((order, idx) => {
          const event = get(events, `${order}`, { time: '', ranking: 1 });

          return (
            <td key={idx}>
              {event.time && (`${event.time} (${event.ranking})`)}
              {event.reps && (`${event.reps} (${event.ranking})`)}
              {event.weight && (`${event.weight} (${event.ranking})`)}
            </td>
          )
        })}
        <td>{attributes.finalScore}</td>
      </tr>
    );
  }
}

export default Team;
