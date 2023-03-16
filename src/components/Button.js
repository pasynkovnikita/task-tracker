import PropTypes from "prop-types";

const Button = ({color, text, onClick}) => {
    return (
        <button type={"button"} style={{backgroundColor: color}} className='btn' onClick={onClick}>
            {text}
        </button>
    )
}

Button.defaultProps = {
    color: '#0d6efd'
}

Button.propTypes = {
    text: PropTypes.string,
    color: PropTypes.string,
    onClick: PropTypes.func.isRequired,
}

export default Button