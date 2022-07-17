import classes from './Button.module.css'

interface Props {
    children: React.ReactNode,
    clicked: () => void,
    btnType: string
}

const Button = (props: Props) => (
    <button className={[classes.Button, classes[props.btnType]].join(' ')} onClick={e => {
        e.preventDefault()
        return props.clicked();
    }}>
        {props.children}
    </button>
)

export default Button