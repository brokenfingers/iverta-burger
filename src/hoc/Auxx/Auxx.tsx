import { Fragment } from "react"

interface Props {
    children: React.ReactNode
}

const aux = (props: Props) => <Fragment>{props.children}</Fragment>


export default aux