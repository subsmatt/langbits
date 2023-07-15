function Menu({currentTab, setCurrentTab}) {
    function TabItem({tabValue, tabText}){
        const tabClass = tabValue === currentTab
        ? "nav-link btn-primary rounded-pill d-flex align-items-center px-3 active"
        : "nav-link btn-primary rounded-pill d-flex align-items-center px-3";

        return (
            <li className="nav-item ml-auto">
                <a href="#" onClick={() => {setCurrentTab(tabValue);}} className={tabClass}>
                    <i className="icon-layers mr-1"></i>
                    <span className="d-none d-md-block">{tabText}</span>
                </a>
            </li>
        );
    }

    return (
        <ul className="nav nav-pills p-3 bg-white mb-3 founded-pill align-items-center">
            <TabItem tabValue="cards" tabText="All Cards"/>
            <TabItem tabValue="logs" tabText="Change Logs"/>
        </ul>
    );
}

export default Menu;