export default function InputWrapper(props) {
    return (
        <div className={"flex flex-col gap-2"}>
            {props.children}
        </div>
    )
}