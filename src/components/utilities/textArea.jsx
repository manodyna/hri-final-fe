export default function TextArea(props) {
    return(
        <div>
            <div>
                <p className="text-sm text-black font-medium">{props.label}</p>
            </div>
            <textarea
                id={props.id}
                name={props.name || props.id}
                placeholder={props.placeholder}
                className="border-lightGrey border rounded-md pr-2 pl-2 w-80 h-11 mt-1" />
        </div>
    );
};