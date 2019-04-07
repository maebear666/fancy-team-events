import React from 'react';
import './EventList.scss';
import AddEvent from "../../assets/plus.png";
import {Link} from 'react-router-dom';
import editEvent from "../../assets/edit.png";
import viewEvent from "../../assets/eye.png";


function EventList(props) {
    let {events} = props;
    let tempArr={};
    let sortedEvents = events.map(event => event).sort(function(a, b){
      return new Date(a.eventDate) - new Date(b.eventDate);
    }).map(event => {
      if(!tempArr[event.id]){
        tempArr[event.id] = event;
      }else{
        if(!tempArr[event.id].isOrganizer && event.isOrganizer){
          tempArr[event.id] = event;
        }
      }
    });
        return (
               <div className='event-list-page-create-event'>
                   <div className='event-list-page-add-event'>
                       <span>My Events</span>
                     <Link to="/event/create">
                       <img src={AddEvent} alt="Create Event" className="event-add-icon" width="100" />
                     </Link>
                   </div>
                  <div className='event-table-header'>
                    <span>EventDate</span>
                    <span>Title</span>
                    <span>Actions</span>
                  </div>
                 <div className='event-scroll'>
                   <table className='event-table'>
                     <tbody>
                     {Object.values(tempArr).map((event, index) =>
                         <tr id={event.id} key={index}>
                            <td>{event.eventDate}</td>
                            <td>{event.title}</td>
                            <td className="icons">
                                {event.isOrganizer ? (
                                <Link to={`/event/edit/${event.id}`}>
                                    <img src={editEvent} alt="Edit Event" className="event-add-icon" width="100" />
                                </Link>) : (<Link  to={`/event/view/${event.id}`}>
                                    <img src={viewEvent} alt="View Event" className="event-add-icon" width="100" />
                                </Link>)}
                            </td>
                         </tr>)}
                     </tbody>
                   </table>
                 </div>
               </div>
        );
}

export default EventList;
