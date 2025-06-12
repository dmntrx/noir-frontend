import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useState } from 'react';
import './Calendar.css';

export default function Calendar() {
    // текущее состояние (массив событий), ф-я изменения этого состояния
    const [events, setEvents] = useState([
        { title: 'Event 1', date: '2025-06-17' }
    ]);

    const handleDateClick = (info) => {
        const title = prompt('Add event');
        if (title) {
            setEvents([...events, { title, date: info.dateStr }]);
        }
    };
    return (
        <>
            <h1>CALENDAR</h1>
            <div className='calendar-container'>
                <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView='dayGridMonth'
                headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek,timeGridDay',
                }}
                dateClick={handleDateClick}
                events={events}
                />
            </div>
        </>
    )
}

// npm install @fullcalendar/react @fullcalendar/daygrid @fullcalendar/timegrid @fullcalendar/interaction
