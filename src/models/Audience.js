import Ticket from "./Ticket";
import Match from "./Match";

class Audience {

    audienceId;
    audienceName;
    match = new Match();
    ticket = new Ticket();

}

export default Audience;