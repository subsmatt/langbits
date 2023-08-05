import { useSession } from "next-auth/react";

function Menu({currentTab, setCurrentTab}) {
    const {data: session} = useSession();
    
    function TabItem({tabValue, tabText}){
        const tabClass = tabValue === currentTab
        ? "nav-link active"
        : "nav-link";

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
        <div className="border p-2">
            <ul className="nav nav-pills">
                <TabItem tabValue="cards" tabText="All Cards"/>
                {session && (<TabItem tabValue="logs" tabText="Change Logs"/>)}
            </ul>
        </div>
    );
}

export default Menu;