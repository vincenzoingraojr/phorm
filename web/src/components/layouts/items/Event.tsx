import { FunctionComponent } from "react";
import styled from "styled-components";
import { PageText } from "../../../styles/global";

interface EventProps {
    event: any;
}

const EventContainer = styled.div`
    display: flex;
    padding: 6px;
    border-radius: 6px;
    background-color: #ff5c00;
`;

const EventMessage = styled(PageText)`
    color: #ffffff;
    font-size: 16px;
`;

const Event: FunctionComponent<EventProps> = ({ event }) => {
    return (
        <EventContainer>
            <EventMessage>
                {event.eventMessage}
            </EventMessage>
        </EventContainer>
    );
}

export default Event;