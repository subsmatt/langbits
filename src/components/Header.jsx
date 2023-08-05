import { useSession, signIn, signOut } from "next-auth/react";

function Header(){
    const theme = "light";

    function LogInBtn(){
        const { data: session } = useSession();
        if (session) {
            return (
            <>
                <button className="btn btn-outline-info float-end" onClick={() => signOut({callbackUrl: "/"})}>Sign out</button>
                <p>Signed in as {session.user.email}</p>
            </>
            );
        }
        return (
            <>
              {/* pass 2 additional args to force user to provide credentials */}
              {/* <button className="btn btn-outline-info float-end" onClick={() => signIn("auth0", null, { prompt: "login" })}>Sign in</button> */}
              <button className="btn btn-outline-info float-end" onClick={() => signIn("auth0")}>Sign in</button>
            </>
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
                <LogInBtn/>
            </div>
        </div>
    );
}

export default Header;