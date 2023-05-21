import { Button } from "react-bootstrap";
import { BiHomeAlt } from "react-icons/bi"

const NavButton = ({className, text="Text"}) => {
    return(
        <Button className={className} style={{borderRadius: "0px", textAlign: "left", fontSize: "20px"}}>
            {text}
        </Button>
    );
}

export {NavButton}