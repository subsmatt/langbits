function Header(){
    const theme = "light";

    function NotLoggedIn(){
        return (
            <div>
                <button className="btn btn-secondary" disabled={true} onClick={(e) => {
                    e.preventDefault();
                    const username = window.prompt("Enter Login Name:", "");
                }}>Log In</button>
            </div>
        );
    }

    return (
        <div className="d-flex justify-content-between p-1">
            <div>
                <img src={`/images/subsmatt_logo_${theme}_theme.png`} alt="Subsmatt"/>
            </div>
            <div className="my-auto pt-1">
                <h4 className="header-title my-auto">
                    LangBits: Cards
                </h4>
            </div>
            <div className="text-info my-auto">
                <NotLoggedIn/>
            </div>
        </div>
    );
}

export default Header;