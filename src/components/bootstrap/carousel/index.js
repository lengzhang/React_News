import React from 'react'

export default({
    id = '',
    images = [],
    interval = 5000,
    control = false
}) => {
    return (<div id={id} className="carousel slide rounded border border-secondary" data-ride="carousel" data-interval={interval}>
        <div className="carousel-inner">
            {
                images.map((item, index) => {
                    return (
                        <div className={`carousel-item p-1 ${index == 0 ? 'active' : ''}`} key={index}>
                            <img className="d-block w-100 rounded" src={item}/>
                        </div>
                    );
                })
            }

        </div>
        {
            control
                ? <div>
                        <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="sr-only">Previous</span>
                        </a>
                        <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="sr-only">Next</span>
                        </a>
                    </div>
                : null
        }

    </div>)
}
