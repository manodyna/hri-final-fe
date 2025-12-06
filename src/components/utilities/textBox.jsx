import mark from '../../assets/questionmark.png';

export default function Textbox(props) {
    const defaultlableClassName = 'text-black';
    const { showImage = true } = props;
    return (
        <div>
            <div>
                <p
                    className={` text-lg ${defaultlableClassName} ${props.labelClassName} font-medium`}
                >
                    {props.label}
                </p>
            </div>
            <div className='relative'>
                <input
                    id={props.id}
                    name={props.name || props.id}
                    placeholder={props.placeholder}
                    type={props.type}
                    value={props.value}
                    onChange={props.onChange}
                    className={`border-lightGrey border rounded-md pr-2 pl-2 h-11 mt-1  ${props.className}`}
                />
                {showImage && (
                    <img
                        src={mark}
                        alt='.'
                        className='absolute top-6 right-20 transform -translate-y-1/2 translate-x-16'
                    />
                )}
            </div>
        </div>
    );
}
