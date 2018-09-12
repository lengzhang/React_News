import React from 'react'

export default({
    header = '',
    image = '',
    title = '',
    subtitle = '',
    text = ''
}) => {
    return (
        <div>
            <div className="card">
                {header == '' ? null : <h5 className="card-header">{header}</h5>}
                {image == '' ? null : <img className="card-img-top" src={image} alt="Card image cap" />}
                <div className="card-body container px-1 py-2 m-0">
                    {title == '' ? null : <h5 className="card-title">{title}</h5>}
                    {subtitle == '' ? null : <h6 className="card-subtitle">{subtitle}</h6>}
                    {text == '' ? null : <h6 className="card-text">{text}</h6>}
                </div>
            </div>
        </div>
    )
}
