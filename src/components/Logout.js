import { useHistory } from "react-router";

const Logout = () => {

    const history = useHistory();

    localStorage.removeItem('loggedInUser');
    localStorage.clear();

    alert("Logged out successfully...");
    history.push("/home");
    window.location.reload();
    return (
        <div>
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
    );

}
export default Logout;