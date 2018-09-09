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
                {header == '' ? null : <h5 class="card-header">{header}</h5>}
                {image == '' ? null : <img className="card-img-top" src={image} alt="Card image cap" />}
                <div className="card-body container px-1 py-2">
                    {title == '' ? null : <h5 className="card-title text-dark">{title}</h5>}
                    {subtitle == '' ? null : <h6 class="card-subtitle text-secondary">{subtitle}</h6>}
                    {text == '' ? null : <p className="card-text text-muted">{text}</p>}
                </div>
            </div>
        </div>
    )
}
